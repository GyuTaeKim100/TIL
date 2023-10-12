import R from 'ramda';

export const removePropEachNode = (data, prop) => {
  if (R.is(Array, data)) {
    return R.map((item) => removePropEachNode(item, prop), data);
  } else if (R.is(Object, data)) {
    const newData = R.dissoc(prop, data); // Remove the specified prop from the object
    return R.mapObjIndexed((val) => removePropEachNode(val, prop), newData);
  }
  return data;
};

export const deepflatten = R.curry((propKey, data) =>
  R.pipe(
      R.chain((item) =>
        R.ifElse(
            R.hasPath([propKey]),
            R.pipe(
                R.prop(propKey),
                deepflatten(propKey),
                R.concat([item]),
            ),
            R.always([item]),
        )(item),
      ),
  )(data));

export const extractLeafNodes= R.curry((propKey, data) =>
  R.pipe(
      deepflatten(propKey),
      R.filter(
          R.pipe(
              R.prop(propKey),
              R.isEmpty,
          ),
      ),
  )(data),
);

export const ensureArray = R.cond([
  [R.isNil, R.always([])],
  [R.is(Array), R.identity],
  [R.is(Object), R.of],
]);

export const filterTreeNode = R.curry((predicate, childrenKey, treeNodes) =>
  R.pipe(
      R.filter(predicate),
      R.map(
          R.over(R.lensProp(childrenKey), filterTreeNode(predicate, childrenKey)),
      ),
  )(treeNodes),
);

// test for filterTreeNode
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
// console.log('filterTreeNode ', filterTreeNode((node) => !!node.children && ['A', 'B', 'D'].includes(node.name), 'children', tree));

export const updateEachNode= R.curry((transformation, childrenKey, treeNodes) =>
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

// @TODO: 모든 노드가 동일한 형태인지 파악하는 함수 필요

// @TODO 지연평가로 고차 문맥 형성하기
export const addSequenceToTreeNodes = R.curry((start, sequenceKey, childrenKey, treeNodes) => {
  const incrementer=createIncrementer(start);
  return updateEachNode((el)=> R.assoc(sequenceKey, incrementer.next())(el), childrenKey, treeNodes);
},
);

export const createIncrementer = (count= 0) => ({
  next: ()=> ++count,
});

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

export const updateNodesWithCondition= R.curry((condition, transformation, childrenKey, treeNodes) =>
  updateEachNode((el)=>
    R.pipe(
        R.tap((el)=> console.log('updateNodesWithCondition 1', el)),
        R.when(condition, transformation),
    )(el),
  childrenKey,
  treeNodes,
  ),
);

// test for updateNodesWithCondition
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
// console.log('updateNodesWithCondition', updateNodesWithCondition(R.propEq('A', 'name'), R.assoc('testValue', 1), 'children', tree4));

export const removePropFromNodes = R.curry((propKey, childrenKey, treeNodes) =>
  updateEachNode(R.dissoc(propKey), childrenKey, treeNodes));

// test for removePropFromNodes
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
// console.log('removePropFromNodes', removePropFromNodes('name', 'children', tree5));

export const updatePropNameFromNodes = R.curry((propKey, newPropKey, childrenKey, treeNodes) =>
  updateEachNode(
      (el)=>R.mergeAll(
          [
            {[newPropKey]: R.prop(propKey)(el)},
            R.omit([propKey])(el),
          ],
      )
      , childrenKey, treeNodes));

// test for removePropFromNodes
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
// console.log('updatePropNameFromNodes', updatePropNameFromNodes('name', 'name2', 'children', tree6));

// export const isLeafNodeValid = ({node, validate, parseChildren = null}) => {
//   const children = parseChildren ? parseChildren(node) : node.subRows;
//   const hasChildren = children?.length > 0;

//   if (hasChildren) {
//     return children.some((node) =>
//       isLeafNodeValid({node, validate, parseChildren}),
//     );
//   } else {
//     if (validate(node)) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// };


export const isLeafNodeCondition = R.curry(( childrenKey: string, condition: any, treeNodes: any[]) =>
  R.pipe(
      R.any(
          R.cond([
            [
              R.pipe(
                  R.prop(childrenKey),
                  R.isEmpty,
              ),
              (node)=> condition(node),
            ],
            [R.T, (node) =>isLeafNodeCondition(childrenKey, condition, node.children)],
          ],
          ),
      ),
  )(treeNodes),
);

// test for isLeafNodeCondition
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
// console.log('isLeafNodeCondition', isLeafNodeCondition( 'children', (el)=> el.name ==='F', tree7));

// export const deepflatten = R.curry((propKey, data) =>
//   R.pipe(
//       R.chain((item) =>
//         R.ifElse(
//             R.hasPath([propKey]),
//             R.pipe(
//                 R.prop(propKey),
//                 deepflatten(propKey),
//                 R.concat([item]),
//             ),
//             R.always([item]),
//         )(item),
//       ),
//   )(data));


// @TODO: 작동 안됨. 수정하면서 함수형 로직 구성 연습에 적합함.
// export const filterLeafNodePath = R.curry((childrenKey: string, predicate: any, treeNodes: any[]) =>
//   R.pipe(
//       R.tap((el)=> console.log('filterLeafNodePath 1', el)),
//       R.ifElse(
//           R.pipe(
//               R.view(R.lensProp(childrenKey)),
//               R.isEmpty,
//           ),
//           R.filter(predicate),
//           R.filter(
//               R.ifElse(
//                   R.pipe(
//                       R.tap((el)=> console.log('filterLeafNodePath 2', el)),
//                       R.over(
//                           R.lensProp(childrenKey),
//                           filterLeafNodePath(childrenKey, predicate),
//                       ),
//                       R.tap((el)=> console.log('filterLeafNodePath 3', el)),
//                       R.view(R.lensProp(childrenKey)),
//                       R.tap((el)=> console.log('filterLeafNodePath 4', el)),
//                       R.isEmpty,
//                   ),
//                   R.always(false),
//                   R.always(true),
//               ),
//           ),
//       ),
//       R.tap((el)=> console.log('filterLeafNodePath 5', el)),
//   )(treeNodes),
// );

// test for filterLeafNodePath
// const tree8 = [{
//   name: 'A',
//   children: [
//     {
//       name: 'B',
//       children: [
//         {name: 'C', value: 1, children: []},
//         {name: 'D', value: 2, children: []},
//       ],
//     },
//     {
//       name: 'E',
//       children: [{name: 'F', value: 3, children: []}],
//     },
//   ],
// },
// {
//   name: 'G',
//   children: [],
// },
// ];
// console.log('_____filterLeafNodePath', filterLeafNodePath('children', R.curry((el)=> {
//   console.log(' filterLeafNodePath predicate ', el, el.value ===1);
//   return el.value ===1;
// }), tree8));


