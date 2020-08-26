//express Module: contains functions for building web apps & API's i.e. set(), get()
const path = require('path');
const express = require("express");
const chroma = require("chroma-log");
const bodyParser = require('body-parser');
const bugRouter = require('./routes/bug-routes');
const commentRouter = require('./routes/comments-routes');

let app = express();

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(chroma);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/dragula', express.static(__dirname + '/node_modules/dragula/dist'));

app.get('/', (req, res) => {
  res.redirect('/bugs');
});
app.use('/bugs', bugRouter);
app.use('/comments', commentRouter);

app.get("/error", (req, res) => {
  res.render("error");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});


