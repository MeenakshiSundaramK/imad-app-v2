var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {  
    'article-one' : {
        Title : 'Article One | By MSK',
        Heading : 'Article One',
        date : 'Feb 11, 2017',
        content : `
                    <p>
                        This is my first article.
                    </p>
                  `
    
    },
    'article-two' : {
        Title : 'Article Two | By MSK',
        Heading : 'Article Two',
        date : 'Feb 12, 2017',
        content : `
                    <p>
                        This is my second article.
                    </p>`
    
    },
    'article-three' : {
        Title : 'Article Three | By MSK',
        Heading : 'Article Three',
        date : 'Feb 13, 2017',
        content : `
                    <p>
                        This is my third article.
                    </p>`
    
    }
};

function createtemplate(data) {
    var Title = data.Title;
    var Heading = data.Heading;
    var date = data.date;
    var content = data.content;
    
    var htmltemplate = `
    <html>
        <title>
            ${Title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="/ui/style.css" rel="stylesheet" />
        
        
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <div>
                    ${Headings}
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


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
