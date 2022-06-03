import React, { useState, useEffect } from 'react';
import MainPresenter from './MainPresenter';
import { userApi, companyApi } from '../../api/api';
import * as recoilItem from '../../util/recoilItem';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

const Main = ({ ...props }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const token = useRecoilValue(recoilItem.access_token);
    const state = useRecoilValue(recoilItem.state_token);
    const updated = useRecoilValue(recoilItem.user_update_count);
    const [preferList, setPreferList] = useState([]);
    const [companyList, setCompanyList] = useState([]);

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

                    if(res.data === ''){
                        alert('세션이 만료되어 로그아웃 되었습니다!');
                        navigate('/');
                    }
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

    const companyFetchData = async () => {
        if (!userData) {
            return;
        }

        const formData = {
            job_group: userData.job_group,
            commute: Math.pow(2, Math.abs(userData.prefer.commute - 4)),
            pay: Math.pow(2, Math.abs(userData.prefer.pay - 4)),
            welfare: Math.pow(2, Math.abs(userData.prefer.welfare - 4)),
            culture: Math.pow(2, Math.abs(userData.prefer.culture - 4)),
            task: Math.pow(2, Math.abs(userData.prefer.task - 4)),

            ncommute: Math.pow(2, Math.abs(userData.prefer.commute)),
            npay: Math.pow(2, Math.abs(userData.prefer.pay)),
            nwelfare: Math.pow(2, Math.abs(userData.prefer.welfare)),
            nculture: Math.pow(2, Math.abs(userData.prefer.culture)),
            ntask: Math.pow(2, Math.abs(userData.prefer.task)),
        };

        let res = null;
        try {
            res = await companyApi.getCustomList(formData);

        } catch (e) {
        } finally {
            console.log('main Company fetchData', res);
            setCompanyList(res.data);
        }
    };

    useEffect(() => {
        if (token === '' || token === null || state === '' || state === null) {
            navigate('/');
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

    return <MainPresenter userData={userData} companyList={companyList}></MainPresenter>;
};

export default Main;
