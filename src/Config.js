const Config = {
    auth: {
      clientId: '8c9d834c-7a23-4372-b9c4-a8dfd8bbee41', // Replace with your Azure AD application's clientId (appId)
      authority: 'https://login.microsoftonline.com/8b87af7d-8647-4dc7-8df4-5f69a2011bb5', // Replace with your Azure AD tenant ID
      redirectUri: 'http://localhost:3000', // Replace with the redirect URI of your application
    },
    scopes: [
        'user.read'
    ],
    cache: {
      cacheLocation: 'localStorage', // Can be 'localStorage' or 'sessionStorage'
      storeAuthStateInCookie: false, // Set this to true if you want to store the auth state in cookies
    },
  };
  
  export default Config;
  