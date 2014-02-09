

module.exports = {

	index: function (req, res, next) {
		var moment = require('moment');
		var now = moment().subtract('days', 4);
		var d = now.format();
		console.log(d);
		Post.find()
		// *** TURN BACK ON ***
		.where({active: true})
		.sort({createdAt: 'desc'})
		.exec(function foundPosts (err, posts) {
			if (err) return next(err);
			res.view({
				posts: posts
			});
		});
	},
    
	careers: function (req, res) {
		res.redirect('/jobs');
	}
  
};
