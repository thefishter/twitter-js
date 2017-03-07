const express = require("express");
const nunjucks = require("nunjucks");
const app = express();

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {
    noCache: true
});

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

app.get("/test", function(req, res) {
    const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
    res.render( 'index', {title: 'Hall of Fame', people: people} );
})

// var locals = {
//     title: 'An Example',
//     people: [{
//             name: 'Gandalf'
//         },
//         {
//             name: 'Frodo'
//         },
//         {
//             name: 'Hermione'
//         }
//     ]
// };

// nunjucks.render('index.html', locals, function(err, output) {
//     console.log(output);
// });


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



// nunjucks.configure('views/index.html', {
//     autoescape: true,
//     express: app,
//     watch: true
// });