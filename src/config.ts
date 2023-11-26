export const publicClientApplicationConfig = {
  auth: {
    clientId: "e7fa9e77-d250-4690-9b7d-8faf6fdfd884",
    authority: "https://OneMoreLadder.b2clogin.com/OneMoreLadder.onmicrosoft.com/B2C_1_Flow",
    knownAuthorities: ["OneMoreLadder.b2clogin.com"],
    redirectUri: "http://localhost:3000"
  }
};

export const appConfig = {
  apiBaseUrl: 'https://onemoreladder20231123201550.azurewebsites.net',
  accessTokenScope: "https://OneMoreLadder.onmicrosoft.com/tasks-api/tasks.read"
}
