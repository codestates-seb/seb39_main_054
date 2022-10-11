import { PAGINATION_INFO } from "../actions/paginationAction";

const initialstate = {
  page: 1,
  size: 16,
  totalElements: 0,
  totalPages: 1,
};

const paginationReducer = (state = initialstate, action) => {
  // 상태 업데이트 로직
  switch (action.type) {
    case PAGINATION_INFO:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default paginationReducer;
