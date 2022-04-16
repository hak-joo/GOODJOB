import React from 'react';
import { RecoilRoot } from 'recoil';
import Router from './Router';

const App = ({match, location}) => {
    return (
        <React.StrictMode>
            <RecoilRoot>
                <Router match = {match} location = {location}/>
            </RecoilRoot>
        </React.StrictMode>
    );
};

export default App;
