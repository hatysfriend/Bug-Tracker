const repository = require("../data/bugRepository");
const seedData = require("../data/seedData");

module.exports = {
  get_all_bugs: async (req, res) => {
    repository.GetAllBugs()
    .then((data) => {
      res.render("index", {
        flash: req.flash("success") || "",
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
      res.send(data);
    })
    .catch((err) => {
      res.redirect("/error");
    })
  },
  
  get_bug_by_id_json: async (req, res) => {
    let bug = await repository.GetBugByID(req.body.bugID);
    res.json(bug);
  },

  create_bug_get: async (req, res) => {
    res.render("addbug");
  },

  add_tag: async (req, res) => {
    repository.AddTag(req.body.id, req.body.tag);
    res.send("OK");
  },

  create_bug_post: async (req, res) => {
    let bug = req.body.bug;
    console.log(bug);
    repository
      .InsertSingleBug(bug)
      .then(() => {
        res.send("OK");
      })
      .catch((err) => {
        res.send("error");
      });
  },

  update_bug: async (req, res) => {
    await repository.UpdateBug(req.body);
    res.send('OK');
  },

  get_bug_view_component: async (req, res) => {
    bugs = await repository.GetAllBugs();
    res.render('/Components/anotherComponent/renderBugComponent',
      (err, result) => {
        if(err) {
          res.redirect('/error');
        } 
        else {
          res.send(require('ejs').render(result, bugs));
        }
      }
    )
  }
};





