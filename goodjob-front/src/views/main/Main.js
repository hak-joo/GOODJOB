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
    const updated = useRecoilValue(recoilItem.user_update_count);
    const [preferList, setPreferList] = useState([]);
    const [companyList, setCompanyList] =useState([]);

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
            } catch (e) {
                alert('잘못된 접근입니다.');
                navigate('/');
            } finally {
                if (res) {
                    setUserData(res.data);
                    if (res.data.prefer.culture + res.data.prefer.pay === 0) {
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

    // const companyFetchData = async() => {
    //     if(!userData){
    //         return;
    //     }
    //     const formData = {
    //         job_group: userData.job_group
    //     };
    //     let res = null;
    //     try{
    //         res = await companyApi.list(formData);
    //     } catch(e){}
    //     finally{
    //         setCompanyList(res.data);

    //     }
    // }
    const companyFetchData = async () => {
        if (!userData) {
            return;
        }
        console.log(userData);
        const formData = {
            job_group: userData.job_group,
            commute: Math.abs(userData.prefer.commute-6),
            pay: Math.abs(userData.prefer.pay-6),
            welfare: Math.abs(userData.prefer.welfare-6),
            culture: Math.abs(userData.prefer.culture-6),
            task: Math.abs(userData.prefer.task-6),
        };
        console.log(formData);
        let res = null;
        try {
            res = await companyApi.getCustomList(formData);
            console.log(res);
        } catch (e) {
        } finally {
            setCompanyList(res.data);

        }
    };

    useEffect(() => {
        if(token === "" || token === null || state === "" || state === null){
            navigate("/");
        }
        fetchData();
        

    }, []);

    useEffect(() => {
        companyFetchData();
    }, [userData]);
    useEffect(() => {
        fetchData();
        companyFetchData();
    }, [updated]);

    

    return(
        <MainPresenter
            userData = {userData}
            companyList = {companyList}
        ></MainPresenter>
    )
}

export default Main;