// 이 안에 현재 상태를 내장하고있고, 구독(subscribe)중인 함수들이 상태가 업데이트 될 때 마다 다시 실행되게 해줌

import { combineReducers } from "redux"; // 여러 reducer 들을 하나의 store에 저장 할 수 있게 해주는 함수
import { createStore } from "redux";
import loginReducer from "./reducers";

const rootReducer = combineReducers({
  loginReducer
});

const store = createStore(rootReducer);

export default store;
