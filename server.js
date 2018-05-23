const express = require('express');
const path = require('path');
var proxy = require('http-proxy-middleware');

var options = {
  target: 'https://sela-test.herokuapp.com',
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    '^/api': ''
  }
};

var myProxy = proxy(options);

const app = express();

app.use('/api', myProxy);

app.use(express.static(__dirname + '/dist'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(process.env.PORT || 8080);