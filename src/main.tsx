import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {BrowserRouter as Router} from "react-router-dom";
import {CookiesProvider} from "react-cookie";
import {AuthProvider} from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <CookiesProvider>
                <Router>
                    <AuthProvider>
                        <App/>
                    </AuthProvider>
                </Router>
        </CookiesProvider>
    </React.StrictMode>
);
