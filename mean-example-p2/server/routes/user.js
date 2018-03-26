var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

//Get All Users
router.get('/users', function(req, res){
    var db = req.app.get("userdb");
    db.UserInfo.find(function(err, users){
        if(err){
           
            res.send(err);
        }
        
        res.json(users);
    });
});

// Get Single User
router.get('/user/:id', function(req, res, next){
    var db = req.app.get("userdb");
    db.UserInfo.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//Save User
router.post('/user', function(req, res){
    var db = req.app.get("userdb");
    var user = req.body;
        db.UserInfo.save(user, function(err, user){
            if(err){
                res.send(err);
            }
            res.json(user);
        })
});

// Update User
router.put('/user/:id', function(req, res, next){
    var db = req.app.get("userdb");
        var user = req.body;
        db.UserInfo.update({_id: mongojs.ObjectId(req.params.id)},user, {}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
});

// Delete User
router.delete('/user/:id', function(req, res, next){
    var db = req.app.get("userdb");
    db.UserInfo.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
});


module.exports = router;