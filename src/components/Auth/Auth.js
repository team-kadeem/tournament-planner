import auth0 from 'auth0-js'
import history from './history'

export default class Auth {
    accessToken;
    idToken;
    expiresAt;


    auth0 = new auth0.WebAuth({
        domain: process.env.REACT_APP_AUTH_DOMAIN,
        clientID: process.env.REACT_APP_AUTH_CLIENT_ID,
        redirectUri: process.env.REACT_APP_REDIRECT_URI,
        responseType: 'token id_token',
        scope: 'openid'
    })


    constructor() {
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.handleAuthentication = this.handleAuthentication.bind(this)
        this.isAuthenticated = this.isAuthenticated.bind(this)
        this.getIdToken = this.getIdToken.bind(this)
        this.renewSession = this.renewSession.bind(this)

    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                console.log('HANDLING AUTH')
                console.log(authResult)
                this.setSession(authResult);
            } else if(err) {
                history.replace('/')
                console.log(err)
            }
        })
    }

    getAccessToken() {
        return this.accessToken;
    }

    getIdToken() {
        return this.idToken;
    }

    setSession(authResult) {
        localStorage.setItem('isLoggedIn', 'true')
        let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime()
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;
        this.expiresAt = expiresAt;

        history.replace('/admin')
    }

    renewSession() {
        this.auth0.checkSession({}, (err, authResult) => {
           if (authResult && authResult.accessToken && authResult.idToken) {
             this.setSession(authResult);
           } else if (err) {
             this.logout();
             console.log(err);
             alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
           }
        });
      }
    
      logout() {
        // Remove tokens and expiry time
        this.accessToken = null;
        this.idToken = null;
        this.expiresAt = 0;
    
        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem('isLoggedIn');
    
        this.auth0.logout({
          return_to: window.location.origin
        });
    
        // navigate to the home route
        history.replace('/home');
      }
    
      isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = this.expiresAt;
        return new Date().getTime() < expiresAt;
      }

    

    login() {
        this.auth0.authorize();
    }
}