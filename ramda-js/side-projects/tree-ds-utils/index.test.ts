
import { expect, test} from '@jest/globals';

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

const sum = (a, b) => a + b

test('test ', ()=> {
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
    
        expect(tree).toMatchObject(tree2)

})