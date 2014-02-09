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
      type: 'string',
      required: true
  	},

    active: {
      type: 'boolean',
      defaultsTo: true
    },

    views: {
      type: 'integer',
      defaultsTo: '0'
    },

    submissions: {
      type: 'integer',
      defaultsTo: '0'
    },

    conversion: {
      type: 'integer',
      defaultsTo: '0'
    }
    
  }

};
