import { WebAuth } from "auth0-js";

export default class Auth {
  auth0 = new WebAuth({
    domain: "foodtomake.auth0.com",
    clientID: "Xl3JO8Pwt2fgVmtCr0K6fTo1axSPjCBs",
    redirectUri: "http://localhost:3000/callback",
    responseType: "token id_token",
    scope: "openid"
  });

  login = () => {
    this.auth0.authorize({
      connection: "google-oauth2"
    });
  };

  handleAuthentication = ({ history }) => {
    this.auth0.parseHash((err, authResult) => {
        console.log(err);
        console.log(authResult);
        history.replace('/');
    });
  };
}
