## 访问
www.wmutong.com

## 安装
    cnpm install || cnpm init

## 启动
    node app.js

## 功能

1. 建立浏览
2. 邮件发送

#### 邮件使用方法

1. 在app.js中。在transporter对象中设置默认发送邮箱的用户名和密码,如下：
<pre>var transporter = nodemailer.createTransport({
    service: 'QQ',
    auth: {
        user: 'xxx@qq.com',//用户名
        pass: 'xxx'//授权码，在qq邮箱可获得
    }
});</pre>
2. 在mailOptions对象中设置发送信息,如下：
<pre>var mailOptions = {
    from: 'xxx@qq.com ', // 发件人邮箱
    to: 'xxx@qq.com', // 收件人
    subject: 'Hello ✔', // 标题
    text: 'Hello world ✔', // 文本内容
    html: '<b>Hello world ✔</b>' // html内容
};</pre>
