import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {AuthProvider} from './contexts/AuthContext/authContext';
import {RoutingProvider} from './contexts/RoutingContext/routingContext';
import { ModalProvider } from './contexts/ModalContext/ModalContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RoutingProvider>
            <AuthProvider>
              <ModalProvider>
                <App />
              </ModalProvider>
            </AuthProvider>
        </RoutingProvider>
    </React.StrictMode>
);
