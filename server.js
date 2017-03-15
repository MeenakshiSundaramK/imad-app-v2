var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').Pool;
var app = express();
var bodyParser = require('body-parser');

var crypto = require('crypto');
app.use(morgan('combined'));
app.use(bodyParser.json());



var articles = {  
    'article-one' : {
        title : 'Article One | By MSK',
        heading : 'Article One',
        date : 'Feb 11, 2017',
        content : `
                    <p>
                        This is my first article.
                    </p>
                  `
    
    },
    'article-two' : {
        title : 'Article Two | By MSK',
        heading : 'Article Two',
        date : 'Feb 12, 2017',
        content : `
                    <p>
                        This is my second article.
                    </p>
                    `
    },
    'article-three' : {
        title : 'Article Three | By MSK',
        heading : 'Article Three',
        date : 'Feb 13, 2017',
        content : `
                    <p>
                        This is my third article.
                    </p>
                `
    }
};

function createtemplate(data) {
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    var htmltemplate = `
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="/ui/style.css" rel="stylesheet" />
        </head>        
        
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <div>
                    ${heading}
                </div>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
    `;
    
    return htmltemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articlename', function (req, res) {
  var articlename = req.params.articlename;
  res.send(createtemplate(articles[articlename]));
});

var counter=0;
app.get('/counter',function(req,res) {
    counter = counter + 1;
    res.send(counter.tostring());
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

function hash(input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return [ "pbkdf2","10000",salt, hashed.toString('hex')].join('$)');
}
app.get('/hash/:input',function(req,res) {
    var hashedString = hash(req.params.input, 'random-string');
    res.send(hashedString);
    
});

app.post('/create-user', function(req, res) {
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.getRandomBytes(128).toString('hex');
   var dbstring = hash(password, salt);
   pool.query(' INSERT INTO "user" (username, password) VALUES ($1,$2)',[username,dbString],function(err,result) {
       if (err) {
           res.status(500).send(err.toString());
       }
       else {
           res.send("User successfully created:", + username);
       }
       
   });
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
