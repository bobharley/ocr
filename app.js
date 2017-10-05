var express = require('express');
var base64Img = require('base64-img')
var Tesseract = require('tesseract.js')
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.get('/', function(req, res) {
  res.send('The server is working.\nSend a POST request to /api/ocr with a request body {img: "base64"}');
})

app.post('/api/ocr', function(req, res) {
  if(req.body.img) {
    base64Img.img(req.body.img, '', 'image', function(err, filepath) {
      Tesseract.recognize('./image.png')
      .then(function(result){
         res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(
          {
            result: {
              text: result.text.replace('\n','').replace('\n',''),
              confidence: result.confidence,
            }
          }, null, 2));
      })
    });
  }
  else {
    res.send('base64 not found');
  }
})

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3000);
console.log('Server listening on port 3000')
