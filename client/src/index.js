import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from './react-auth0-spa'
import config from './auth_config.json'
import createBrowserHistory from './utils/history'

// Router function --> route user to right place after login
const onRedirectCallback = appState => {
  createBrowserHistory.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  )
}

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}>
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
