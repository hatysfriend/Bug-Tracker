module.exports = (() => {
    const bugObject = require("./bugSchemas");
    const database = require("./database");
  
    let BugModel = bugObject.bugModel;

    database.GetDbInstance();

    async function _getAllComments(bugId) {
        let bug = await BugModel.findById(bugId).populate('comments.user');
        return bug.comments;
      }

    async function _deleteCommentByID(bugId, commentId) {
        let bug = await BugModel.findById(bugId);
        bug.comments.id(commentId).remove();
        return await bug.save();
    }

    async function _insertComment(bugId, comment) {
        let bug = await BugModel.findById(bugId);
        bug.comments.push(comment);
        return await bug.save();
      }

    async function _updateComment(bugId, comment) {
        return await BugModel.findByIdAndUpdate(
            {"bugId": bugId, "commentId": comment._id}, 
            {
                "$set": {
                "comments.$": comment
                }
            },
            {upsert: false, new: true},
            function(err,doc) {
        
          });
    }

    return {
        GetAllComments(bugId) {
            return _getAllComments(bugId);
        },
        DeleteCommentByID(bugId, commentId) {
            return _deleteCommentByID(bugId, commentId);
        },
        InsertComment(bugId, comment) {
            return _insertComment(bugId, comment);
        },
        UpdateComment(bugId, comment) {
            return _updateComment(bugId, comment);
        },
    };
})(); 