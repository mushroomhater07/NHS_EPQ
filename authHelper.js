var clientId = 'bcfadd63-7bf2-448f-8791-60f23a4d956f';
var clientSecret = 'af850192-d8b5-493b-892e-38e9a2f4bb39';
var redirectUri = 'http://localhost:3000/authorize';

var scopes = [
  'openid',
  'profile',
  'offline_access',
  'https://outlook.office.com/calendars.readwrite'
];

var credentials = {
  clientID: clientId,
  clientSecret: clientSecret,
  site: 'https://login.microsoftonline.com/common',
  authorizationPath: '/oauth2/v2.0/authorize',
  tokenPath: '/oauth2/v2.0/token'
};
var oauth2 = require('simple-oauth2')(credentials);

module.exports =  function getAuthUrl() {
    var returnVal = oauth2.authCode.authorizeURL({
        redirect_uri: redirectUri,
        scope: scopes.join(' ')
    });
    console.log('');
    console.log('Generated auth url: ' + returnVal);
    return returnVal;
}
module.exports =  function getTokenFromCode(auth_code, callback, request, response) {
    oauth2.authCode.getToken({
        code: auth_code,
        redirect_uri: redirectUri,
        scope: scopes.join(' ')
    }, function (error, result) {
        if (error) {
            console.log('Access token error: ', error.message);
            callback(request, response, error, null);
        }
        else {
            var token = oauth2.accessToken.create(result);
            console.log('');
            console.log('Token created: ', token.token);
            callback(request, response, null, token);
        }
    });
}
module.exports =  function getEmailFromIdToken(id_token) {
    // JWT is in three parts, separated by a '.'
    var token_parts = id_token.split('.');

    // Token content is in the second part, in urlsafe base64
    var encoded_token = new Buffer(token_parts[1].replace('-', '+').replace('_', '/'), 'base64');

    var decoded_token = encoded_token.toString();

    var jwt = JSON.parse(decoded_token);

    // Email is in the preferred_username field
    return jwt.preferred_username;
}
module.exports = function getTokenFromRefreshToken(refresh_token, callback, request, response) {
    var token = oauth2.accessToken.create({ refresh_token: refresh_token, expires_in: 0 });
    token.refresh(function (error, result) {
        if (error) {
            console.log('Refresh token error: ', error.message);
            callback(request, response, error, null);
        }
        else {
            console.log('New token: ', result.token);
            callback(request, response, null, result);
        }
    });
}