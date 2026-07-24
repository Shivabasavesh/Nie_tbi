import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HelmetProvider } from "react-helmet-async";

import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { convex } from "./lib/convex";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConvexAuthProvider client={convex}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ConvexAuthProvider>
  </React.StrictMode>,
)
