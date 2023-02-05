const UserService = require('../user_service');
const UserClient = require('../user_client');

// 행동 검증은 Stub이 아닌, Mock으로만 가능함.
describe('UserService' , () => {
    const login = jest.fn(async ()=> 'success');
    UserClient.mockImplementation(()=> {
        return {
            login
        }
    })
    let userService;

    beforeEach(()=> {
        userService = new UserService(new UserClient())
    })

    it('calls login() on UserClient when tries to login', async ()=> {
        await userService.login('abc', 'abc')
        expect(login.mock.calls.length).toBe(1)
    })

    it('should not call login() on UserClient again if already logged in', async() => {
        await userService.login('abc', 'abc')
        await userService.login('abc', 'abc')

        expect(login.mock.calls.length).toBe(1);
    })
})