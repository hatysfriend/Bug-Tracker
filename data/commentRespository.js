module.exports = (() => {
    const bugObject = require("./bugSchemas");
    const database = require("./database");
    const mongoose = require('mongoose');
  
    let BugModel = bugObject.bugModel;

    database.GetDbInstance();

    async function _getAllComments(bugId) {
        let bug = await BugModel.findById(bugId).populate('comments.user');
        return bug.comments;
      }

    async function _deleteCommentByID(bugId, commentId) {
        let bug = await BugModel.findById(bugId);
        bug.comments.pull(commentId);
        await bug.save();
    }

    async function _insertComment(bugId, comment) {
        let insert = {
            _id: mongoose.Types.ObjectId(),
            comment: comment.comment,
            user: comment.user,
            likes: comment.likes,
            date: comment.date,
        }
        let bug = await BugModel.findById(bugId);
        bug.comments.push(insert);
        await bug.save();
        return insert;
      }

    async function _updateComment(bugId, commentId, comment) {
        let set = {};
        for(var prop in comment) {
            set['comments.$.'+ prop] = comment[prop];
        }
        console.log(set);
        return await BugModel.findOneAndUpdate(
            {"_id": bugId, "comments._id": commentId}, 
            {$set: set},
            {upsert: false, new: true, useFindAndModify: false},
            function(err,doc) {
                console.log("DOC"+JSON.stringify(doc));
          }).populate('comments.user');
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
        UpdateComment(bugId, commentId, update) {
            return _updateComment(bugId, commentId, update);
        },
    };
    
})(); 