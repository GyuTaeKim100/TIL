
import { describe, expect, test} from '@jest/globals';

const R = require('ramda');

import { hasChildren, isLeafNode, deepFlatten , ensureArray, filterEachNode, extractLeafNodes } from './index'


describe('hasChildren', ()=> {

  test('node의 자식이 배열이면서 길이가 1 이상인 경우, true를 반환한다.', ()=> {
    const childrenKey = 'children'
    const node = { [childrenKey]: [{name:'children 1-1'}] }
    
    expect(hasChildren(childrenKey, node )).toEqual(true)
  })  

  test('node의 자식이 빈 배열인 경우, false를 반환한다.', ()=> {
    const childrenKey = 'children'
    const node = { [childrenKey]: [] }

    expect(hasChildren(childrenKey, node )).toEqual(false)
  })  

  test('node가 객체 타입이 아닌 경우, error를 throw한다', () => {
    const childrenKey = 'children'
    const node = `Invalid node type`


    expect(() => hasChildren(childrenKey, node)).toThrow()
  })

  test('node의 자식 prop이 존재하지 않는 경우, error를 throw한다.', () => {
    const node = {}

    expect(() => hasChildren('Invalid children key', node)).toThrow()
  })
})

describe('isLeafNode', ()=> {
  test('node의 자식이 배열이면서 길이가 0인 경우, true를 반환한다.', ()=> {
    const childrenKey = 'children'
    const node = { [childrenKey]: [] }

    expect(isLeafNode(childrenKey, node )).toEqual(true)
  })

  test('node의 자식이 배열이면서 길이가 1 이상인 경우, false를 반환한다.', ()=> {
    const childrenKey = 'children'
    const node = { [childrenKey]: [{name:'children 1-1'}] }

    expect(isLeafNode(childrenKey, node )).toEqual(false)
  })

  test('node가 객체 타입이 아닌 경우, error를 throw한다', () => {
    const childrenKey = 'children'
    const node = `Invalid node type`

    expect(() => isLeafNode(childrenKey, node)).toThrow()
  })

  test('node의 자식 prop이 존재하지 않는 경우, error를 throw한다.', () => {
    const node = {}

    expect(() => isLeafNode('Invalid children key', node)).toThrow()
  })
})

describe('deepFlatten', ()=> {
  test(
    '다중 root node를 가진 배열에 대해서, 순차적이면서, 전위순회 순서로 1depth 형식의 node의 배열을 반환한다. ', ()=> {
    const childrenKey = 'children'

    const nodes = [
      {name: '1', children: [
        {name: '1-1', children: [
          {name: '1-1-1', children: [
            {name: '1-1-1-1', children: []},
            {name: '1-1-1-2', children: []},
          ]},
          ]},
          {name: '1-1-2', children: []},
        ]
      },
      {name: '1-2', children: [
          {name: '1-2-1', children: [
            {name: '1-2-1-1', children: []},
            {name: '1-2-1-2', children: []},
          ]},
          {name: '1-2-2', children: []},
        ]
      },
      {name: '1-3', children: []}, 
    ]

    expect(deepFlatten(childrenKey, nodes))
    .toEqual([
      expect.objectContaining({name: '1'}),
      expect.objectContaining({name: '1-1'}),
      expect.objectContaining({name: '1-1-1'}),
      expect.objectContaining({name: '1-1-1-1'}),
      expect.objectContaining({name: '1-1-1-2'}),
      expect.objectContaining({name: '1-1-2'}),
      expect.objectContaining({name: '1-2'}),
      expect.objectContaining({name: '1-2-1'}), 
      expect.objectContaining({name: '1-2-1-1'}),
      expect.objectContaining({name: '1-2-1-2'}),
      expect.objectContaining({name: '1-2-2'}),
      expect.objectContaining({name: '1-3'}),  
    ])
  })

  test('빈 배열인 경우, 빈 배열을 반환한다.', ()=> {
    const childrenKey = 'children'
    const nodes = []

    expect(deepFlatten(childrenKey, nodes)).toEqual([])
  })

  test('배열 타입이 아닌 경우, error를 throw한다', () => {
    const childrenKey = 'children'
    const nodes = `Invalid node type`

    expect(() => deepFlatten(childrenKey, nodes)).toThrow()
  })

  test('자식 prop이 존재하지 않는 경우, error를 throw한다.', () => {
    const childrenKey = 'children'
    const nodes = [{ }]

    expect(() => deepFlatten(childrenKey, nodes)).toThrow()
  })
})

describe('ensureArray', ()=> {
  test('undefined인 경우, 빈 배열을 반환한다.', ()=> {
    expect(ensureArray(undefined)).toEqual([])
  })  

  test('Array인 경우, 그대로 반환한다.', ()=> {
    const nodes = [
      {name: '1', children: [
        {name: '1-1', children: [
          {name: '1-1-1', children: [
            {name: '1-1-1-1', children: []},
            {name: '1-1-1-2', children: []},
          ]},
          ]},
          {name: '1-1-2', children: []},
        ]
      },
      {name: '1-2', children: [
          {name: '1-2-1', children: [
            {name: '1-2-1-1', children: []},
            {name: '1-2-1-2', children: []},
          ]},
          {name: '1-2-2', children: []},
        ]
      },
      {name: '1-3', children: []}, 
    ]

    expect(ensureArray(nodes)).toEqual(nodes)
  })

  test('Object 타입인 경우, Array로 래핑 후 반환한다.', ()=> {
    const node ={name: 'something', children: []} 
    expect(ensureArray(node)).toEqual([node])
  })
})

describe('filterEachNode', ()=> {
  test('빈 배열인 경우, 빈 배열을 반환한다.', ()=> {
    const nodes = []
    expect(filterEachNode('children', ()=> true, nodes)).toEqual([])
  })

  test('모든 노드를 필터 처리하면, 빈배열을 반환한다.', ()=> {
    const childrenKey = 'children'
    const nodes = [
      {name: '1', children: [
        {name: '1-1', children: [
          {name: '1-1-1', children: [
            {name: '1-1-1-1', children: []},
            {name: '1-1-1-2', children: []},
          ]},
          ]},
          {name: '1-1-2', children: []},
        ]
      },
      {name: '1-2', children: [
          {name: '1-2-1', children: [
            {name: '1-2-1-1', children: []},
            {name: '1-2-1-2', children: []},
          ]},
          {name: '1-2-2', children: []},
        ]
      },
      {name: '1-3', children: []}, 
    ]

    expect(filterEachNode(childrenKey, ()=> false, nodes)).toEqual([])
  })

  test('특정 조건의 단말 노드를 필터 처리한다', ()=> {
    const childrenKey = 'children'
    const nodes = [
      {name: '1', children: [
        {name: '1-1', children: [
          {name: '1-1-1', children: [
            {name: '1-1-1-1', children: []},
            {name: '1-1-1-2', children: []},
          ]},
          ]},
          {name: '1-1-2', children: []},
        ]
      },
      {name: '1-2', children: [
          {name: '1-2-1', children: [
            {name: '1-2-1-1', children: []},
            {name: '1-2-1-2', children: []},
          ]},
          {name: '1-2-2', children: []},
        ]
      },
      {name: '1-3', children: []}, 
    ]

    const expected = [
      {name: '1', children: [
        {name: '1-1', children: [
          {name: '1-1-1', children: [
            // {name: '1-1-1-1', children: []},
            {name: '1-1-1-2', children: []},
          ]},
          ]},
          {name: '1-1-2', children: []},
        ]
      },
      {name: '1-2', children: [
          {name: '1-2-1', children: [
            // {name: '1-2-1-1', children: []},
            {name: '1-2-1-2', children: []},
          ]},
          // {name: '1-2-2', children: []},
        ]
      },
      {name: '1-3', children: []}, 
    ]

    expect(filterEachNode(childrenKey, (node)=> !['1-1-1-1', '1-2-1-1', '1-2-2'].includes(node.name) ,nodes)).toEqual(expected)
  })

  test('특정 조건의 중간 노드를 필터 처리한다', ()=> {
    const childrenKey = 'children'
    const nodes = [
      {name: '1', children: [
        {name: '1-1', children: [
          {name: '1-1-1', children: [
            {name: '1-1-1-1', children: []},
            {name: '1-1-1-2', children: []},
          ]},
          ]},
          {name: '1-1-2', children: []},
        ]
      },
      {name: '1-2', children: [
          {name: '1-2-1', children: [
            {name: '1-2-1-1', children: []},
            {name: '1-2-1-2', children: []},
          ]},
          {name: '1-2-2', children: []},
        ]
      },
      {name: '1-3', children: []}, 
    ]

    const expected = [
      {name: '1', children: [
        // {name: '1-1', children: [
        //   {name: '1-1-1', children: [
        //     {name: '1-1-1-1', children: []},
        //     {name: '1-1-1-2', children: []},
        //   ]},
        //   ]},
          {name: '1-1-2', children: []},
        ]
      },
      {name: '1-2', children: [
          {name: '1-2-1', children: [
            {name: '1-2-1-1', children: []},
            {name: '1-2-1-2', children: []},
          ]},
          // {name: '1-2-2', children: []},
        ]
      },
      {name: '1-3', children: []}, 
    ]

    expect(filterEachNode(childrenKey, (node)=> !['1-1', '1-2-2'].includes(node.name) ,nodes)).toEqual(expected)
  })


  test('특정 조건의 중간 노드를 필터 처리한다', ()=> {
    const childrenKey = 'children'
    const nodes = [
      {name: '1', children: [
        {name: '1-1', children: [
          {name: '1-1-1', children: [
            {name: '1-1-1-1', children: []},
            {name: '1-1-1-2', children: []},
          ]},
          ]},
          {name: '1-1-2', children: []},
        ]
      },
      {name: '1-2', children: [
          {name: '1-2-1', children: [
            {name: '1-2-1-1', children: []},
            {name: '1-2-1-2', children: []},
          ]},
          {name: '1-2-2', children: []},
        ]
      },
      {name: '1-3', children: []}, 
    ]

    const expected = [
      // {name: '1', children: [
      //   {name: '1-1', children: [
      //     {name: '1-1-1', children: [
      //       {name: '1-1-1-1', children: []},
      //       {name: '1-1-1-2', children: []},
      //     ]},
      //     ]},
      //     {name: '1-1-2', children: []},
      //   ]
      // },
      {name: '1-2', children: [
          {name: '1-2-1', children: [
            {name: '1-2-1-1', children: []},
            {name: '1-2-1-2', children: []},
          ]},
          {name: '1-2-2', children: []},
        ]
      },
      // {name: '1-3', children: []}, 
    ]

    expect(filterEachNode(childrenKey, (node)=> !['1', '1-3'].includes(node.name) ,nodes)).toEqual(expected)
  })
})

describe('extractLeafNodes', ()=> {
  test('모든 단말 노드를 반환한다.', ()=> {
    const childrenKey = 'children'
    const nodes = [
      {name: '1', children: [
        {name: '1-1', children: [
          {name: '1-1-1', children: [
            {name: '1-1-1-1', children: []},
            {name: '1-1-1-2', children: []},
          ]},
          ]},
          {name: '1-1-2', children: []},
        ]
      },
      {name: '1-2', children: [
          {name: '1-2-1', children: [
            {name: '1-2-1-1', children: []},
            {name: '1-2-1-2', children: []},
          ]},
          {name: '1-2-2', children: []},
        ]
      },
      {name: '1-3', children: []}, 
    ]

    const expected =[
      {name: '1-1-1-1', children: []},
      {name: '1-1-1-2', children: []}, 
      {name: '1-1-2', children: []},
      {name: '1-2-1-1', children: []},
      {name: '1-2-1-2', children: []},
      {name: '1-2-2', children: []},
      {name: '1-3', children: []}, 
    ]

    expect(extractLeafNodes(childrenKey, nodes)).toEqual(expected)
  })

  test('빈 배열인 경우, 빈 배열을 반환한다.', ()=> {
     expect(extractLeafNodes('children', [])).toEqual([])
  })
})