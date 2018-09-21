import { WebAuth } from 'auth0-js';

export default class Auth {
  auth0 = new WebAuth({
    domain: 'foodtomake.auth0.com',
    clientID: 'Xl3JO8Pwt2fgVmtCr0K6fTo1axSPjCBs', //This is auth0 clientId not google clientId
    redirectUri: 'http://localhost:3000/auth/google/callback',
    responseType: 'token id_token',
    scope: 'openid'
  });

  loginGoogle = () => {
    this.auth0.authorize({
      connection: 'google-oauth2'
    });
  };

  loginFacebook = () => {
    this.auth0.authorize({
      connection: 'facebook'
    });
  };

  handleGoogleAuthentication = async () => {
    return new Promise((resolve, reject) => {
      return this.auth0.parseHash((error, authResult) => {
        if(error) {
          reject(error);
        }
        console.log(error, authResult);
        resolve(authResult.idTokenPayload.sub); // authResult.idTokenPayload.sub is the unique identifier for the user
      });
    });
  };

  handleFacebookAuthentication = async () => {
    this.auth0.parseHash((error, authResult) => {
      return authResult.idTokenPayload.sub; // authResult.idTokenPayload.sub is the unique identifier for the user
    });
  };
}
