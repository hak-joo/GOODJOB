import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Routes, Route, useMatch, useLocation } from 'react-router-dom';
import './index.css';
import App from './App';

const rootNode = document.getElementById('root');

ReactDOM.createRoot(rootNode).render(
    <React.StrictMode>
        <RecoilRoot>
            <App match = {useMatch} location = {useLocation}/>
        </RecoilRoot>
    </React.StrictMode>
);
