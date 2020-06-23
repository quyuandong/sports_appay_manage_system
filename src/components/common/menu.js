export const admin_menu = [
    {
        icon: 'el-icon-lx-home',
        index: 'dashboard',
        title: '系统首页'
    },
    {
        icon: 'el-icon-rank',
        index: '2',
        title: '基本操作',
        subs: [
            {
                index: 'changePassword',
                title: '修改密码'
            },
            {
                index: 'adminModify',
                title: '管理员维护'
            }
        ]
    },
    {
        icon: 'el-icon-rank',
        index: '3',
        title: '公告管理',
        subs: [
            {
                index: 'noticeAdd',
                title: '公告添加'
            },
            {
                index: 'noticeManage',
                title: '公告管理'
            }
        ]
    },
    {
        icon: 'el-icon-rank',
        index: '4',
        title: '运动项目管理',
        subs: [
            {
                index: 'sportAdd',
                title: '运动项目添加'
            },
            {
                index: 'sportManage',
                title: '运动项目管理'
            }
        ]
    },
    {
        icon: 'el-icon-rank',
        index: '5',
        title: '管理员管理',
        subs: [
            {
                index: 'teacherAdd',
                title: '管理员添加'
            },
            {
                index: 'teacherApprover',
                title: '管理员审批'
            },
            {
                index: 'teacherManage',
                title: '管理员管理'
            }
        ]
    },
    {
        icon: 'el-icon-rank',
        index: '6',
        title: '院系管理',
        subs: [
            {
                index: 'departmentAdd',
                title: '院系添加'
            },
            {
                index: 'departmentManage',
                title: '院系管理'
            }
        ]
    },
    {
        icon: 'el-icon-rank',
        index: '7',
        title: '报名管理',
        subs: [
            {
                index: 'adminApply',
                title: '报名管理'
            }
            // {
            //     index: 'applyAudit',
            //     title: '报名审核'
            // },
            // {
            //     index: 'applyList',
            //     title: '已审核列表'
            // }
        ]
    },
    {
        icon: 'el-icon-rank',
        index: '8',
        title: '系统管理',
        subs: [
            {
                index: 'systemProperty',
                title: '系统属性'
            },
            {
                index: 'systemInform',
                title: '系统通知'
            },
            {
                index: 'systemOut',
                title: '安全退出系统'
            }
        ]
    },

    // {
    //     icon: 'el-icon-rank',
    //     index: '8',
    //     title: '专业管理',
    //     subs: [
    //         {
    //             index: 'specialtyAdd',
    //             title: '专业添加'
    //         },
    //         {
    //             index: 'specialtyManage',
    //             title: '专业管理'
    //         }
    //     ]
    // },

    // {
    //     icon: 'el-icon-lx-cascades',
    //     index: 'table',
    //     title: '基础表格'
    // },
    // {
    //     icon: 'el-icon-lx-calendar',
    //     index: '12',
    //     title: '表单相关',
    //     subs: [
    //         {
    //             index: 'form',
    //             title: '基本表单'
    //         },
    //         {
    //             index: '9-2',
    //             title: '三级菜单',
    //             subs: [
    //                 {
    //                     index: 'editor',
    //                     title: '富文本编辑器'
    //                 },
    //                 {
    //                     index: 'markdown',
    //                     title: 'markdown编辑器'
    //                 }
    //             ]
    //         },
    //         {
    //             index: 'upload',
    //             title: '文件上传'
    //         }
    //     ]
    // },
    // {
    //     icon: 'el-icon-lx-emoji',
    //     index: 'icon',
    //     title: '自定义图标'
    // },
    // {
    //     icon: 'el-icon-pie-chart',
    //     index: 'charts',
    //     title: 'schart图表'
    // },
    // {
    //     icon: 'el-icon-lx-warn',
    //     index: '13',
    //     title: '错误处理',
    //     subs: [
    //         {
    //             index: 'permission',
    //             title: '权限测试'
    //         },
    //         {
    //             index: '404',
    //             title: '404页面'
    //         }
    //     ]
    // }
]

export const teacher_menu = [
    {
        icon: 'el-icon-lx-home',
        index: 'teacher_dashboard',
        title: '系统首页'
    },
    {
        icon: 'el-icon-rank',
        index: '2',
        title: '基本操作',
        subs: [
            {
                index: 'teacherModifyPassword',
                title: '修改密码'
            },
        ]
    },
    {
        icon: 'el-icon-rank',
        index: '5',
        title: '报名管理',
        subs: [
            {
                index: 'apply',
                title: '报名管理'
            }
            // {
            //     index: 'applyAudit',
            //     title: '报名审核'
            // },
            // {
            //     index: 'applyList',
            //     title: '已审核列表'
            // }
        ]
    },

    {
        icon: 'el-icon-rank',
        index: '8',
        title: '专业管理',
        subs: [
            {
                index: 'specialtyAdd',
                title: '专业添加'
            },
            {
                index: 'specialtyManage',
                title: '专业管理'
            }
        ]
    },
    {
        icon: 'el-icon-rank',
        index: '9    ',
        title: '班级管理',
        subs: [
            {
                index: 'classAdd',
                title: '班级添加'
            },
            {
                index: 'classManage',
                title: '班级管理'
            }
        ]
    },
    {
        icon: 'el-icon-rank',
        index: '10    ',
        title: '运动员管理',
        subs: [
            {
                index: 'studentAdd',
                title: '运动员添加'
            },
            {
                index: 'studentApprover',
                title: '运动员审批'
            },
            {
                index: 'studentManage',
                title: '运动员管理'
            }
        ]
    },
    {
        icon: 'el-icon-rank',
        index: '6',
        title: '系统管理',
        subs: [
            {
                index: 'systemProperty',
                title: '系统属性'
            },
            {
                index: 'systemInform',
                title: '系统通知'
            },
            {
                index: 'systemOut',
                title: '安全退出系统'
            }
        ]
    },

]

export const student_menu = [
    {
        icon: 'el-icon-lx-home',
        index: 'student_dashboard',
        title: '系统首页'
    },
    {
        icon: 'el-icon-rank',
        index: '2',
        title: '基本操作',
        subs: [
            {
                index: 'modifyPassword',
                title: '密码修改'
            },
            {
                index: 'modifyInfo',
                title: '基本信息维护'
            }
        ]
    },
    {
        icon: 'el-icon-rank',
        index: '3',
        title: '公告管理',
        subs: [
            {
                index: 'newNotice',
                title: '最新公告'
            }
        ]
    },
    {
        icon: 'el-icon-rank',
        index: '4',
        title: '运动项目',
        subs: [
            {
                index: 'studentSportManage',
                title: '运动项目'
            }
        ]
    },
    {
        icon: 'el-icon-rank',
        index: '5',
        title: '我的报名项目',
        subs: [
            {
                index: 'mySportManage',
                title: '我的报名'
            }
            // {
            //     index: 'applyAudit',
            //     title: '报名审核'
            // },
            // {
            //     index: 'applyList',
            //     title: '已审核列表'
            // }
        ]
    },
    {
        icon: 'el-icon-rank',
        index: '6',
        title: '系统管理',
        subs: [
            {
                index: 'systemProperty',
                title: '系统属性'
            },
            {
                index: 'systemInform',
                title: '系统通知'
            },
            {
                index: 'systemOut',
                title: '安全退出系统'
            }
        ]
    },
    // {
    //     icon: 'el-icon-lx-cascades',
    //     index: 'table',
    //     title: '基础表格'
    // },
    // {
    //     icon: 'el-icon-lx-calendar',
    //     index: '12',
    //     title: '表单相关',
    //     subs: [
    //         {
    //             index: 'form',
    //             title: '基本表单'
    //         },
    //         {
    //             index: '9-2',
    //             title: '三级菜单',
    //             subs: [
    //                 {
    //                     index: 'editor',
    //                     title: '富文本编辑器'
    //                 },
    //                 {
    //                     index: 'markdown',
    //                     title: 'markdown编辑器'
    //                 }
    //             ]
    //         },
    //         {
    //             index: 'upload',
    //             title: '文件上传'
    //         }
    //     ]
    // },
    // {
    //     icon: 'el-icon-lx-emoji',
    //     index: 'icon',
    //     title: '自定义图标'
    // },
    // {
    //     icon: 'el-icon-pie-chart',
    //     index: 'charts',
    //     title: 'schart图表'
    // },
    // {
    //     icon: 'el-icon-lx-warn',
    //     index: '13',
    //     title: '错误处理',
    //     subs: [
    //         {
    //             index: 'permission',
    //             title: '权限测试'
    //         },
    //         {
    //             index: '404',
    //             title: '404页面'
    //         }
    //     ]
    // }

]