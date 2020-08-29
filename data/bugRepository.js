module.exports = (() => {
  const BugObject = require("./bugSchemas");
  const database = require("./database");

  database.GetDbInstance();
  
  async function _insertBugCollection(bugs) {
    await BugObject.insertMany(bugs);
  }

  async function _insertSingleBug(bug) {
    let bugModel = new BugObject(bug);
    return await bugModel.save()
  }

  async function _getAllBugs() {
    return await BugObject.find()
  }

  async function _deleteCollection() {
    return await BugObject.deleteMany();
  }

  async function _getBugByID(id) {
    return await BugObject.findById(id);
  }

  async function _updateBug(bug) {
    return await _insertSingleBug(bug);
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
    },
    DeleteCollection() {
      return _deleteCollection();
    },
    GetBugByID(id) {
      return _getBugByID(id)
    },
    UpdateBug(bug) {
      return _updateBug(bug);
    }
  };
})();




