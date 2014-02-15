module.exports = {
	
	post: function (req, res, next) {
		var searchQuery = req.param('searchQuery');
		var profession = req.param('profession');
		if(profession == 'all' && searchQuery.length == 0) {
			Post.find()
			.sort({createdAt: 'desc'})
			.exec(function (err, results) {
				res.view({
					results: results
				});
			});
		} else if (profession == 'all' && searchQuery.length > 0) {
			Post.find()
			.where({
				or: [
					{jobDescription: {contains: searchQuery}},
					{jobTitle: {contains: searchQuery}},
					{companyName: {contains: searchQuery}},
					{homeOffice: {contains: searchQuery}}
				]
			})
			.sort({createdAt: 'desc'})
			.exec(function (err, results) {
				res.view({
					results: results
				});
			});
		} else if (profession !== 'all' && searchQuery.length == 0) {
			Post.find()
			.where({
				profession: profession
			})
			.sort({createdAt: 'desc'})
			.exec(function (err, results) {
				res.view({
					results: results
				});
			});
		} else {
			Post.find()
			.where({
				or: [
					{jobDescription: {contains: searchQuery}},
					{jobTitle: {contains: searchQuery}},
					{companyName: {contains: searchQuery}},
					{homeOffice: {contains: searchQuery}}
				]
			})
			.where({
				profession: profession
			})
			.sort({createdAt: 'desc'})
			.exec(function (err, results) {
				res.view({
					results: results
				});
			});
		} 
	}  
};