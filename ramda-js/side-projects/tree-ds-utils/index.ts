// @ TODO : TypeScript 적용 필용 - 1차적으로 완료
// @ TODO : Jest 기반 Test Code 작성 필요
// @ TODO : 보다 높은 추상화 수준의 함수 추가 예정

const R = require('ramda');

interface IDeppFlatten {
    <TNode>(propKey: string, nodes: TNode): Array<TNode>;
}
export const deepFlatten = R.curry((propKey, nodes): IDeppFlatten =>
  R.pipe(
      R.chain((item) =>
        R.ifElse(
            R.propIs(Array, propKey),
            R.pipe(
                R.prop(propKey),
                deepFlatten(propKey),
                R.concat([item]),
            ),
            R.always([item]),
        )(item),
      ),
  )(nodes));

interface IEnsureArray {
    <TNode>(nodes: TNode): Array<TNode>;
}
export const ensureArray : IEnsureArray= R.cond([
  [R.isNil, R.always([])],
  [R.is(Array), R.identity],
  [R.is(Object), R.of(Array)],
]);

// console.log('ensuerArray - 1', ensureArray({a: 1}));
// console.log('ensuerArray - 2', ensureArray([]));
// console.log('ensuerArray - 3', ensureArray(null));


interface IFilterEachNode {
     <TNode>(predicate: (node: TNode)=> boolean, childrenKey: string, nodes: TNode): Array<TNode>;
}
export const filterEachNode = R.curry((predicate, childrenKey, treeNodes): IFilterEachNode =>
  R.pipe(
      R.filter(predicate),
      R.map(
          R.over(R.lensProp(childrenKey), filterEachNode(predicate, childrenKey)),
      ),
  )(treeNodes),
);

// test for filter
// const tree = [{
//   name: 'A',
//   children: [
//     {
//       name: 'B',
//       children: [
//         {name: 'C', children: []},
//         {name: 'D', children: []},
//       ],
//     },
//     {
//       name: 'E',
//       children: [{name: 'F', children: []}],
//     },
//   ],
// }];
// console.log('filter ', filterEachNode((node) => !!node.children && ['A', 'B', 'D'].includes(node.name), 'children', tree));


interface IExtractLeafNodes {
    <TNode>(propKey: string, nodes: TNode[]): Array<TNode>;
}
export const extractLeafNodes= R.curry((propKey, nodes) : IExtractLeafNodes =>
  R.pipe(
      deepFlatten(propKey),
      R.filter(
          R.pipe(
              R.prop(propKey),
              R.isEmpty,
          ),
      ),
  )(nodes),
);

interface IUpdateEachNode {
    <TNode>(transformation: (node: TNode) => TNode, childrenKey: string, nodes: TNode[]): Array<TNode>;
}
export const updateEachNode= R.curry((transformation, childrenKey, treeNodes) : IUpdateEachNode=>
  R.pipe(
      R.ifElse(
          R.isNil,
          R.identity,
          R.pipe(
              R.map(
                  R.ifElse(
                      R.isNil,
                      R.identity,
                      transformation,
                  ),
              ),
              R.map(
                  R.ifElse(
                      R.both(
                          R.isNotNil,
                          R.hasPath([childrenKey]),
                      ),
                      R.over(
                          R.lensProp(childrenKey),
                          updateEachNode(transformation, childrenKey),
                      ),
                      R.identity,
                  ),
              ),
          ),
      ),
  )(treeNodes),
);

// test for updateEachNode
// const tree2 = [{
//   name: 'A',
//   children: [
//     {
//       name: 'B',
//       children: [
//         {name: 'C', children: []},
//         {name: 'D', children: []},
//       ],
//     },
//     {
//       name: 'E',
//       children: [{name: 'F', children: []}],
//     },
//   ],
// }];
// console.log('updateEachNode ', updateEachNode(R.assoc('testValue', 1), 'children', tree2));

interface ICreateIncrementer {
    next: () => number;
  }
const createIncrementer = (count= 0) : ICreateIncrementer => ({
  next: ()=> ++count,
});

interface IAddIncreasementSequenceEachNode {
    <TNode>(start: number, sequenceKey: string, childrenKey: string, nodes: TNode[]): Array<TNode>;
}
export const addIncreasementSequenceEachNode = R.curry((start, sequenceKey, childrenKey, treeNodes): IAddIncreasementSequenceEachNode => {
  const incrementer=createIncrementer(start);
  return updateEachNode((el)=> R.assoc(sequenceKey, incrementer.next())(el), childrenKey, treeNodes);
},
);

// // test for addSequenceToTreeNodes
// const tree3 = [{
//   name: 'A',
//   children: [
//     {
//       name: 'B',
//       children: [
//         {name: 'C'},
//         {name: 'D', children: []},
//       ],
//     },
//     {
//       name: 'E',
//       children: [{name: 'F', children: []}],
//     },
//   ],
// }];

// console.log('addSequenceToTreeNodes ', addSequenceToTreeNodes(0, 'seq', 'children', tree3));

interface IUpdateNodesByCondition {
    <TNode>(condition: (node: TNode) => boolean, transformation: (node: TNode) => TNode, childrenKey: string, nodes: TNode[]): Array<TNode>;
}
export const updateNodesByCondition= R.curry((condition, transformation, childrenKey, treeNodes): IUpdateNodesByCondition =>
  updateEachNode(
      R.pipe(
          R.when(condition, transformation),
      ),
      childrenKey,
      treeNodes,
  ),
);

// test for updateNodesByCondition
// const tree4 = [{
//   name: 'A',
//   children: [
//     {
//       name: 'B',
//       children: [
//         {name: 'C', children: []},
//         {name: 'D', children: []},
//       ],
//     },
//     {
//       name: 'E',
//       children: [{name: 'F', children: []}],
//     },
//   ],
// }];
// console.log('updateNodesByCondition', updateNodesByCondition(R.propEq('A', 'name'), R.assoc('testValue', 1), 'children', tree4));

interface IRemovePropEachNode {
    <TNode>(propKey: string, childrenKey: string, nodes: TNode[]): Array<TNode>;
}
export const removePropEachNode = R.curry((propKey, childrenKey, treeNodes): IRemovePropEachNode =>
  updateEachNode(R.dissoc(propKey), childrenKey, treeNodes));

// test for removePropEachNode
// const tree5 = [{
//   name: 'A',
//   children: [
//     {
//       name: 'B',
//       children: [
//         {name: 'C', children: []},
//         {name: 'D', children: []},
//       ],
//     },
//     {
//       name: 'E',
//       children: [{name: 'F', children: []}],
//     },
//   ],
// }];
// console.log('removePropEachNode', removePropEachNode('name', 'children', tree5));

interface IUpdatePropNameEachNode {
    <TNode>(propKey: string, newPropKey: string, childrenKey: string, nodes: TNode[]): Array<TNode>;
}
export const updatePropNameEachNode = R.curry((propKey, newPropKey, childrenKey, treeNodes): IUpdatePropNameEachNode =>
  updateEachNode(
      (el)=>R.mergeAll(
          [
            {[newPropKey]: R.prop(propKey)(el)},
            R.omit([propKey])(el),
          ],
      )
      , childrenKey, treeNodes));

// const tree6 = [{
//   name: 'A',
//   children: [
//     {
//       name: 'B',
//       children: [
//         {name: 'C', children: []},
//         {name: 'D', children: []},
//       ],
//     },
//     {
//       name: 'E',
//       children: [{name: 'F', children: []}],
//     },
//   ],
// }];
// console.log('updatePropName', updatePropName('name', 'name2', 'children', tree6));

interface ISomeLeafNode {
    <TNode>(childrenKey: string, condition: (node: TNode) => boolean, nodes: TNode[]): boolean;
}
export const someLeafNode = R.curry(( childrenKey: string, condition: any, treeNodes: any[]) : ISomeLeafNode=>

  R.pipe(
      R.any(
          R.cond([
            [R.complement(R.has(childrenKey)), (node)=> condition(node)],
            [R.T, (node) =>someLeafNode(childrenKey, condition, node.children)],
          ]),
      ),
  )(treeNodes),
);

// test for someLeafNode
// const tree7 = [{
//   name: 'A',
//   children: [
//     {
//       name: 'B',
//       children: [
//         {name: 'C', children: []},
//         {name: 'D', children: []},
//       ],
//     },
//     {
//       name: 'E',
//       children: [{name: 'F', children: []}],
//     },
//   ],
// }];

// console.log('someLeafNode', someLeafNode( 'children', (el)=> {
//   console.log('el_1', el);
//   return el.name ==='F';
// }, tree7));

interface ISomeLeafNodeV2{
    <TNode>(childrenKey: string, condition: (node: TNode) => boolean, nodes: TNode[]): boolean;
}
export const someLeafNodeV2 = R.curry(( childrenKey: string, condition: any, treeNodes: any[]) : ISomeLeafNodeV2=>
  R.any(
      R.pipe(
          R.ifElse(
              R.both(
                  R.pipe(
                      R.prop(childrenKey),
                      R.is(Array),
                  ),
                  R.has(childrenKey),
                  R.pipe(
                      R.prop(childrenKey),
                      R.complement(R.empty),
                  )),
              R.pipe(
                  R.prop(childrenKey),
                  someLeafNodeV2(childrenKey, condition),
              ),
              (el)=>condition(el),
          )),
  )(treeNodes));

// const tree7 = [{
//   name: 'A',
//   children: [
//     {
//       name: 'B',
//       children: [
//         {name: 'C', children: []},
//         {name: 'D', children: []},
//         {name: 'H'},
//         {name: 'G' , children: undefiend}
//       ],
//     },
//     {
//       name: 'E',
//       children: [{name: 'F'}],
//     },
//   ],
// }];

// console.log('isSomeLeafNodeCondition - 1',
//     someLeafNodeV2( 'children', (el)=> {
//       console.log('el_xxx leaf', el);
//       return el.name ==='H';
//     }, tree7),
// );


// console.log('isSomeLeafNodeCondition - 2',
//     someLeafNodeV2( 'children', (el)=> {
//       return el.name ==='G';
//     }, tree7),
// );

// @TODO: ramdaJS 기반으로 리팩토링
export const isDescendantNodeCondition = ({
  node,
  validate,
  parseChildren ,
}) => {
  const children = parseChildren ? parseChildren(node) : node.subRows;
  const hasChildren = children?.length > 0;

  if (validate(node)) {
    return true;
  }

  if (hasChildren) {
    return children.some((node) =>
      isDescendantNodeCondition({node, validate, parseChildren}),
    );
  } else {
    return false;
  }
};

