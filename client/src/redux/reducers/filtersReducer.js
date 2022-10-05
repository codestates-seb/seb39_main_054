import {
  CATEGORY_SELECT,
  SEARCH_SELECT,
  SHARE_STATUS_SELECT,
} from "../actions/filtersAction";

const initialstate = {
  categorySelect: "",
  searchSelect: "",
  shareSatusSelect: "",
};

const filtersReducer = (state = initialstate, action) => {
  // 상태 업데이트 로직
  switch (action.type) {
    case CATEGORY_SELECT:
      return {
        ...state,
        categorySelect: action.payload,
      };
    case SEARCH_SELECT:
      return {
        ...state,
        searchSelect: action.payload,
      };
    case SHARE_STATUS_SELECT:
      return {
        ...state,
        shareSatusSelect: action.payload,
      };
    default:
      return state;
  }
};

export default filtersReducer;
