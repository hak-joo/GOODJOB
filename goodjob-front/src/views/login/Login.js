import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import LoginPresenter from './LoginPresenter';
import * as c from '../../config/config';

const LoginContainer = ({}) => {
    const { naver } = window;

    const location = useLocation();
    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: c.NAVER_CLIENT_ID,
            callbackUrl: c.BASE_URL,
            isPopup: false,
            loginButton: { color: 'white', type: 3, height: 50 },
        });
        naverLogin.init();
    };
    const getNaverToken = () => {
        console.log('location', location)
        if (!location.hash) return;
        const token = location.hash.split('=')[1].split('&')[0];
        
    };

    useEffect(() => {
        initializeNaverLogin();
        getNaverToken();
    }, []);
    
    return (
        <LoginPresenter

        />
    );
};

export default LoginContainer;
