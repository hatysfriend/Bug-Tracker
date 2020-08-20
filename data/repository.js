const repository = (function () {
  const schema = require("./schemas");
  const database = require("./database");

  let mongoose = database.GetDbInstance();

  //Model
  const BugObject = mongoose.model("bugs", schema.bugSchema());

  async function _insertBugCollection(bugs) {
    await BugObject.insertMany(bugs);
  }

  async function _insertSingleBug(bug) {
    let bugModel = new BugObject(bug);
    await bugModel.save();
  }

  async function _getAllBugs() {
      return await BugObject.find()
  }

  return {
    InsertBugCollection(bugs) {
      return _insertBugCollection(bugs);
    },
    InsertSingleBug(bug) {
        return _insertSingleBug(bug);
    },
    GetAllBugs() {
        return _getAllBugs();
    }
  };
})();

module.exports = repository;
