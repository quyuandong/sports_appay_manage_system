import Vue from 'vue';
import Router from 'vue-router';
import store from "../store/index"

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect:  to => {
                return store.getters.currentRoleHome
              },
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/teacher_dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/TeacherDashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/student_dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/StudentDashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/changePassword',
                    component: () => import('../views/admin/ChangePassword.vue'),
                    meta: { title: '修改密码' }
                },
                {
                    path: '/adminModify',
                    component: () => import('../views/admin/AdminModify.vue'),
                    meta: { title: '管理员维护' }
                },
                {
                    path: '/noticeAdd',
                    component: () => import('../views/notice/NoticeAdd.vue'),
                    meta: { title: '公告添加' }
                },
                {
                    path: '/noticeManage',
                    component: () => import('../views/notice/NoticeManage.vue'),
                    meta: { title: '公告管理' }
                },
                {
                    path: '/sportAdd',
                    component: () => import('../views/sport/SportAdd.vue'),
                    meta: { title: '运动项目添加' }
                },
                {
                    path: '/sportManage',
                    component: () => import('../views/sport/SportManage.vue'),
                    meta: { title: '运动项目管理' }
                },
                {
                    path: '/apply',
                    component: () => import('../views/apply/applyManage.vue'),
                    meta: { title: '报名管理' }
                },
                {
                    path: '/applyAudit',
                    component: () => import('../views/apply/applyAudit.vue'),
                    meta: { title: '报名审核' }
                },
                {
                    path: '/applyList',
                    component: () => import('../views/apply/applyList.vue'),
                    meta: { title: '已审核列表' }
                },
                {
                    path: '/systemProperty',
                    component: () => import('../views/system/SystemProperty.vue'),
                    meta: { title: '系统属性' }
                },
                {
                    path: '/systemInform',
                    component: () => import('../views/system/SystemInform.vue'),
                    meta: { title: '系统通知' }
                },
                {
                    path: '/systemOut',
                    redirect: to => {
                        localStorage.clear();
                        return '/login'
                        // 方法接收 目标路由 作为参数
                        // return 重定向的 字符串路径/路径对象
                      },
                    component: () => {  },
                    meta: { title: '安全退出系统' }
                },
                {
                    path: '/departmentAdd',
                    component: () => import('../views/department/DepartmentAdd.vue'),
                    meta: { title: '院系添加' }
                },
                {
                    path: '/departmentManage',
                    component: () => import('../views/department/DepartmentManage.vue'),
                    meta: { title: '院系管理' }
                },
                {
                    path: '/teacherAdd',
                    component: () => import('../views/teacher/TeacherAdd.vue'),
                    meta: { title: '管理员添加' }
                },
                {
                    path: '/teacherManage',
                    component: () => import('../views/teacher/TeacherManage.vue'),
                    meta: { title: '管理员管理' }
                },
                {
                    path: '/teacherApprover',
                    component: () => import('../views/teacher/TeacherApprover.vue'),
                    meta: { title: '管理员审批' }
                },
                {
                    path: '/specialtyAdd',
                    component: () => import('../views/specialty/SpecialtyAdd.vue'),
                    meta: { title: '专业添加' }
                },
                {
                    path: '/specialtyManage',
                    component: () => import('../views/specialty/SpecialtyManage.vue'),
                    meta: { title: '专业管理' }
                },
                {
                    path: '/classAdd',
                    component: () => import('../views/class/ClassAdd.vue'),
                    meta: { title: '班级添加' }
                },
                {
                    path: '/classManage',
                    component: () => import('../views/class/ClassManage.vue'),
                    meta: { title: '班级管理' }
                },
                {
                    path: '/studentAdd',
                    component: () => import('../views/student/StudentAdd.vue'),
                    meta: { title: '运动员添加' }
                },
                {
                    path: '/studentManage',
                    component: () => import('../views/student/StudentManage.vue'),
                    meta: { title: '运动员管理' }
                },
                {
                    path: '/studentApprover',
                    component: () => import('../views/student/StudentApprover.vue'),
                    meta: { title: '运动员审批' }
                },
                {
                    path: '/modifyInfo',
                    component: () => import('../pages/student/base/modifyInfo.vue'),
                    meta: { title: '基本信息维护' }
                },
                {
                    path: '/modifyPassword',
                    component: () => import('../pages/student/base/ModifyPassword.vue'),
                    meta: { title: '密码修改' }
                },
                {
                    path: '/newNotice',
                    component: () => import('../pages/student/notice/NewNotice.vue'),
                    meta: { title: '最新公告' }
                },
                {
                    path: '/studentSportManage',
                    component: () => import('../pages/student/sport/StudentSportManage.vue'),
                    meta: { title: '运动项目' }
                },
                {
                    path: '/editDetail',
                    component: () => import('../pages/common/EditorDetail.vue'),
                    meta: { title: '信息详情' }
                },
                {
                    path: '/mySportManage',
                    component: () => import('../pages/student/sport/MySportManage.vue'),
                    meta: { title: '运动项目' }
                },
                {
                    path: '/teacherModifyPassword',
                    component: () => import('../pages/teacher/base/ModifyPassword.vue'),
                    meta: { title: '密码修改' }
                },
                {
                    path: '/adminApply',
                    component: () => import('../pages/admin/apply/applyManage.vue'),
                    meta: { title: '报名管理' }
                },
                {
                    path: '/adminApplyAudit',
                    component: () => import('../pages/admin/apply/applyAudit.vue'),
                    meta: { title: '报名审核' }
                },
                {
                    path: '/adminApplyList',
                    component: () => import('../pages/admin/apply/applyList.vue'),
                    meta: { title: '报名列表' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import('@/views/login/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
