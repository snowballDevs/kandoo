import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Footer from './components/Footer';
import {AuthProvider} from './contexts/AuthContext/authContext';
import {RoutingProvider} from './contexts/RoutingContext/routingContext';
import {ModalProvider} from './contexts/ModalContext/ModalContext';
import './index.css';
import {SelectedBoardProvider} from './contexts/BoardContext/boardContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RoutingProvider>
            <AuthProvider>
                <SelectedBoardProvider>
                    <ModalProvider>
                        <App />
                        <Footer />
                    </ModalProvider>
                </SelectedBoardProvider>
            </AuthProvider>
        </RoutingProvider>
    </React.StrictMode>
);
