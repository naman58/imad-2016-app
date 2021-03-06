var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user: 'naman58',
    database: 'naman58',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

var articles= {
    'article-one':{
    title: 'ARTICLE ONE',
    heading: 'article one',
    date: 'sep 5,2016',
    content: `<p>this is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first article</p>
            <p>this is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first article</p>
            <p>
            this is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first articlethis is the content for my first article</p>`
   },
    'article-two':{
        title: 'ARTICLE two',
        heading: 'article two',
        date: 'sep 10,2016',
        content: `<p>ethis is the content for my second</p>`
    },
    'article-three':{
        title: 'ARTICLE three',
        heading: 'article three',
        date: 'sep 15,2016',
        content: `<p>ethis is the content for my third article</p>`
    },
};
function createtemplate (data) {
    var title= data.title;
    var date= data.date;
    var heading= data.heading;
    var content= data.content;

    var htmltemplate=`
        <html>
             <head>
                <title>${title}</title>
                 <link href="/ui/style.css" rel="stylesheet" />
            </head>    
            <BODY background="https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg">
                <div class="container">
                    <div>
                    <a href="/">home</a>
                     </div>
                    <hr/>
                    <h3>${heading}</h3>
                    <div>${date}</div>
                    <div align="right"><img src="https://en.wikipedia.org/wiki/Algemeen_Dagblad#/media/File:New_Logo_AD.jpg" alt="advertisement" width="400px" height="400px"><br><a href="https://en.wikipedia.org/wiki/Algemeen_Dagblad">ad link</a></div>
                    <div>${content}</div>
               </div>     
            </BODY>
            </html>
        `;
        return htmltemplate;
}



app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function(req,res) {
   //make a request
   //return a response with the results
   pool.query("SELECT * FROM test WHERE title = ' " + req.params.artcleName + " ' ", function(err,result){
       if (err){
           res.status(500).send(err.toString());
       } else {
           res.send(JSON.stringify(result.rows));
           
       }
   });
});

var counter=0;
app.get('/counter',function(req,res) {
   counter=counter + 1;
   res.send(counter.toString());
});

var names=[];
app.get('/submit-name',function(req,res) {//url: /submit-name?name=xxxxx
    //get he name from the request 
    var name = req.query.name; //1000
    names.push(name);
    //json-javascript object notation
    res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function (req, res) {
    //articleName == article-one
    //articles[articleName] == {} content object for article one
    var articleName = req.params.articleName;
    pool.query('SELECT * FROM article WHERE title = $1', [req.params.articleName] , function(err,resut){
        if (err){
            res.status(500).send(err.toString());
        }else{
            if (result.rows.length === 0){
                res.status(404).send('article not found');
                
            }else{
                var articleData = result.rows[0];
                res.send(createtemplate(articleData));
                
            }
        }
    });
    
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
