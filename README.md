## 安装 ##
1. npm install

## 命令说明 ##
1. grunt [--env=dev|integ|qa|prod]
2. grunt www [--env=dev|integ|qa|prod]
3. grunt app [--env=dev|integ|qa|prod]
4. grunt release [--env=dev|integ|qa|prod]

## vue部分命令 ##

```
# 启动开发
$ npm run dev
# 编译
$ npm run dist
```

# 服务小计（17/6/13） #
## 1. 项目基本结构

## 2. 组件 ##
### m-pictures ###

API

 参数 | 说明   | 类型 | 必选 | 默认值
----|----------|----|------|----
pictures | 图片列表  | Array | true  | [ ]
has-add | 能否添加照片 | Boolean | false  | true
has-remove | 能否移除照片 | Boolean | false  | true
max-count | 最多几张图片 | Number | false  | 9
min-count | 最少几张图片 | Number | false  | 0
has-counter | 是否需要底部状态栏 | Number | false  | true

event

事件名 | 描述 |参数
---- |------ |----
add | 添加某张图片 | pic：要添加的图片, index：插入指定的下标）
remove | 移除某张图片 | imgId：图片在列表中的下标

### m-tags ###

API

 参数 | 说明   | 类型 | 必选 | 默认值
---- |----------|----|------|----
tags | 标签列表  | Array | true  | [ ]

event

事件名 | 描述 |参数
---- |------ |----
add | 添加某个标签 | tag:要添加的标签对象
remove | 移除某个标签 | tag:要移除的标签对象

### m-picture ###

API

 参数 | 说明   | 类型 | 必选 | 默认值
---- |----------|----|------|----
index | 在列表中的下标(列表项有多个时必须指定)  | Number | false  | 0
picture | 图片对象  | Object | true  | { id: null, base64: null }
proportion | 宽高比例  | Object | false  | { w: 1, h: 1 }

event

事件名 | 描述 |参数
----|------|---
submit | 提交图片时触发 | img：包含base64的原图片对象


