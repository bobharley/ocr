var express = require('express');
var router = express.Router();
var base64Img = require('base64-img')
var Tesseract = require('tesseract.js')

router.post('/ocr', function(req, res, next) {
  base64Img.img(req.body.base64, '', 'image', function(err, filepath) {
    Tesseract.recognize('./image.png')
      .then(function(result){
          res.send(result.text)
      })
  });
})

module.exports = router;
