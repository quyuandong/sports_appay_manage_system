# 党建e家项目
* 一个全栈的小项目的练习，由于种种原因，目前只实现了。后台管理系统与api服务端，前端页面尚未实现，


# 介绍
* 本项目以vue为基础，使用element-ui框架来实现后台管理界面的搭建，服务器端口使用的是node + express 来搭建的服务，使用的是mongo数据库，主要是针对高校的党建活动做的一款app,该项目中，密码使用==bcrytp==进行加密，并且使用到了==权限校验jwt==，所用到的知识点相对来说比较简单，程序相对来说比较简单易懂，非常适合新手来进行相关的练习操作。（PS:欢迎Star）
# 项目地址

* <a target="_blank" href="https://github.com/linkenliu/MissCloudVue">https://github.com/linkenliu/MissCloudVue</a>

# 项目的结构
![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/2019912dj_01.png)

# 项目实现的功能

 - 登录
- 修改密码
- 权限验证
- 密码加密
- 用户管理
- 轮播图管理
- 党员互动
- 民主评议
- 心得总结
- 思想汇报
- 新闻管理
- 批量删除
- 分页显示
- 模糊查询
- 图片上传
- 查询排序

# 展示

**后台**

![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/2019912jd_01.png)

![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/2019912jd_02.png)

![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/2019912jd_03.png)

![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/2019912jd_04.png)

![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/2019912jd_05.png)

![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/2019912jd_06.png)

![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/2019912jd_7.png)

![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/2019912jd_08.png)

![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/2019912jd_09.png)

![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/2019912jd_10.png)

![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/2019912jd_11.png)

![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/2019912jd_12.png)

![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/2019912jd_13.png)


![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/2019912jd_14.png)

![enter description here](https://gitee.com/qyd_9/nodebook_image/raw/master/小书匠/2019912jd_15.png)
# 技术栈
vue技术栈 + node + express +element-ui + axios + mongose,



# 部署
#### 安装mongo数据库

**导入数据库**
> 本项目导出的是json文件，需要用使用mongo的图像界面工具Studio 3T 进行导入


#### 运行服务器api ---- djServer

**安装依赖**
> npm install

**运行项目**

>node server.js  | nodemon server.js


#### 运行台管理 --- djCms
**安装依赖**
> npm install

**运行项目**

>npm  run dev

**打包**
>npm run build
>该项目打包时需要将登陆页的特效删除
>login.vue  和 main.js中  已经命名删除对应对的插件

**登录**
>账户：123456@qq.com
>密码：123456


# 项目待完善
1. 批量上传用户-exce
2. 民主评议-富文本编辑器-上传图片
3. 修改用户头像
4. 新闻管理-上传图片
5. 新闻管理-生成轮播图


