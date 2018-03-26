var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var users = require('./routes/user');
var mongojs = require('mongojs');
//From mLab, To connect using a driver via the standard MongoDB URI:
var db = mongojs('mongodb://USERNAME:PASSWORD@dsXXXXX.mlab.com:XXXX/userdb001', ['UserInfo']);

var port = 3000;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set("userdb",db);
app.use("/api",users);

app.listen(port, function(){
    console.log('Server started on port '+port);
});