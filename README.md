# 运动会报名管理项目
* 运动会报名管理系统，是本人业余时间完成的一个==全栈式的==后台管理系统，该系统虽然相对比较简单，但是功能结构相对比较完整，很适合进行学习使用。


# 介绍
* 本项目以vue为基础，使用element-ui框架来实现管理系统界面的搭建，服务器端口使用的是node + express 来搭建的服务，使用的是mysql数据库，并使用[sequelize](http://www.nodeclass.com/api/sequelize.html)实现对数据库的操作，Sequelize 是一个基于 promise 的 Node.js ORM, 目前支持 Postgres, MySQL, SQLite 和 Microsoft SQL Server. 它具有强大的事务支持, 关联关系, 读取和复制等功能。运动报名管理系统设计的功能操作非常贴近实用，欢迎大家来进行相关的指正。(PS:欢迎Star）
# 项目地址

* <a target="_blank" href="https://github.com/quyuandong/sports_appay_manage_system">https://github.com/quyuandong/sports_appay_manage_system</a>

# 项目的结构
![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/2020622QQ截图20200622224004.png)

# 项目实现的功能

 - 登录
 - 注册
- 修改密码
- 用户管理
- 公告管理
- 运动项目管理
- 管理员管理
- 运动员管理
- 报名管理
- 系统管理
- 院系管理
- 专业管理
- 班级管理
- 运动项目管理
- 我的报名项目

# 展示

**系统**

![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/20206220622-1.png)

![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/20206220622-2.png)

![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/20206220622-3.png)

![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/20206220622-4.png)

![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/20206220622-5.png)


# 技术栈
vue技术栈 + node + express +element-ui + axios + mysql,



# 部署
#### 安装mySQL数据库

**导入数据库**
> 本项目导出的是sql脚本，需要用使用mysql的图像界面工具或者是命令方式 进行导入


#### 运行服务器api ---- hhServe

**安装依赖**
> npm install

**运行项目**

>npm start


#### 运行台管理 --- hhCms
**安装依赖**
> npm install

**运行项目**

>npm  run serve

**打包**
>npm run build
>该项目打包时需要将登陆页的特效删除
>login.vue  和 main.js中  已经命名删除对应对的插件

**登录**
>账户：admin
>密码：123456


# 联系我
需要完整系统或者有问题的可以联系我 (PS:欢迎Star）

![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/2020622QQ截图20200622222850.png)

>**备注：** gitHub + 姓名