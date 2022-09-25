// action 타입 선언
export const CATEGORY = "CATEGORY";
export const SEARCH = "SEARCH";
export const SHARE_STATUS = "SHARE_STATUS";

// action 객체를 만드는 액션 생성자들을 선언
export const category = (res) => ({
  type: CATEGORY, // 액션의 이름과도 같은 존재
  payload: res // 액션과 함께 전달해야 할 값
});

export const serach = (res) => ({
  type: SEARCH,
  payload: res // 액션과 함께 전달해야 할 값
});

export const shareStatus = (res) => ({
  type: SHARE_STATUS,
  payload: res // 액션과 함께 전달해야 할 값
});
