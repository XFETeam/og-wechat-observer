# og-wechat-observer

> 导语: 在日常开发过程中, 为了扩大传播在微信上的传播, 无论是 PC 或移动端都需要进行相关的自定义分享. 我们可以以 \<script\> 的方式或 commonjs import 一个封装好的微信 script 后根据业务场景编写自定义分享代码, 而这里我们也已经加入到项目工作流中, 使其成为一种默认的规范. 但基于代码设计层面却稍显不足. <br />
因此，我尝试借鉴 SEO 中的 og 标签的思路重构微信分享代码编写，也借此文章分享一些经验和思路给大家。<br />
作者: 佘艾伦

本文大纲介绍
------------------------------------------------
* 简要介绍 og 标签 (思路来源)
* 基于MutationObserver进行改进

### 1. 什么是 og 标签

og是一种新的HTTP头部标记，即Open Graph Protocol：
The Open Graph Protocol enables any web page to become a rich object in a social graph.
即这种协议可以让网页成为一个“富媒体对象”。
用了Meta Property=og标签，就是你同意了网页内容可以被其他社会化网站引用等，目前这种协议被SNS网站如Fackbook、renren采用。
SNS已经成为网络上的一大热门应用，优质的内容通过分享在好友间迅速传播。为了提高站外内容的传播效率，2010年F8会议上Facebook公布了一套开放内容协议(Open Graph Protocol)，任何网页只要遵守该协议，SNS就能从页面上提取最有效的信息并呈现给用户。

常见为:
```html
<html prefix="og: http://ogp.me/ns#">
<head>
...
<meta property="og:title" content="页面标题" />
<meta property="og:type" content="website" />
<meta property="og:url" content="http://example.com" />
<meta property="og:image" content="http://example.com/images/image.jpg" />
...
</head>
...
</html>
```

使用Open Graph Protocol的好处：
* 能够正确被蜘蛛抓取您的内容到百度网页搜索
* 帮助您的内容更有效的在百度结构化展现
* 按照您网页的类型，在<head>中添加入meta标签,并填上相应的内容

通过如移动端的 360浏览器, 我们可以直接通过 og 实现自定义分享当前页面内容.



如果想了解更多关于 og meta, 可以前往 [`百度将支持搜索结果OG协议结构化展示，wordpress增加og协议meta标签
`](http://www.luoxiao123.cn/1200.html) 进行相关了解

## 参考链接
https://blog.csdn.net/tanga842428/article/details/82666761 

### 2. og 标签的思考