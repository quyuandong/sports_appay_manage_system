
const userInfo = state => state.user_info; // 用户信息
const currentRole = state => state.current_role; // 当前用户身份
const currentDepartmentId = state => state.user_info.did; // 当前用户身份
const currentRoleHome = state => {
  switch (state.current_role) {
    case 'A':
      return '/dashboard';
    case 'T':
      return '/teacher_dashboard';
    case 'S':
      return '/student_dashboard';
  }
}; // 当前用户首页
const browseHistoryList = state => state.browseHistoryList; // 浏览历史列表
const userToken = state => state.userToken; // 用户 token
const orderPaymentList = state => state.orderPaymentList; // 订单支付列表 
const addressInfo = state => state.addressInfo; // 地址信息
const tempAddress = state => state.tempAddress; // 临时地址

export default {
  userInfo, // 用户信息
  currentRole, // 当前用户身份
  currentDepartmentId,//当前登录人院系
  currentRoleHome,//当前登录人首页
  browseHistoryList, // 浏览历史列表
  userToken, // 用户 token
  orderPaymentList, // 订单支付列表
  addressInfo, // 地址信息
  tempAddress // 临时地址
}