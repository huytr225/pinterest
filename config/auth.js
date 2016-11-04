'use strict';

module.exports = {
	'facebookAuth' : {
        'clientID'      : '696641367158104', // your App ID
        'clientSecret'  : '7dd8a076841d35e8b62942f4d226845a', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'
    }
};
