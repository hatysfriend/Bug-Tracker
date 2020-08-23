//express Module: contains functions for building web apps & API's i.e. set(), get()
const path = require('path');
const express = require("express");
const chroma = require("chroma-log");
const seedData = require("./data/seedData");
const repository = require("./data/repository")();

let app = express();

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));

app.use(chroma);

app.get("/", (req, res) => {
  repository.GetAllBugs()
    .then((data) => {
      res.render("index", {
        title: "The Bug Tracker",
        subtitle: "Buggy Tracker",
        bugList: data,
      });
    })
    .catch((err) => {
      res.redirect("/error");
    });
});

app.get('/error', (req, res) => {
  res.render("error");
});

app.get("/save", async (req, res) => {
  bug = {
    name: "Testy New Bug",
    author: "Thomas",
    status: "Failed",
    description: "Will It Blend",
    tags: ["String"],
    date: "01/01/2020",
    comments: [],
  };
  await repository.InsertSingleBug(bug);
  res.send("Single Bug Saved!");
});

app.get("/seed", async (req, res) => {
  await seed();
  res.send("Data Seeded!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

let seed = (async function() {
  const bugs = seedData.initialBugs;
  await repository.InsertBugCollection(bugs);
});
