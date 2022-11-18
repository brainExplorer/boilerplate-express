let express = require('express');
let app = express();
require('dotenv').config();
console.log("Hello World");

//app.get('/',(req, res)=> {
//  res.send('Hello Express');
//})

app.use("/public",express.static(__dirname +  "/public"))

 module.exports = app;
app.get("/",(req, res)=> {
  res.sendFile(__dirname + "/views/index.html");
})

app.get("/json",(req, res)=> {
  if (process.env['MESSAGE_STYLE'] == "uppercase") {
     res.json({"message": "HELLO JSON"});
  }
  else{
    res.json({"message": "Hello json"});
  }
})

app.use((req,res,next)=>{
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
})

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({time:req.time});
});

app.get("/:word/echo",(req,res)=>{
  res.json({echo : req.params.word});
})

let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));

app.get("/name",(req,res)=>{
  res.json({name : req.query.first + " " + req.query.last});
})

app.post("/name",(req,res)=>{
  res.json({ name: req.body.first + " " + req.body.last });
})
