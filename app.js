var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.listen(process.env.PORT);

console.log("Listening", process.env.PORT);