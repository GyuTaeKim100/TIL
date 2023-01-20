const fetchProduct = require('../async.js')

describe('Async', () => {
  // 5초 대기함. return 방식 추천
  it('async - done', (done) => {
    fetchProduct().then(item => {
      expect(item).toEqual({item: 'Milk', price: 200})
      done();
    })
  })
  
  it('async - return', () => {
    return fetchProduct().then(item => {
      expect(item).toEqual({item: 'Milk', price: 200})
    })
  })

  // 추천
  it('async - await', async () => {
    const product =  await fetchProduct()
    expect(product).toEqual({item: 'Milk', price: 200})
  })

  it('async - resolves', () => {
   return expect(fetchProduct()).resolves.toEqual({item: 'Milk', price: 200})
  })

  it('async - reject', () => {
    return expect(fetchProduct('error')).resolves.rejects.toBe('network error')
  })
})