module.exports = {
	
	post: function (req, res, next) {
		var searchQuery = req.param('searchQuery');
		// Post.find({
			// jobDescription: {
			// 	contains: searchQuery
			// }
		// });
		Post.find()
		.where({jobDescription: {contains: searchQuery}})
		.sort({createdAt: 'desc'})
		.exec(function (err, results) {
			res.view({
				results: results
			});
		});
	}  
};
