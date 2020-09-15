module.exports = (() => {
    const authSchema = require("./authSchemas");
    const database = require("./database");
  
    let UserModel = authSchema.userModel;

    database.GetDbInstance();
    
    async function _getUser(userQuery) {
      return await UserModel.findOne(userQuery);   
    }

    async function _deleteCollection() {
        await UserModel.deleteMany();
    }

    async function _insertUser(user) {
        let userModel = new UserModel(user);
        return await userModel.save();
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
})();  
