const ProductService = require('../product_service_no_di.js');
const ProductClient = require('../product_client.js');
// 내부 의존성에 대한 Mock 처리
// Mock을 남용하는 나쁜 예제이다.
jest.mock('../product_client')

describe('ProductService', () => {
    const fetchItems = jest.fn(async ()=> {
        return [{
            item: 'Milk', available: true
        },
        {
            item: 'banana', available: false
        }
    ]
    })
    ProductClient.mockImplementation(()=> {
        return {
            fetchItems
        }
    })

    let productService;

    beforeEach(()=> {
        productService = new ProductService();
        fetchItems.mockClear();
        ProductClient.mockClear();
    })

    it('should filter out only available items', async()=> {
        const items = await productService.fetchAvailableItems()
        expect(items.length).toBe(1)
        expect(items).toEqual([{
            item: 'Milk', available: true
        }])
    })

    it('test', async()=> {
        await productService.fetchAvailableItems()
        expect(fetchItems).toHaveBeenCalledTimes(1)
        
    })
})