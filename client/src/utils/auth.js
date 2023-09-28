// use this to decode a token and get the users information out of it
import decode from 'jwt-decode';

// create a new class for a user
class AuthService {
    // get user data
    getProfile() {
        return decode(this.getToken());
    }

    // check if user's logged in
    LoggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    // check if token is expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false; 
        } catch (err) {
            return false;
        }
    }

    getToken() {
        // Retrives the user token from localStorage
        return localStorage.getItem('id_token');
      
    }

    login(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        // Clear user token and profile data form localStorage
        localStorage.removeItem('id_token');
        // this will reload the page and set the stae of the application 
        window.location.assign('/');
    }
}

// Create an instance of AuthService
const authServiceInstance = new AuthService();
// Export the instance
export default authServiceInstance;

