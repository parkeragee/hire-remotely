/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  new: function (req, res) {
  	res.view();
  },

// CREATE NEW USERS
  create: function (req, res, next) {
  	// Create user with the params sent from sign up form --> new.ejs
  	User.create(req.params.all(), function userCreated (err, user) {
  		if (err) {
  			console.log(err);
  			req.session.flash = {
  				err: err
  			}
  			return res.redirect('/user/new');
  		}

      req.session.authenticated = true;
      req.session.User = user;

      Email.send({
        to: [{
          name: 'Parker',
          email: 'parkeragee@yahoo.com'
        }, {
          name: 'Mr. Agee',
          email: 'parkeragee4744@gmail.com'
        }],
        subject: 'Test Email',
        html: 
          'I can\'t wait to see you all in Chicago<br/>' +
          'I loe you so much!!!! ',
        text: 'text fallback goes here-- in case some recipients (let\'s say the Chipettes)  can\'t receive HTML emails'
      }, function optionalCallback (err) {
        if (err) {
          console.log('No email');
        }
      });
      res.redirect('/user/show/'+user.id);
  	});
  },

// SHOW USERS PROFILE
  show: function (req, res, next) {
  	User.findOne(req.param('id'), function foundUser (err, user) {
  		if (err) return next(err);
  		if (!user) return next();
  		res.view({
  			user: user
  		})
  	});
  },

// SHOW USERS PROFILE
  edit: function (req, res, next) {
  	User.findOne(req.param('id'), function foundUser (err, user) {
  		if (err) return next(err);
  		if (!user) return next('User doesn\'t exist.');
  		res.view({
  			user: user
  		})
  	});
  },

 // SHOW USERS PROFILE
  update: function (req, res, next) {
  	User.update(req.param('id'), req.params.all(), function userUpdated (err, user) {
  		if (err) {
  			return res.redirect('/user/edit/' + req.param('id'));
  		}
  		res.redirect('/user/show/' + req.param('id'));
  	});
  },

// DELETE USER
  delete: function (req, res, next) {
  	User.findOne(req.param('id'), function foundUser (err, user) {
  		if (err) return next(err);
  		if (!user) return next('User doesn\'t exist.');
  		User.destroy(req.param('id'), function userDestroyed(err) {
  			if (err) return next(err);
  		});

  		res.redirect('/user');
  	});
  },

// USER LIST
	index: function (req, res, next) {
		// Get an array of all users in the User collection
		User.find(function foundUsers (err, users) {
			if (err) return next(err);
			// pass the array down to the /views/index.ejs page
			res.view({
				users: users
			});
		});
	},

  careers: function (req, res, next) {
    res.redirect('/jobs');
  }

  
};
