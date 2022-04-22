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
    useEffect(() => {
        if(token == "" || token ==null || state =="" || state == null){
            navigate("/");
        }
    }, []);
    return(
        <MainPresenter
            userData = {props.data}
        ></MainPresenter>
    )
}

export default Main;