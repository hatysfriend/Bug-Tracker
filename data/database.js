const database = (function () {
  const mongoose = require("mongoose");
  let dbInstance = null;

  let _getDbInstance = function(connectionString) {
    if (!dbInstance) {
        //console.log("Creating New Instance");
      mongoose.connect(connectionString, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          //console.log("connected");
        })
        .catch((err) => {
          //console.error("connection failed" + err);
        });
      return dbInstance = mongoose;
    }
    else{
        //console.log("Instance Already Exists");
        return dbInstance;
    }
  };

  return {
    GetDbInstance(connectionString) {
      return _getDbInstance(connectionString);
    },
  };
})();

module.exports = database;
