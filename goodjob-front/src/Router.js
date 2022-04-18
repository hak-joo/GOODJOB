import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Login from './views/login/Login';
import NaverLogin from './views/naver/NaverLogin';
import { RouterDivision } from './RouterDivision';

export default ({match, location}) => {
    const [NavVisible, setNavVisible] = useState(true);
    const onClickMenu = () => {
        setNavVisible(!NavVisible);
    };
    return (
        <BrowserRouter>
            <RouterDivision>
                <Routes>
                    <Route path="/" element={<Login/>}></Route>
                    <Route path = "/callback" element = {<Login/>}></Route>
                </Routes>
            </RouterDivision>
        </BrowserRouter>
    );
};
