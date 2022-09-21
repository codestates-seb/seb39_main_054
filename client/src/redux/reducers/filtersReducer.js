import { CATEGORY, SEARCH, SHARE_STATUS } from "../actions/filtersAction";

const initialstate = {
  category: "",
  search: "",
  shareSatus: ""
};

const filtersReducer = (state = initialstate, action) => {
  // 상태 업데이트 로직
  switch (action.type) {
    case CATEGORY:
      return {
        ...state,
      };
    case SEARCH:
      return {
        ...state,
      };
    case SHARE_STATUS:
      return{
        ...state,
      }
    default:
      return state;
  }
};

export default filtersReducer;
