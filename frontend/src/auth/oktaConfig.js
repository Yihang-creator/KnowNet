const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || '{clientId}';
const ISSUER =
	process.env.REACT_APP_ISSUER || 'https://{yourOktaDomain}/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK =
	process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;
const REDIRECT_URI = `${window.location.origin}/login/callback`;

// eslint-disable-next-line
export default {
	oidc: {
		clientId: CLIENT_ID,
		issuer: ISSUER,
		redirectUri: REDIRECT_URI,
		scopes: ['openid', 'profile', 'email'],
		pkce: true,
		disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
	},
};
