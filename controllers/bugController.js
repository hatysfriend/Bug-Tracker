const repository = require("../data/bugRepository");
const seedData = require("../data/seedData");

module.exports = {
  get_all_bugs: async (req, res) => {
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
    })
  },
  
  get_all_bugs_json: async (req, res) => {
    repository.GetAllBugs()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.redirect("/error");
    })
  }, 

  create_bug_get: async (req, res) =>{
    res.render("addbug");
  },

  create_bug_post: async (req, res) =>{
    console.log(req.body);
    bug = {
      name: req.body.name,
      author: req.body.author,
      status: req.body.status,
      description: req.body.description,
      tags: req.body.tags,
      date: req.body.date,
      comments: [],
    };
    repository
      .InsertSingleBug(bug)
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        res.render("error");
      });
  },

  update_bug_status: async (req, res) =>{
    let bug = await repository.GetBugByID(req.body.bugID);
    bug.status = req.body.status;
    repository.UpdateBug(bug);
  }
};





