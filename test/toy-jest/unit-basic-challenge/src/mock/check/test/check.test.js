const check = require('../check');

describe('check', ()=> {
    let onSuccess;
    let onFail;

    beforeEach(()=> {
        onSuccess = jest.fn();
        onFail = jest.fn();
    })

    it('should call onSuccess when predicate is true', () => {
        check(()=> true, onSuccess, onFail)

        // 직관적이지 않음.
        expect(onSuccess.mock.calls.length).toBe(1)
        expect(onSuccess.mock.calls[0][0]).toBe('yes')
        expect(onFail.mock.calls.length).toBe(0)

        // 직관적
        expect(onSuccess).toHaveBeenCalledTimes(1);
        expect(onSuccess).toHaveBeenCalledWith('yes')
        expect(onFail).toHaveBeenCalledTimes(0)
    })

    it('should call onFail when predicate is false', () => {
        check(()=> false, onSuccess, onFail)

        // 직관적
        expect(onFail).toHaveBeenCalledTimes(1);
        expect(onFail).toHaveBeenCalledWith('no')
        expect(onSuccess).toHaveBeenCalledTimes(0)
    })
})