import React from "react";

export const API_BASE_URL = 'http://localhost:1213';

export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;

export const ROLE_LEVEL = {
    User: 1, Expert: 2, Admin: 3
}

export const USER_AUTHORIZED = React.createContext({
    authorized: false,
    user: {},
    changeState: () => {}
});