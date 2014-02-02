module.exports = {
	
	post: function (req, res, next) {
		var searchQuery = req.param('searchQuery');
		var profession = req.param('profession');
		var specialty = req.param('specialty');
		if(profession == undefined && specialty == undefined) {
			Post.find()
			.where({
				or: [
					{jobDescription: {contains: searchQuery}},
					{jobTitle: {contains: searchQuery}},
					{companyName: {contains: searchQuery}},
					{city: {contains: searchQuery}},
					{state: {contains: searchQuery}}
				]
			})
			.sort({createdAt: 'desc'})
			.exec(function (err, results) {
				res.view({
					results: results
				});
			});
		} else if (profession !== undefined && specialty == undefined) {
			Post.find()
			.where({
				or: [
					{jobDescription: {contains: searchQuery}},
					{jobTitle: {contains: searchQuery}},
					{companyName: {contains: searchQuery}},
					{city: {contains: searchQuery}},
					{state: {contains: searchQuery}}
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
		} else if (profession == undefined && specialty !== undefined) {
			Post.find()
			.where({
				or: [
					{jobDescription: {contains: searchQuery}},
					{jobTitle: {contains: searchQuery}},
					{companyName: {contains: searchQuery}},
					{city: {contains: searchQuery}},
					{state: {contains: searchQuery}}
				]
			})
			.where({
				specialty: specialty
			})
			.sort({createdAt: 'desc'})
			.exec(function (err, results) {
				res.view({
					results: results
				});
			});
		} 

		// else if (searchQuery == "") {
		// 	console.log('No search query');
		// }

		else {
			Post.find()
			.where({
				or: [
					{jobDescription: {contains: searchQuery}},
					{jobTitle: {contains: searchQuery}},
					{companyName: {contains: searchQuery}},
					{city: {contains: searchQuery}},
					{state: {contains: searchQuery}}
				]
			})
			.where({
				profession: profession
			})
			.where({
				specialty: specialty
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