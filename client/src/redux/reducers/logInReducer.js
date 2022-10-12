import { LOGIN_INFO, LOGOUT } from "../actions/logInAction";

const initialstate = {
  isLogin: false,
};

const loginReducer = (state = initialstate, action) => {
  // 상태 업데이트 로직
  switch (action.type) {
    case LOGIN_INFO:
      return {
        ...state,
        isLogin: true,
        ...action.payload, // res?
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
      };
    default:
      return state;
  }
};

export default loginReducer;
