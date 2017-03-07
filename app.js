const express = require("express");
const nunjucks = require("nunjucks");
const routes = require("./routes");
const bodyParser = require('body-parser');
const socketio = require('socket.io');

const app = express();

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {
    noCache: true
});

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

var server = app.listen(3000, function() {
    console.log("server listening");
})

var io = socketio.listen(server);

app.use("/", routes(io));

app.use("/", function(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 2))
})

app.use("/special/*", function(req, res, next) {
    console.log("You reached the special area.")
    next();
})

app.use("/:route", function(req, res, next) {
    console.log(req.method + " /" + req.params.route + " " + res.statusCode);
    next();
})

// app.get("/", function(req, res) {
//     res.send("Hello there!");
// })
//
// app.get("/news", function(req, res) {
//     res.send("I have good news and bad news...");
// })
//
// app.get("/test", function(req, res) {
//     const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
//     res.render( 'index', {title: 'Hall of Fame', people: people} );
// })

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


// nunjucks.configure('views/index.html', {
//     autoescape: true,
//     express: app,
//     watch: true
// });
