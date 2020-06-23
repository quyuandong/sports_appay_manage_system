import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';

//富文本编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import dayjs from 'dayjs'
import { get, cloneDeep } from 'lodash'

Vue.use(ElementUI, {
    size: 'small', zIndex: 3000
});
Vue.config.productionTip = false;


Vue.prototype.$dayjs = dayjs
Vue.prototype.$get = get
Vue.prototype.$cloneDeep = cloneDeep


//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('user_info');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

Vue.filter('DateFormat', date => {
    if (!date) {
      return ''
    }
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
  })
  Vue.filter('DayFormat', date => {
    if (!date) {
      return ''
    }
    return dayjs(date).format('YYYY-MM-DD')
  })
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
