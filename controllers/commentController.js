const repository = require("../data/commentRespository");

module.exports = {
	update_comment: async (req, res) => {
		await repository.UpdateComment(req.body.bug._id, req.body.comment);
		res.status(200);
	},

	insert_comment: async (req, res) => {
		await repository.InsertComment(req.body.bug._id, req.body.comment)
			.then(res.status(200))
			.catch((err) => {
				console.log(err);
				res.redirect("/error");
			});
	},

	delete_comment: async (req, res) => {
		await repository.DeleteCommentByID(req.body.bug._id, req.body.comment._id)
			.then(res.status(200))
			.catch((err) => {
				console.log(err);
				res.redirect("/error");
			});
	},

	get_comments: async (req, res) => {
		await repository.GetAllComments(req.body.bug._id)
			.then(res.status(200))
			.catch((err) => {
				console.log("Error with Getting Comments: " + err);
				res.redirect("/error");
			});
	}
}

