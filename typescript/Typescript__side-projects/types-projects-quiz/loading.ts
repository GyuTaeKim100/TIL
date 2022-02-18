/**
 * 문제 요구사항
 * 1. loading 기능 구현
 *
 * 실행
 * - ts-node loading.ts
 */

{
  type LoadingState = {
    state: "loading";
  };

  type SuccessState = {
    state: "success";
    response: {
      body: string;
    };
  };

  type FailState = {
    state: "fail";
    reason: string;
  };

  type ResourceLoadState = LoadingState | SuccessState | FailState;

  printLoginState({ state: "loading" }); // 👀 loading...
  printLoginState({ state: "success", response: { body: "loaded" } }); // 😃 loaded
  printLoginState({ state: "fail", reason: "no network" }); // 😱 no network

  function printLoginState(state: ResourceLoadState): void {
    switch (state.state) {
      case "loading":
        console.log("loading...");
        break;
      case "success":
        console.log(`success, ${state.response.body}`);
        break;
      case "fail":
        console.log(`fail, ${state.reason}`);
        break;
      default:
        throw new Error(`unknown state: ${state}`);
    }
  }
}
