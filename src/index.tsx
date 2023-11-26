import React from 'react';
import ReactDOM from 'react-dom/client';
import { PageLayout } from './Compoenents/PageLayout';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { publicClientApplicationConfig } from './config';


const publicClientApplication = new PublicClientApplication(publicClientApplicationConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MsalProvider instance={publicClientApplication}>
      <PageLayout />
    </MsalProvider>
  </React.StrictMode>
);
