module.exports = function (connectionString) {
    const UserObject = require("./authSchemas");
    const database = require("./database");
  
    let mongoose;
    let currentString = connectionString || "mongodb://localhost:30000/bugDB";
    console.log(`Testing using: ${currentString}`);
    mongoose = database.GetDbInstance(currentString);
    
    async function _getUser(userQuery) {
      await UserObject.findOne(userQuery);
    }

    async function _deleteCollection() {
        await UserObject.deleteMany();
    }

    async function _insertUser(user) {
        let userModel = new UserObject(user);
        return await userModel.save()
      }
    
    return {
      GetUser(userQuery) {
          return _getUser(userQuery);
      },
      DeleteCollection() {
        return _deleteCollection();
      },
      InsertUser(user) {
          return _insertUser(user);
      }
    };
  };  
