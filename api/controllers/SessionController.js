
module.exports = {
    
  'new': function (req, res) {

  	res.view();
  	// req.session.authenticated = true;
  	// console.log(req.session);
  	// res.view();
  },

	create: function (req, res, next) {
		if (!req.param('email') || !req.param('encryptedPassword')) {
			var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired', message: 'You must enter both a username and password'}];

			req.session.flash = {
				err: usernamePasswordRequiredError
			}

			res.redirect('/session/new');
			return;
		}

		User.findOneByEmail(req.param('email')).done(function (err, user) {
			if (err) return next(err);

			// if no user is found
			if (!user) {
				var noAccountError = [{name: 'noAccount', message: 'The email address ' + req.param('email') + ' was not found.'}];
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
					var wrongPass = [{name: 'wrongPass', message: 'The password entered is incorrect.'}];
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
			    res.redirect('/user/show/' + user.id);
			}); 
		});
	},

	destroy: function (req, res, next) {
		req.session.destroy();
		res.redirect('/session/new');
	}

  
};
