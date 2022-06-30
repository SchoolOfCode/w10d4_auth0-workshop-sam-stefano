import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
const authDomain = process.env.REACT_APP_DOMAIN;
const authClientId = process.env.REACT_APP_CLIENT_ID;
const authAudience = process.env.REACT_APP_AUDIENCE;

root.render(
  <Auth0Provider
    domain={authDomain}
    clientId={authClientId}
    redirectUri={window.location.origin}
    audience={authAudience}
    scope="read:current_user update:current_user_metadata"
  >
    <App />
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
