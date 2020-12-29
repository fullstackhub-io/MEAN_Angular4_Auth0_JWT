var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render(path.join(__dirname, '../client/UserManagement/dist/')+'/index.html');
});

module.exports = router;