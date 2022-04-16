import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Routes, Route, useMatch, useLocation } from 'react-router-dom';
import './index.css';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <App match = {useMatch} location = {useLocation}/>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root')
);
