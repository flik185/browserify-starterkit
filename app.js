var express = require('express'),
    app = express(),
    path = require('path'),
    formidable = require('formidable'),
    fs = require('fs');


app.use(express.static(path.join(__dirname, 'static/dist')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'static/dist/index.html'));
});

var server = app.listen(3000, function(){
  console.log('Server listening on port 3000');
});
