Tesseract REST API
================


REST API OCR(Optical Character Recognition) using tesseractjs nodejs and express

----------

### Install

run `npm install`

### Usage

Start the server by running `node app`
It should log `"Server listening on port 3000"`

Then send a POST request with a request body 
```javascript 
{img: "base64"} 
``` 
where "base64" is your image converted to base64
