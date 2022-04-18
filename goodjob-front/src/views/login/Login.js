import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import LoginPresenter from './LoginPresenter';
import * as c from '../../config/config';
import { userApi } from '../../api/api';

const LoginContainer = ({}) => {
    const { naver } = window;
    const [token, setToken] = useState('');
    const location = useLocation();
    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: c.NAVER_CLIENT_ID,
            callbackUrl: c.BASE_URL +"/callback",
            isPopup: false,
            loginButton: { color: 'white', type: 3, height: 50 },
        });
        naverLogin.init();
    };
    const Join = async(code, state) => {
        let res = null;
        const formData = {
            code: code,
            state: state
        };

        try{
            res = await userApi.login(formData);
        } catch(e){}
        finally{
            if(res){
                console.log("가입 완료");
            }
            else{
                console.log('error');
            }
        }
    }

    useEffect(() => {
        initializeNaverLogin();

    }, []);

    useEffect(() => {
        if (!location.hash) return;
        
        //code 추출
        setToken(location.hash.split('=')[1].split('&')[0]);
        
        let params = new URLSearchParams(window.location.href);
        //state 추출
        let state = params.get("state");
        if (token === '' || state === '') return;
        console.log(token, state);
        Join(token, state);

    })
    
    return (
        <LoginPresenter

        />
    );
};

export default LoginContainer;
