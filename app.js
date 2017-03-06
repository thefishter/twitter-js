const express = require("express");
const nunjucks = require("nunjucks");
const app = express();

app.use("/special/*", function(req, res, next) {
    console.log("You reached the special area.")
    next();
})

app.use("/:route", function(req, res, next) {
    console.log(req.method + " /" + req.params.route + " " + res.statusCode);
    next();
})

app.get("/", function(req, res) {
    res.send("Hello there!");
})

app.get("/news", function(req, res) {
    res.send("I have good news and bad news...");
})

nunjucks.configure('views/index.html', {
    autoescape: true,
    express: app,
    watch: true
});


var locals = {
    title: 'An Example',
    people: [{
            name: 'Gandalf'
        },
        {
            name: 'Frodo'
        },
        {
            name: 'Hermione'
        }
    ]
};
nunjucks.configure('views', {
    noCache: true
});
nunjucks.render('index.html', locals, function(err, output) {
    console.log(output);
});


// var res = nunjucks.render('views/index.html', {
//     title: "our app"
// }, {
//     people: {
//         name1: "Keziyah",
//         name2: "Nicole",
//         name3: "AnotherName"
//     }
// });


app.listen(3000, function() {
    console.log("server listening");
})
