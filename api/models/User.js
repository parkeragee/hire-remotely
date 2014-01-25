/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  schema: true,

  attributes: {

    name: {
      type: 'string',
      defaultsTo: 'Name'
    },

    address: {
      type: 'string',
      defaultsTo: 'Address'
    },

    city: {
      type: 'string',
      defaultsTo: 'City'
    },

    state: {
      type: 'string',
      defaultsTo: 'State'
    },

    zip: {
      type: 'integer',
      maxLength: '5',
      defaultsTo: '12345'
    },

    phoneNumber: {
      type: 'string',
      defaultsTo: '555-555-5555'
    },
  	
  	email: {
  		type: 'string',
  		email: true,
  		required: true,
  		unique: true
  	},

    billingInfo: {
      type: 'string',
      defaultsTo: false
    },

  	encryptedPassword: {
  		type: 'string'
  	},

    admin: {
      type: 'boolean',
      defaultsTo: false
    },

    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      delete obj.encryptedPassword;
      delete obj._csrf;
      return obj;
    }
    
  },

  beforeValidation: function (values, next) {
    if (typeof values.admin !== 'undefined') {
      if (values.admin == 'unchecked') {
        values.admin = false;
      } else  if (values.admin[1] == 'on') {
        values.admin = true;
      }
    }
     next();
  },

    beforeCreate: function (values, next) {

        var bcrypt = require('bcryptjs');
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(values.encryptedPassword, salt, function hashCreated (err, encryptedPassword) {
                if (err) return next(err);
                values.encryptedPassword = encryptedPassword;
                next();
            });
        });
    }

};
