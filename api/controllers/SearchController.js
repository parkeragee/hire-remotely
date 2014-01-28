/**
 * SearchController
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
			})
		});
	}  
};
