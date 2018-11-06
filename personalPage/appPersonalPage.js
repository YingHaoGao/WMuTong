/*
  个人介绍
 */
const express = require('express');
const bodyParser=require('body-parser');
const nodemailer = require('nodemailer');
const fs=require('fs');

var app = express();
app.set('views', './');
app.set( 'view engine', 'html' );
app.use(express.static(__dirname + '/'));

app.use('/', express.static(__dirname + '/'));
app.engine( '.html', require( 'ejs' ).__express );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
  res.render('index')
});
app.get('/fsInLog',function(req,res){
  var ip=get_client_ip(req);
  time(ip);
});

app.post('/addurl',function(req, res){
  time(req.body.url);
});
app.post('/email', function(req, res){
  console.log(req.body.email);
  
  var transporter = nodemailer.createTransport({
    service: 'QQ',
    auth: {
      user: '2311848517@qq.com',//用户名
      pass: 'ubnaheeioqmpeafe'//密码
    }
  });
  
  var mailOptions = {
    from: '2311848517@qq.com ', // 发件人邮箱
    to: '18600408534@163.com', // 收件人
    subject: req.body.name+'-来自网站', // 标题
    text: '姓名：'+req.body.name+'\n邮箱：'+req.body.email
    +'\n内容：\n'+req.body.message, // 文本内容
    // html: '<b>Hello world ✔</b>' // html内容
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
    }else{
      //console.log('Message sent: ' + info.response);
      console.log('发送成功');
      res.end('ok');
    }
  });
});

//监听3000端口
app.listen(80,'0.0.0.0', function () {
  console.log('[80]');
});

function time(ip){
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  
  var t = year+'年'+month+'月'+day+'日 '+hour+':'+minute+':'+second;;
  var s=`访问时间：${t}  \r\n来自IP：${ip} \r\n----------------\r\n`;
  
  fs.appendFile(__dirname+'/log.txt',s,'utf-8',function(err){
    err && console.log(err);
    console.log(`${t} 写入成功`);
  });
}
function get_client_ip(req) {
  var ip = req.headers['x-forwarded-for'] ||
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress || '';
  if(ip.split(',').length>0){
    ip = ip.split(',')[0]
  }
  return ip;
};