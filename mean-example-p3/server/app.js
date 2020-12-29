var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var users = require('./routes/user');
var index = require('./routes/index');
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:123456@ds149353.mlab.com:49353/userdb001', ['UserInfo']);

//JWT config
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
// Authentication middleware. When used, the
// access token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the singing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://fullstackcircle.auth0.com/.well-known/jwks.json'
      }),
    
      // Validate the audience and the issuer.
      audience: process.env.AUTH0_AUDIENCE,
      issuer: 'https://fullstackcircle.auth0.com/',
      algorithms: ['RS256']
    });

var port = 3000;
var app = express();

app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, '../client/UserManagement/dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set("userdb",db);
app.use('/', index); 
app.use("/api",checkJwt,users);

app.get('*', function(req, res) {
    res.render(path.join(__dirname, '../client/UserManagement/dist/index.html')); // load our public/index.html file
});

app.listen(port, function(){
    console.log('Server started on port '+port);
});