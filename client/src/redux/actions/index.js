// action 타입 선언
export const LOGIN_INFO = "LOGIN_INFO";
export const LOGOUT = "LOGOUT";

// action 객체를 만드는 액션 생성자들을 선언
export const loginSuccess = (res) => ({
  type: LOGIN_INFO, // 액션의 이름과도 같은 존재
  payload: res // 액션과 함께 전달해야 할 값
});

export const logout = () => ({
  type: LOGOUT
});
