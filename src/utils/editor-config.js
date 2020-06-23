
import { Notification  } from "element-ui"
// 图片上传参数配置
const uploadConfig = {
  action: 'http://localhost:3000/api/common/image',  // 必填参数 图片上传地址
  methods: 'POST',  // 必填参数 图片上传方式
  token: sessionStorage.token,  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
  name: 'img',  // 必填参数 文件的参数名
  size: 5000,  // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
  accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'  // 可选 可上传的图片格式
}

// toolbar工具栏的工具选项（默认展示全部）
const toolOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean'],
  // ['link', 'image', 'video']
  ['image']
]

// handler重写事件, 任何工具按钮的功能都可以重写，这里只重写图片上传事件
const handlers = {
  image: function image() {
    var self = this;

    var fileInput = this.container.querySelector('input.ql-image[type=file]');
    if (fileInput === null) {
      fileInput = document.createElement('input');
      fileInput.setAttribute('type', 'file');
      // 设置图片参数名
      if (uploadConfig.name) {
        fileInput.setAttribute('name', uploadConfig.name);
      }
      // 可设置上传图片的格式
      fileInput.setAttribute('accept', uploadConfig.accept);
      fileInput.classList.add('ql-image');
      // 监听选择文件
      fileInput.addEventListener('change', function () {
        // 如果图片限制大小
        if (uploadConfig.size && fileInput.files[0].size >= uploadConfig.size * 1024) {
          fileInput.value = ''
          return
        }
        // 创建formData
        var formData = new FormData()
        formData.append(uploadConfig.name, fileInput.files[0])
        // 如果需要token且存在token
        if (uploadConfig.token) {
          formData.append('token', uploadConfig.token)
        }
        // 图片上传
        var xhr = new XMLHttpRequest()
        xhr.open(uploadConfig.methods, uploadConfig.action, true)
        // 上传数据成功，会触发
        xhr.onload = function (e) {
          if (xhr.status === 200) {
            var res = JSON.parse(xhr.responseText)
            let length = self.quill.getSelection(true).index;
            self.quill.insertEmbed(length, 'image', res.data)
            self.quill.setSelection(length + 1)
          }
          fileInput.value = ''
        }
        // 开始上传数据
        xhr.upload.onloadstart = function (e) {
          fileInput.value = ''
          // console.log('开始上传')
        }
        // 当发生网络异常的时候会触发，如果上传数据的过程还未结束
        xhr.upload.onerror = function (e) {
          Notification .error('当前网络异常')
        }
        // 上传数据完成（成功或者失败）时会触发
        xhr.upload.onloadend = function (e) {
          // console.log('上传结束')
        }
        xhr.send(formData)
      });
      this.container.appendChild(fileInput);
    }
    fileInput.click();
  }
}
// 全部配置
export const editorOptions = {
  placeholder: '',
  theme: 'snow',  // 主题
  modules: {
    toolbar: {
      container: toolOptions,  // 工具栏选项
      handlers: handlers  // 事件重写
    }
  }
}
