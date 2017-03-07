const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.get('/', function(req, res) {
    let tweets = tweetBank.list();
    res.render('index', {
        tweets: tweets,
        showForm: true
    });
});

// router.get("/stylesheets/style.css", function(req, res) {
//     res.sendFile("/public/stylesheets/style.css");
// })

router.use(express.static("public"));

router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var list = tweetBank.find({
        name: name
    });
    res.render('index', {
        tweets: list
    });
});


router.get('/tweets/:id', function(req, res) {
    var id = req.params.id;
    var tweet = tweetBank.find({
        id: Number(id)
    });
    res.render('index', {
        tweets: tweet
    });
});

router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    res.redirect('/');
});

module.exports = router;
