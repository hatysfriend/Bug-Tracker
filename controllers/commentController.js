const repository = require("../data/commentRespository");

module.exports = {
	update_comment: async (req, res) => {
		await repository.UpdateComment(req.body.bugId, req.body.comment);
		res.status(200);
	},

	insert_comment: async (req, res) => {
		console.log(req.body.bugId + req.body.comment);
		req.body.comment.user = req.user._id;

		await repository.InsertComment(req.body.bugId, req.body.comment)
			.then(res.status(200))
			.catch((err) => {
				console.log(err);
				res.redirect("/error");
			});
	},

	delete_comment: async (req, res) => {
		await repository.DeleteCommentByID(req.body.bugId, req.body.comment._id)
			.then(res.status(200))
			.catch((err) => {
				console.log(err);
				res.redirect("/error");
			});
	},

	get_comments: async (req, res) => {
		await repository.GetAllComments(req.body.bugId)
			.then(res.status(200))
			.catch((err) => {
				console.log("Error with Getting Comments: " + err);
				res.redirect("/error");
			});
	}
}

