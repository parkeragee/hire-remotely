
module.exports = {
    
  'new': function (req, res) {
  	res.view();
  },

	create: function (req, res, next) {
		if (!req.param('email') || !req.param('encryptedPassword')) {
			var userAndPass = ["Please enter your <strong>username</strong> and <strong>password</strong>"];
			req.session.flash = {
				err: userAndPass
			}

			res.redirect('/session/new');
			return;
		}

		User.findOneByEmail(req.param('email')).done(function (err, user) {
			if (err) return next(err);

			// if no user is found
			if (!user) {
				var noAccountError = ['The email address <strong>' + req.param('email') + '</strong> was not found.'];
				req.session.flash = {
					err: noAccountError
				}
				res.redirect('/session/new');
				return;
			}
			
			var bcrypt = require('bcryptjs');
			bcrypt.compare(req.param('encryptedPassword'), user.encryptedPassword, function (err, valid) {
			    if (err) return next(err);

			    if (!valid) {
					var wrongPass = ['The password you entered is incorrect.'];
					req.session.flash = {
						err: wrongPass
					}
					res.redirect('/session/new');
					return;
				}
			    req.session.authenticated = true;
			    req.session.User = user;

			    if (req.session.User.admin) {
			    	res.redirect('/user');
			    	return;
			    }
			    res.redirect('/post');
			}); 
		});
	},

	destroy: function (req, res, next) {
		req.session.destroy();
		res.redirect('/session/new');
	}

  
};
