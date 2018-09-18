import { WebAuth } from 'auth0-js';

export default class Auth {
  auth0 = new WebAuth({
    domain: 'foodtomake.auth0.com',
    clientID: 'Xl3JO8Pwt2fgVmtCr0K6fTo1axSPjCBs',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'id_token',
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

  handleGoogleAuthentication = ({ history }) => {
    this.auth0.parseHash((err, authResult) => {
      console.log(err);
      console.log(authResult); // authResult.idTokenPayload.sub is the unique identifier for the user
      history.replace('/', { jwt: "" });
    });
  };

  handleFacebookAuthentication = ({ history }) => {
    this.auth0.parseHash((err, authResult) => {
      console.log(err);
      console.log(authResult); // need https for facebook
      history.replace('/');
    });
  };
}
