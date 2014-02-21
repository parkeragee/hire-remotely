
module.exports = {
    
	index: function (req, res) {
		res.view();
	},

	'new': function (req, res, next) {
		Post.create(req.params.all(), function newPost (err, post) {
			if (err) {
				var noPost = ['The post could not be completed.'];
						req.session.flash = {
							err: noPost
						}
						return res.redirect('/post');
			}
			// var stripe = require('stripe')("YPPIw74xFLEmtdpnUecEgSInS5oXHVBX");
			// var stripeToken = req.param('stripeToken');

			// var charge = stripe.charges.create({
			// 	amount: 9900,
			// 	currency: "usd",
			// 	card: stripeToken,
			// 	description: "Hire Remotely Job Posting"
			// }, function(err, charge) {
			// if (err && err.type === 'StripeCardError') {
			// 	res.redirect('/post');
			// }
			//   res.redirect('/');
			// });
		res.redirect('/');
		});
	},

	all: function (req, res, next) {
		var user = req.session.User.id;
		Post.find()
		.where({userID: user})
		.sort({createdAt: 'desc'})
		.exec(function postsFound (err, posts) {
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
	},

	addView: function (req, res, next) {
		var jobID = req.param('jobID');
		Post.findOneById(jobID).done(function(err, post){
			var submissions = post.submissions;
			var newCount = (post.views + 1);
			var conversion = (submissions/newCount * 100);
			post.views = newCount;
			post.conversion = conversion;
			post.save(function(err) {
				if (err) return next(err);
				console.log('The new views count is: ' + newCount);
			});
		});
	},

	addSubmission: function (req, res, next) {
		var jobID = req.param('jobID');
		Post.findOneById(jobID).done(function(err, post){
			var views = post.views;
			var newCount = (post.submissions + 1);
			var conversion = (newCount/views * 100);
			post.submissions = newCount;
			post.conversion = conversion;
			post.save(function(err) {
				if (err) return next(err);
			});
		});
	},

	setToInactive: function (req, res, next) {
		var jobIDs = req.param('jobIDs');
		Post.update({
		  id: jobIDs
		},{
		  active: false
		}, function(err, posts) {
		  if (err) return console.log(err);
		});
	},

	delete: function (req, res, next) {
		Post.findOne(req.param('id'), function (err, post){
			if (err) return next(err);
			Post.destroy(req.param('id'), function (err, destroyed) {
				if (err) return next(err);
				res.redirect('/post/all');
			});
		});
	},

	apply: function (req, res, next) {
		var applicantEmail = req.param('applicantEmail');
		Post.findOne(req.param('id'), function (err, post) {
			if (err) return next(err);
			var nodemailer = require("nodemailer");

		      // create reusable transport method (opens pool of SMTP connections)
		      var smtpTransport = nodemailer.createTransport("SMTP",{
		          service: "Mandrill",
		          auth: {
		              user: "parker@parkeragee.com",
		              pass: "RQQb6d2MdCu6EiP4cyAHDQ"
		          }
		      });

		      // setup e-mail data with unicode symbols
		      var mailOptions = {
		          from: "Hire Remotely <info@hireremotely.co>", // sender address
		          to: post.howToApply, // list of receivers
		          subject: "New Applicant", // Subject line
		          text: " " + applicantEmail + " has applied for your" + post.jobTitle + " position.", // plaintext body
		          html: "<h4>" + applicantEmail + " has applied for your " + post.jobTitle + " postition." // html body
		      }

		      // send mail with defined transport object
		      smtpTransport.sendMail(mailOptions, function(error, response){
		          if(error){
		              console.log(error);
		          }else{
		              // next();
		              res.redirect('back');
		          }

		          // if you don't want to use this transport object anymore, uncomment following line
		          //smtpTransport.close(); // shut down the connection pool, no more messages
		      });
		});
	}
  
};
