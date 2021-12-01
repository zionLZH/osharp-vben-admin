<div align="center"> <a href="https://github.com/anncwb/vue-vben-admin"> <img alt="VbenAdmin Logo" width="200" height="200" src="https://anncwb.github.io/anncwb/images/logo.png"> </a> <br> <br>

[![license](https://img.shields.io/github/license/anncwb/vue-vben-admin.svg)](LICENSE)

<h1>OSharp vben admin</h1>
</div>

## 简介

OSharp Vben Admin 是一个免费开源的中后台模版。基于 vue-vben-admin 开发，对接 osharp 后端，开箱即用，内置 osharp 用户，权限，系统管理模块与辅助工具类，使得 osharp 后台对接工作得以简化。

## 特性

- **最新技术栈**：使用 Vue3/vite2 等前端前沿技术开发
- **TypeScript**: 应用程序级 JavaScript 的语言
- **权限** 内置完善的动态路由权限生成方案
- **组件** 二次封装了多个常用的组件
- **Jwt** 支持 osharp 官方刷新 Token 逻辑，无感刷新
- **细颗粒度控制** 支持 osharp 官方细颗粒度的权限控制，精确到具体单个权限，功能模块匹配等

## 相关文档

[vben 文档地址](https://vvbin.cn/doc-next/)  
[osharp 文档地址](https://docs.osharp.org/quick/intro/)  
[vue3 文档地址](https://v3.cn.vuejs.org/)

## 准备

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Vite](https://vitejs.dev/) - 熟悉 vite 特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 Vue 基础语法
- [TypeScript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Vue-Router-Next](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [Ant-Design-Vue](https://2x.antdv.com/docs/vue/introduce-cn/) - ui 基本使用
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs 基本语法

## 安装使用

- 获取项目代码

```bash
git clone https://github.com/zionLZH/osharp-vben-admin.git
```

- 安装依赖

```bash
cd osharp-vben-admin

yarn install

```

- 运行

```bash
yarn serve
```

- 打包

```bash
yarn build
```

## 注意

对于需要进行多站点后台管理的，需要开启多个子站点 Tabs 的请自行处理 src/store/modules/user.ts 中的 TODO

```
/**
 * @description: logout
 */
async logout(goLogin = false) {
  if (this.getToken) {
    try {
      await Logout()
    } catch {
      console.log('注销Token失败')
    }
  }
  this.setToken(undefined)
  this.setRoleList([])
  this.setModules([])
  this.setSessionTimeout(false)
  // TODO 如果出现需要多站点后台管理的，并且token刷新过期的，请改为location.reload
  // goLogin && location.reload(true)
  goLogin && router.push(PageEnum.BASE_LOGIN)
},
```

## 如何贡献

非常欢迎你的加入！[提一个 Issue](https://github.com/zionLZH/osharp-vben-admin/issues/new/choose) 或者提交一个 Pull Request。

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 相关仓库

如果这些插件对你有帮助，可以给一个 star 支持下

- [vite-plugin-mock](https://github.com/anncwb/vite-plugin-mock) - 用于本地及开发环境数据 mock
- [vite-plugin-html](https://github.com/anncwb/vite-plugin-html) - 用于 html 模版转换及压缩
- [vite-plugin-style-import](https://github.com/anncwb/vite-plugin-style-import) - 用于组件库样式按需引入
- [vite-plugin-theme](https://github.com/anncwb/vite-plugin-theme) - 用于在线切换主题色等颜色相关配置
- [vite-plugin-imagemin](https://github.com/anncwb/vite-plugin-imagemin) - 用于打包压缩图片资源
- [vite-plugin-compression](https://github.com/anncwb/vite-plugin-compression) - 用于打包输出.gz|.brotil 文件
- [vite-plugin-svg-icons](https://github.com/anncwb/vite-plugin-svg-icons) - 用于快速生成 svg 雪碧图

## 维护者

[@ZionLin](https://github.com/zionLZH)

## 捐赠

如果你觉得这个项目对你有帮助，你可以帮作者买一杯咖啡表示支持!

![donate](https://public-1251222689.cos.ap-guangzhou.myqcloud.com/zionlin.png)

## License

[MIT](./LICENSE)
