var utility = require('utility');
var express = require('express');

var app = express();

app.get('/', function(req, res){
  var q = req.query.q;
  res.send( utility.md5(q) );
});

app.listen(4000, function(req, res){ 
  console.log('running at 4000, open me by http://localhost:4000/?q=sakdaf , otherwise it will error'); 
});
