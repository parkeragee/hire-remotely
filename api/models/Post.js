/**
 * Post
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	jobTitle: {
  		type: 'string',
  		required: true,

  	},

  	profession: {
  		type: 'string',
  		required: true
  	},

  	specialty: {
  		type: 'string',
  		required: true	
  	},

  	city: {
  		type: 'string',
  		required: true
  	},

  	state: {
  		type: 'string',
  		required: true
  	},

  	zip: {
  		type: 'integer',
  		maxLength: '5',
  		required: true
  	},

  	jobDescription: {
  		type: 'text',
  		required: true
  	}
    
  }

};
