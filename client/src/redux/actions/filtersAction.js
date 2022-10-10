// action 타입 선언
export const CATEGORY_SELECT = "CATEGORY_SELECT";
export const SEARCH_SELECT = "SEARCH_SELECT";
export const SHARE_STATUS_SELECT = "SHARE_STATUS_SELECT";

// action 객체를 만드는 액션 생성자들을 선언
export const categorySelect = (res) => ({
  type: CATEGORY_SELECT, // 액션의 이름과도 같은 존재
  payload: res, // 액션과 함께 전달해야 할 값
});

export const serachSelect = (res) => ({
  type: SEARCH_SELECT,
  payload: res, 
});

export const shareStatusSelect = (res) => ({
  type: SHARE_STATUS_SELECT,
  payload: res, 
});
