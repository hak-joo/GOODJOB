import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginPresenter from './LoginPresenter';
import * as c from '../../config/config';
import { userApi } from '../../api/api';
import * as recoilItem from '../../util/recoilItem';

const LoginContainer = ({}) => {
    const navigate = useNavigate();
    const { naver } = window;


    const [token, setToken] = useRecoilState(recoilItem.access_token);
    const [state, setState] = useRecoilState(recoilItem.state_token);
    
    const location = useLocation();
    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: c.NAVER_CLIENT_ID,
            callbackUrl: c.BASE_URL + '/callback',
            isPopup: false,
            loginButton: { color: '#3cb371', type: 3, height: 50 },
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
            if (res.status === 200) {
                setToken(code);
                setState(state);
                console.log("login", token, state);
                navigate("/main");


            } else {
                setToken('');
                setState('');
                console.log('error');
            }
        }
    }

    const TokenCheck = async () => {
        if (token == '' || !token || state == '' || !state) {
            return;
        } else {
            let res = null;
            let form = {
                code: token,
                state: token,
            };
            res = await userApi.login(form);

            if (res) {
                if (res.data == '') {
                    localStorage.clear();
                    return;
                } else {
                    navigate('/main');
                }
            }
        }
    };
    useEffect(() => {
        TokenCheck();
    }, []);

    useEffect(() => {
        initializeNaverLogin();

    }, []);

    useEffect(() => {
        if (!location.hash) return;
        
        //code 추출
        let code = location.hash.split('=')[1].split('&')[0];
      
        let params = new URLSearchParams(window.location.href);
        //state 추출
        let state = params.get("state");
        
        if (code === '' || state === '') return;
        console.log(code, state)
        Join(code, state);

    }, [])
    
    return (
        <LoginPresenter/>
    );
};

export default LoginContainer;
