import React, { useState, useEffect } from 'react';
import { RouterDivision } from './RouterDivision';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { userApi } from './api/api';
import Login from './views/login/Login';
import NaverLogin from './views/naver/NaverLogin';
import Main from './views/main/Main';
import * as recoilItem from './util/recoilItem';


export default ({match, location}) => {
    const [NavVisible, setNavVisible] = useState(true);
    const onClickMenu = () => {
        setNavVisible(!NavVisible);
    };

    return (
        <BrowserRouter>
            <RouterDivision>
                <Routes>
                    <Route path="/main" element={<Main />}></Route> 
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/callback" element={<Login />}></Route>
                </Routes>
            </RouterDivision>
        </BrowserRouter>
    );
};
