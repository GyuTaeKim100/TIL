
import { expect, it, test} from '@jest/globals';

import { hasChildren, isLeafNode, deepFlatten  } from './index'

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
  test('다중 root node를 가진 배열의 트리 구조에 대해서, 모든 node를 전위 순회 순서의 1depth 배열 형식으로 반환한다.', ()=> {
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

