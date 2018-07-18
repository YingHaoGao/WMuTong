const express = require('express');

var app = express();
app.set('views', './');
app.set( 'view engine', 'html' );
app.use(express.static(__dirname + '/'));

app.use('/', express.static(__dirname + '/'));
app.engine( '.html', require( 'ejs' ).__express );

app.get('/', function(req, res){
  res.render('index')
});

//监听8082端口
app.listen(8082,'0.0.0.0', function () {
  console.log('[8082]');
});
