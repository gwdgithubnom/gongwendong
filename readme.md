# 项目描述

本项目主要用于记录数据的整理。

## 前言

整理数据是一件简单又不简单的事情。听起来是很矛盾，但是有非常现实，在任何事情随着量的变化、大小、尺寸、观念等等变化就转眼让事情发生巨大的差异性。而这件事情就可以体现在数据整理这件事上。

为了把这件事做清楚、做的好，所以需要确认一个标准，进而一个方案，进行实施并进行迭代改进。

## 数据

### 标签分类

- 类型标签

  - 文本类型
    - 11-文章(paper):
    - 12-知识(wiki):
    - 13-文档(document):

  - 媒体类型（图像/视频）
    - 21-音乐(music):
    - 22-配音(dubbing):
    - 23-录音(record):
    - 24-图画(drawing):
    - 25-相片(photo):
    - 26-图片(picture):
    - 27-电影(film):
    - 28-视频(video):
    - 29-短视频(short video):

  - 研究类型
    - 41-研究计划
    - 42-研究管理
    - 43-研究实践
    - 44-研究归档

  - 工作类型
    - 51-工作计划
    - 52-工作管理
    - 53-工作实践
    - 54-工作归档

  - 生活类型
    - 61-生活计划
    - 62-生活管理
    - 63-生活实践
    - 64-生活归档

  - 学习类型
    - 71-学习计划
    - 72-学习管理
    - 73-学习实践
    - 74-学习归档

  - 娱乐类型
    - 81-娱乐计划
    - 82-娱乐管理
    - 83-娱乐实践
    - 84-娱乐归档

  - 综合类型
    - 91-项目总结
    - 92-课题报告
    - 93-专项研究
    - 94-教程课程
    - 95-帮助文档
    - 99-隐私保密


### 标签词库

[常用词源](doc/china.md)

### 运行的命令

#### 配置依赖

```js
  // "lunaria:build": "lunaria --config docs/lunaria.config.json build",
```

# 参考资料

## 第三方依赖

本项目基于以下开源项目（均采用 MIT License）：

- [vitepress](https://github.com/vuejs/vitepress/tree/v1.6.4) - 提供了 vitepress 功能
- [vitepress-plugin-comment-with-giscus](https://github.com/comment-with-giscus/vitepress-plugin-comment-with-giscus) - 提供了评论功能