import * as types from './mutations-type';

const mutations = {
  // 设置 state 中 categoryList
  SET_USER_INFO(state, payload) {
    state.user_info = payload;
  },
  // 设置 state 中 locationCity
  SET_CURRENT_TYPE(state, payload) {
    state.current_role = payload;
  },
  // 设置 state 中 searchHistoryList
  [types.SEARCH_HISTORY_LIST](state, searchHistoryList) {
    state.searchHistoryList = searchHistoryList;
  },
  // 设置 state 中 browseHistoryList
  [types.BROWSE_HISTORY_LIST](state, browseHistoryList) {
    state.browseHistoryList = browseHistoryList;
  },
  // 设置 state 中 token
  [types.USER_TOKEN](state, token) {
    state.userToken = token;
  },
  // 设置 state 中 orderPaymentList
  [types.ORDER_PAYMENT_LIST](state, orderPaymentList) {
    state.orderPaymentList = orderPaymentList;
  },
  // 设置 state 中 addressInfo
  [types.ADDRESS_INFO](state, addressInfo) {
    state.addressInfo = addressInfo;
  },
  // 设置 state 中 tempAddress
  [types.TEMP_ADDRESS](state, tempAddress) {
    state.tempAddress = tempAddress;
  },
};

export default mutations;
