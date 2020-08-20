//express Module: contains functions for building web apps & API's i.e. set(), get()
const express = require("express");
const chroma = require("chroma-log");
const seedData = require("./data/seedData");
const repository = require("./data/repository");

let app = express();

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(chroma);

app.get("/index", async (req, res) => {
  let bugs = await repository.GetAllBugs();
  console.warn(bugs[0].comments.length);
  res.render("index", {
    title: "The Bug Tracker",
    subtitle: "Buggy Tracker",
    bugList: bugs,
  });
});

app.get("/save", (req, res) => {
  bug = {
    name: "Testy New Bug",
    author: "Thomas",
    status: "Failed",
    description: "Will It Blend",
    tags: ["String"],
    date: "01/01/2020",
    comments: null,
  };
  repository.InsertSingleBug(bug);
  res.send("Single Bug Saved!");
});

app.get("/seed", (req, res) => {
  const bugs = seedData.initialBugs;
  repository.InsertBugCollection(bugs);
  res.send("Data Seeded!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
