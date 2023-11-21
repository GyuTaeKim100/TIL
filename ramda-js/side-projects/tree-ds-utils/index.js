"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePropNameEachNode = exports.updateNodesByCondition = exports.updateEachNode = exports.someLeafNodeV2 = exports.someLeafNode = exports.removePropEachNode = exports.isLeafNode = exports.isDescendantNodeCondition = exports.hasChildren = exports.filterEachNode = exports.extractLeafNodes = exports.ensureArray = exports.deepFlatten = exports.addIncreasementSequenceEachNode = void 0;
// @ TODO : TypeScript 적용 필용 - 1차적으로 완료
// @ TODO : Jest 기반 Test Code 작성 필요
// @ TODO : 보다 높은 추상화 수준의 함수 추가 예정
// @ TODO : Add Maybe Monad 

const R = require('ramda');
const hasChildren = exports.hasChildren = R.curry((childrenKey, node) => R.pipe(R.when(R.complement(R.is(Object)), () => {
  throw new Error('Node must be an object.');
}), R.when(R.complement(R.has(childrenKey)), () => {
  throw new Error(`Node must have a children prop named "${childrenKey}".`);
}), R.ifElse(R.propIs(Array, childrenKey), R.pipe(R.prop(childrenKey), R.complement(R.isEmpty)), R.always(false)))(node));
const isLeafNode = exports.isLeafNode = R.curry((childrenKey, node) => R.either(R.pipe(R.prop(childrenKey), R.isNil), R.complement(hasChildren))(node));
const deepFlatten = exports.deepFlatten = R.curry((childrenKey, nodes) => R.pipe(R.chain(node => R.ifElse(hasChildren(childrenKey), R.pipe(R.prop(childrenKey), deepFlatten(childrenKey), R.concat([node])), R.always([node]))(node)))(nodes));
const ensureArray = exports.ensureArray = R.cond([[R.isNil, R.always([])], [R.is(Array), R.identity], [R.is(Object), R.of(Array)]]);

// console.log('ensuerArray - 1', ensureArray({a: 1}));
// console.log('ensuerArray - 2', ensureArray([]));
// console.log('ensuerArray - 3', ensureArray(null));

const filterEachNode = exports.filterEachNode = R.curry((childrenKey, predicate, treeNodes) => R.pipe(R.filter(predicate), R.map(R.ifElse(hasChildren, R.over(R.lensProp(childrenKey), filterEachNode(childrenKey, predicate)), R.identity)))(treeNodes));

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

const extractLeafNodes = exports.extractLeafNodes = R.curry((childrenKey, nodes) => R.pipe(deepFlatten(childrenKey), R.filter(R.pipe(R.prop(childrenKey), R.isEmpty)))(nodes));
const updateEachNode = exports.updateEachNode = R.curry((childrenKey, transformation, treeNodes) => R.pipe(
// @TODO apply hasChildren, isLeafNode function
R.ifElse(R.isNil, R.identity, R.pipe(R.map(R.ifElse(R.isNil, R.identity, transformation)), R.map(
// @TODO apply hasChildren, isLeafNode function 
R.ifElse(R.both(R.isNotNil, R.hasPath([childrenKey])), R.over(R.lensProp(childrenKey), updateEachNode(childrenKey, transformation)), R.identity)))))(treeNodes));

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

const createIncrementer = (count = 0) => ({
  next: () => ++count
});
const addIncreasementSequenceEachNode = exports.addIncreasementSequenceEachNode = R.curry((childrenKey, start, sequenceKey, treeNodes) => {
  const incrementer = createIncrementer(start);
  return updateEachNode(childrenKey, el => R.assoc(sequenceKey, incrementer.next())(el), treeNodes);
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

const updateNodesByCondition = exports.updateNodesByCondition = R.curry((childrenKey, condition, transformation, treeNodes) => updateEachNode(childrenKey, R.pipe(R.when(condition, transformation)), treeNodes));

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

const removePropEachNode = exports.removePropEachNode = R.curry((childrenKey, propKey, treeNodes) => updateEachNode(childrenKey, R.dissoc(propKey), treeNodes));

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

const updatePropNameEachNode = exports.updatePropNameEachNode = R.curry((childrenKey, propKey, newPropKey, treeNodes) => updateEachNode(childrenKey, el => R.mergeAll([{
  [newPropKey]: R.prop(propKey)(el)
}, R.omit([propKey])(el)]), treeNodes));

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

const someLeafNode = exports.someLeafNode = R.curry((childrenKey, condition, treeNodes) => R.pipe(R.any(R.cond([[isLeafNode, node => condition(node)], [hasChildren, node => someLeafNode(childrenKey, condition, node.children)]])))(treeNodes));

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

const someLeafNodeV2 = exports.someLeafNodeV2 = R.curry((childrenKey, condition, treeNodes) => R.any(R.pipe(
// @TODO apply hasChildren, isLeafNode function 
R.ifElse(R.both(R.pipe(R.prop(childrenKey), R.is(Array)), R.has(childrenKey), R.pipe(R.prop(childrenKey), R.complement(R.empty))), R.pipe(R.prop(childrenKey), someLeafNodeV2(childrenKey, condition)), el => condition(el))))(treeNodes));

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
const isDescendantNodeCondition = ({
  node,
  validate,
  parseChildren
}) => {
  const children = parseChildren ? parseChildren(node) : node.subRows;
  const hasChildren = children?.length > 0;
  if (validate(node)) {
    return true;
  }
  if (hasChildren) {
    return children.some(node => isDescendantNodeCondition({
      node,
      validate,
      parseChildren
    }));
  } else {
    return false;
  }
};
exports.isDescendantNodeCondition = isDescendantNodeCondition;
