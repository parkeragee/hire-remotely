
module.exports = {
    
	index: function (req, res) {
		res.view();
	},

	new: function (req, res, next) {
		Post.create(req.params.all(), function newPost (err, post) {
			if (err) {
				console.log(err);
	  			req.session.flash = {
	  				err: err
	  			}
	  			return res.redirect('/post');
			}
			res.redirect('/post/all');

		});
	},

	all: function (req, res, next) {
		var id = req.session.User.id;
		Post.find()
		.where({userID: id})
		.sort({createdAt: 'desc'})
		.exec(function foundPosts (err, posts) {
			if (err) return next(err);
			res.view({
				posts: posts
			});
		});
	},

	show: function (req, res, next) {
  	Post.findOne(req.param('id'), function foundpost (err, post) {
  		if (err) return next(err);
  		if (!post) return next();
  		res.view({
  			post: post
  		})
  	});
  },

	edit: function (req, res, next) {
  	Post.findOne(req.param('id'), function foundPost (err, post) {
  		if (err) return next(err);
  		if (!post) return next('Post doesn\'t exist.');
  		res.view({
  			post: post
  		})
  	});
  },

update: function (req, res, next) {
  	Post.update(req.param('id'), req.params.all(), function postUpdated (err, post) {
  		if (err) {
  			return res.redirect('/post/edit/' + req.param('id'));
  		}
  		res.redirect('/post/all');
  	});
  },

	all: function (req, res, next) {
		Post.find(function foundPosts (err, posts) {
			if (err) return next(err);
			res.view({
				posts: posts
			});
		});
	}
  
};
