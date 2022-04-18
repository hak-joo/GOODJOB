import React,{useState, useEffect} from 'react';
import MainPresenter from './MainPresenter';
import { userApi } from '../../api/api';
import * as recoilItem from '../../util/recoilItem';
import { useRecoilValue } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';


const Main = ({...props}) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const token = useRecoilValue(recoilItem.access_token);
    const state = useRecoilValue(recoilItem.state_token);

    const TokenCheck = async() => {
        if(token == "" || !token || state =="" || !state){
            localStorage.clear();
            alert("잘못된 접근입니다.");
            navigate("/");
        }
        else{
            let res = null;
            let form = {
                code: token,
                state: state,
            };
            res = await userApi.login(form);
            console.log(res);
            if(res){
                if(res.data == ""){
                    localStorage.clear();
                    alert('세션이 만료되어 로그아웃 되었습니다!');
                    navigate('/');
                }else setUserData(res.data);
            }
            console.log(res);
        }
    }
    useEffect(() => {
        TokenCheck();
    },[])
    return(
        <MainPresenter
            userData = {props}
        ></MainPresenter>
    )
}

export default Main;