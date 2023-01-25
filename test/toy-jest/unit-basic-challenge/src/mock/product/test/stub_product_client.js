
class StubProductClient {
    async fetchItems () {
        return [
            {
                item: 'Milk', available: true
            },
            {
                item: 'banana', available: false
            }    
        ]
    }
}

module.exports= StubProductClient