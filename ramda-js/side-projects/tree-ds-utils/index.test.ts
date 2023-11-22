
import { expect, it, test} from '@jest/globals';

import { hasChildren, isLeafNode  } from './index'

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


const tree = [{
  name: 'A',
  children: [
    {
      name: 'B',
      children: [
        {name: 'C', children: []},
        {name: 'D', children: []},
      ],
    },
    {
      name: 'E',
      children: [{name: 'F', children: []}],
    },
  ],
}]; 

const tree2 = [{
    name: 'A',
    children: [
      {
        name: 'B',
        children: [
          {name: 'C', children: []},
          {name: 'D', children: []},
        ],
      },
      {
        name: 'E-2',
        children: [{name: 'F', children: []}],
      },
    ],
  }]; 