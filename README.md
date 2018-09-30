## 安装 ##

```shell
yarn install
```

## src命令说明 ##

```shell
$ gulp server [--env=dev|integ|qa|prod]
$ gulp build [--env=dev|integ|qa|prod]
```

## vue部分命令 ##

```shell
# 启动开发
$ npm run dev
# 编译
$ npm run build
```

## 项目说明 ##
```
├── gulpfile.js     src页面编译命令
├── README.md
├── config          src配置
├── package.json
├── source          服务小计、客户档案等vue相关页面
├── src             店务助手其它页面
└── vue.config.js   vue-cli配置

├── README.md
├── app.config.js   vue多页面配置
├── babel.config.js
├── config          src环境配置
├── gulpfile.js     src页面编译命令
├── package.json
├── public          vue模板
│   ├── favicon.ico
│   ├── index.html
│   └── static      vue静态文件
├── source          vue页面
├── src             tmpl页面
├── vue.config.js   vue-cli配置
└── yarn.lock
```
