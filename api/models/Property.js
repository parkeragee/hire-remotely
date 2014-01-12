/**
 * Property
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	streetAddress: {
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
  		required: true
  	},

    userID: {
      type: 'integer',
      required: true
    }
    
  }

};
