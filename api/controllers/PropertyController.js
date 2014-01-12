/**
 * PropertyController
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
    
	index: function (req, res, next) {
		var user = req.session.User.id;
		if (req.session.User.admin) {
			Property.find(function (err, properties){
				if (err) return next(err);
				res.view({
					properties: properties
				});
			});
		} else {
			Property.find()
			.where({userID: user})
			.exec(function foundProperties (err, properties) {
				if (err) return next(err);
				res.view({
					properties: properties
				});
			});
		}
		res.view();
	},

	new: function (req, res) {
		res.view();
	},

	create: function (req, res, next) {
		Property.create(req.params.all(), function propertyCreated (err, property) {
			if (err) {
				console.log(err);
				req.session.flash = {
					err: err
				}
				return res.redirect('/property/new');
			}
			res.redirect('/property');
		});
	},

	show: function (req, res, next) {
		Property.findOne(req.param('id'), function foundProperty (err, property) {
			if (err) return next('Property doesn\'t exist');
			res.view({
				property: property
			});
		});
	},

	edit: function (req, res, next) {
		Property.findOne(req.param('id'), function foundProperty (err, property) {
			if (err) return next('Property doens\'t exist.');
			res.view({
				property: property
			});	
		});
	},

	update: function (req, res, next) {
		Property.update(req.param('id'), req.params.all(), function propertyUpdated (err, property) {
			if (err) {
				res.redirect('/property/edit/' + req.param('id'));
			}
			res.redirect('/property');
		});
	},

	// DELETE USER
  delete: function (req, res, next) {
  	Property.findOne(req.param('id'), function foundProperty (err, user) {
  		if (err) return next(err);
  		if (!user) return next('Property doesn\'t exist.');
  		Property.destroy(req.param('id'), function propertyDestroyed(err) {
  			if (err) return next(err);
  		});

  		res.redirect('/property');
  	});
  }
  
};
