
module.exports = {
    
	index: function (req, res) {
		res.view();
	},

	new: function (req, res, next) {
			  Post.create(req.params.all(), function newPost (err, post) {
				if (err) {
					var noPass = ['The post could not be completed.'];
		  			req.session.flash = {
		  				err: noPost
		  			}
		  			// return res.redirect('/post');
				}
				var stripe = require('stripe')("xooEcmNqzrOaWfeTwjKmmlPnZH2jNfVR");
				var stripeToken = req.param('stripeToken');

				var charge = stripe.charges.create({
					amount: 9900,
					currency: "usd",
					card: stripeToken,
					description: "MedicalCareer Job Posting"
				}, function(err, charge) {
				if (err && err.type === 'StripeCardError') {
					res.redirect('/post');
				}
  			  res.redirect('/');
			});
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
	},

	postPayment: function (req, res, next) {
		var stripe = require("stripe")(
				"xooEcmNqzrOaWfeTwjKmmlPnZH2jNfVR"
			);

		stripe.charges.create({
			amount: 9900,
			currency: "usd",
			card: "tok_103Hyh2eZvKYlo2CNSFaC8zP", // obtained with Stripe.js
			description: "Charge for MedicalCareer job posting"
		});
	}
  
};
