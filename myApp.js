let express = require('express');
let app = express();
let bodyParser = require('body-parser');

console.log("Hello World");

  app.use(bodyParser.urlencoded({extended: false}));


app.use(function(req, res, next){
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
  });

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
  });
  
  app.use("/public", express.static(__dirname + "/public"));

const mySecret = process.env['MESSAGE_STYLE'];

app.get("/json", (req, res) => {

        var jsonResponse = {"message": "Hello json"};

        if (process.env.MESSAGE_STYLE==='uppercase') {
            jsonResponse.message = jsonResponse.message.toUpperCase();
        }
        res.json(jsonResponse);
        
  });

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time
    });
  }
  );

 app.get("/:word/echo", (req, res) => {
    const{ word } = req.params;
    res.json({
      echo: word
    });
  });

 app.get("/name", (req, res) => {
    res.json({
      name: req.query.first + " " + req.query.last
    });
  });

app.post("/name", bodyParser.urlencoded({extended: false}), (req, res) => {
    let string = req.body.first + " " + req.body.last;
    res.json({name: string});
  });
  




































 module.exports = app;
































 module.exports = app;
