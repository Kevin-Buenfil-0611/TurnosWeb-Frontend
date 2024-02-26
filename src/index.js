import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import App from './App';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <NextUIProvider>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path='/*' element={<App />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </NextUIProvider>
    </React.StrictMode>
);
reportWebVitals();
