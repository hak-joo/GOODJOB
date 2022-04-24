import React,{useState, useEffect} from 'react';
import MainPresenter from './MainPresenter';
import { userApi, companyApi } from '../../api/api';
import * as recoilItem from '../../util/recoilItem';
import { useRecoilValue } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';

const Main = ({...props}) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const token = useRecoilValue(recoilItem.access_token);
    const state = useRecoilValue(recoilItem.state_token);
    const [preferList, setPreferList] = useState([]);

    const fetchData = async () => {
        if (!token || !state) {
            localStorage.clear();
            return;
        } else {
            const formData = {
                code: token,
                state: state,
            };
            let res = null;

            try {
                res = await userApi.getUser(formData);
                console.log(res);
            } catch (e) {
                alert('잘못된 접근입니다.');
                navigate('/');
            } finally {
                if (res) {
                    setUserData(res.data);
                    if (res.data.prefer.culture + res.data.prefer.pay == 0) {
                        setPreferList([
                            { title: '문화', rank: 0, name: 'culture' },
                            { title: '급여', rank: 1, name: 'pay' },
                            { title: '업무강도', rank: 2, name: 'task' },
                            { title: '복지', rank: 3, name: 'welfare' },
                            { title: '출퇴근', rank: 4, name: 'commute' },
                        ]);
                    } else {
                        setPreferList([
                            { title: '문화', rank: res.data.prefer.culture, name: 'culture' },
                            { title: '급여', rank: res.data.prefer.pay, name: 'pay' },
                            { title: '업무강도', rank: res.data.prefer.task, name: 'task' },
                            { title: '복지', rank: res.data.prefer.welfare, name: 'welfare' },
                            { title: '출퇴근', rank: res.data.prefer.commute, name: 'commute' },
                        ]);
                        preferList.sort();
                    }
                }
            }
        }
    };

    const companyFetchData = async() => {
        if(!userData){
            return;
        }
        const formData = {
            job_group: userData.job_group
        };
        console.log(formData);
        let res = null;
        try{
            res = await companyApi.list(formData);
        } catch(e){}
        finally{
            console.log('compnay', res);
        }
    }

    useEffect(() => {
        if(token == "" || token ==null || state =="" || state == null){
            navigate("/");
        }
        fetchData();
        

    }, []);

    useEffect(() => {
        companyFetchData();
    }, [userData]);

    console.log(userData);
    

    return(
        <MainPresenter
            userData = {props.data}
        ></MainPresenter>
    )
}

export default Main;