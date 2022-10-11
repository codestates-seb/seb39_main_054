export const PAGINATION_INFO = "PAGINATION_INFO";

export const paginationInfo = (res) => ({
  type: PAGINATION_INFO,
  payload: res,
});
