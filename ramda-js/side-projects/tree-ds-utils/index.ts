// @ TODO : TypeScript 적용 필용 - 1차적으로 완료
// @ TODO : Jest 기반 Test Code 작성 필요
// @ TODO : 보다 높은 추상화 수준의 함수 추가 예정
// @ TODO : Add Maybe Monad 

const R = require('ramda');

interface IHasChildren {
  <TNode>(childrenKey: string, node: TNode) : boolean
}
export const hasChildren = R.curry((childrenKey, node) : IHasChildren => 
  R.pipe(
    R.when(
      R.complement(R.is(Object)),
      () => { throw new Error('Node must be an object.'); }
    ),
    R.when(
    R.complement(R.has(childrenKey)),
      () => { throw new Error(`Node must have a children prop named "${childrenKey}".`); }
    ),
    R.ifElse(
      R.propIs(Array, childrenKey),
      R.pipe(
        R.prop(childrenKey),
        R.complement(R.isEmpty),
      ),
      R.always(false)
    )
  )(node)
)


interface IIsLeafNode {
  <TNode>(childrenKey: string, node: TNode) : boolean
}
export const isLeafNode = R.curry((childrenKey, node): IIsLeafNode => 
  R.pipe(
    hasChildren(childrenKey),
    R.complement(R.identity),
  )(node)
)

interface IDeppFlatten {
  <TNode>(childrenKey: string, nodes: TNode): Array<TNode>;
}
export const deepFlatten = R.curry((childrenKey, nodes): IDeppFlatten =>
  R.pipe(
      R.chain((node) =>
        R.ifElse(
            hasChildren(childrenKey),
            R.pipe(
                R.prop(childrenKey),
                deepFlatten(childrenKey),
                R.concat([node]),
            ),
            R.always([node]),
        )(node),
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

interface IFilterEachNode {
     <TNode>(childrenKey: string, predicate: (node: TNode)=> boolean,  nodes: TNode): Array<TNode>;
}
export const filterEachNode = R.curry((childrenKey , predicate,  treeNodes): IFilterEachNode =>
  R.pipe(
      R.filter(predicate),
      R.map(
          R.ifElse(
            hasChildren,
            R.over(R.lensProp(childrenKey), filterEachNode(childrenKey, predicate)),
            R.identity
          )
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
    <TNode>(childrenKey: string, nodes: TNode[]): Array<TNode>;
}
export const extractLeafNodes= R.curry((childrenKey, nodes) : IExtractLeafNodes =>
  R.pipe(
      deepFlatten(childrenKey),
      R.filter(
          R.pipe(
              R.prop(childrenKey),
              R.isEmpty,
          ),
      ),
  )(nodes),
);

interface IUpdateEachNode {
    <TNode>(tchildrenKey: string, ransformation: (node: TNode) => TNode, nodes: TNode[]): Array<TNode>;
}
export const updateEachNode= R.curry((childrenKey, transformation, treeNodes) : IUpdateEachNode=>
  R.pipe(
      // @TODO apply hasChildren, isLeafNode function
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
                  // @TODO apply hasChildren, isLeafNode function 
                  R.ifElse(
                      R.both(
                          R.isNotNil,
                          R.hasPath([childrenKey]),
                      ),
                      R.over(
                          R.lensProp(childrenKey),
                          updateEachNode(childrenKey, transformation),
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
    <TNode>(childrenKey: string, start: number, sequenceKey: string,  nodes: TNode[]): Array<TNode>;
}
export const addIncreasementSequenceEachNode = R.curry((childrenKey, start, sequenceKey, treeNodes): IAddIncreasementSequenceEachNode => {
  const incrementer=createIncrementer(start);
  return updateEachNode(childrenKey, (el)=> R.assoc(sequenceKey, incrementer.next())(el),  treeNodes);
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
    <TNode>( childrenKey: string, condition: (node: TNode) => boolean, transformation: (node: TNode) => TNode, nodes: TNode[]): Array<TNode>;
}
export const updateNodesByCondition= R.curry((childrenKey, condition, transformation, treeNodes): IUpdateNodesByCondition =>
  updateEachNode(
      childrenKey,
      R.pipe(
          R.when(condition, transformation),
      ),
      
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
    <TNode>(childrenKey: string, propKey: string,  nodes: TNode[]): Array<TNode>;
}
export const removePropEachNode = R.curry((childrenKey, propKey,  treeNodes): IRemovePropEachNode =>
  updateEachNode(childrenKey, R.dissoc(propKey),  treeNodes));

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
    <TNode>(childrenKey: string, propKey: string, newPropKey: string,  nodes: TNode[]): Array<TNode>;
}
export const updatePropNameEachNode = R.curry((childrenKey, propKey, newPropKey,  treeNodes): IUpdatePropNameEachNode =>
  updateEachNode(
      childrenKey,
      (el)=>R.mergeAll(
          [
            {[newPropKey]: R.prop(propKey)(el)},
            R.omit([propKey])(el),
          ],
      )
      , treeNodes
  )
);

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
            [isLeafNode, (node)=> condition(node)],
            [hasChildren, (node) =>someLeafNode(childrenKey, condition, node.children)],
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
          // @TODO apply hasChildren, isLeafNode function 
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

