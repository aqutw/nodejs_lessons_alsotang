var superagent = require('superagent');
var cheerio = require('cheerio');
var app = require('express')();

app.get('/', function (req, res, next) {
  superagent.get('https://cnodejs.org/')
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      // jquery life-style START
      var $ = cheerio.load(sres.text);
      var items = [];
      $('#topic_list .topic_title').each(function (idx, element) {
        var $element = $(element);
        items.push({
          title: $element.attr('title'),
          href: $element.attr('href')
        });
      });

      res.send(items);
    });
});

app.listen(4000, function(req, res){ 
  console.log('running at 4000, open me by http://localhost:4000/'); 
});
