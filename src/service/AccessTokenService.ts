export class AccessTokenService {

    public static getAccessToken() {
        return localStorage.getItem('access_token');
    }

    public static removeAccessToken() {
        localStorage.removeItem('access_token');
    }
}