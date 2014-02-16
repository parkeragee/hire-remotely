module.exports = {

	index: function (req, res, next) {
		// var moment = require('moment');
		// var now = moment();
		// var d = now.format();
		// var doy = now.dayOfYear();
  //       var daysLeft = now.dayOfYear() - 30;
		// console.log(daysLeft);
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
