var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
  .end(function(err, res){
    if(err){ return console.error(err); }

    var topicUrls = [],
        ep = new eventproxy(),
        $ = cheerio.load(res.text);
    $('#topic_list .topic_title').each(function(k,v){
      var $v=$(v);
      var href = url.resolve(cnodeUrl, $v.attr('href'));
      topicUrls.push(href); 
    });

    console.log(topicUrls);

//eventproxy event binding
ep.after('topic_html', topicUrls.length, function(topics){
  topics = topics.map(function(rowTopic){//0 is url, 1 is text
    var topicUrl = rowTopic[0],
        topicHtml = rowTopic[1],
        $ = cheerio.load(topicHtml);

    return {title: $('.topic_full_title').text().trim()
           , href: topicUrl
           , comment1: $('.reply_content').eq(0).text().trim() 
           };
    
    console.log('FINAL:');
    console.log(topics);
  });
});

    //fetch all of topicUrls one by one
    topicUrls.forEach(function(v){
      superagent.get(v)
        .end(function(err, res){
          console.log('fetch ' + v + ' successfully');
          ep.emit('topic_html', [v, res.text]);
        });
    });

  });
