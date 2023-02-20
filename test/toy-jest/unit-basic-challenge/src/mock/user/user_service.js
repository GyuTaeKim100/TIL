class UserService {
  constructor(userClient) {
    this.userClient = userClient;
    this.isLogedIn = false;
  }

  login(id, password) {
    if (!this.isLogedIn) {
      // case 1. fetch만 별도로 단위 테스트가 불가능 
      //return fetch('http://example.com/login/id+password') //
      // .then((response) => response.json());
      
      // case 2. fetch만 별도로 단위 테스트(Stub 도는 Mock을 활용) 시 유리
      return this.userClient
        .login(id, password) //
        .then((data) => (this.isLogedIn = true));
    }
  }
}

module.exports = UserService;
