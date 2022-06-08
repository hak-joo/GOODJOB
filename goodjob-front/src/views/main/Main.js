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
                window.location.href = '/';
            } finally {
                if (res) {
                    if(res.data === ''){
                        alert('세션이 만료되어 로그아웃 되었습니다!');
                        window.location.href = '/';
                        return;
                    }
                    setUserData(res.data);
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

            commute: userData.prefer.commute,
            pay: userData.prefer.pay,
            welfare: userData.prefer.welfare,
            culture: userData.prefer.culture,
            task: userData.prefer.task,

            nCommute: userData.prefer.commute * -1,
            nPay: userData.prefer.pay * -1,
            nWelfare: userData.prefer.welfare * -1,
            nCulture: userData.prefer.culture * -1,
            nTask: userData.prefer.task * -1,
        };

        let res = null;
        try {
            res = await companyApi.getCustomList(formData);

        } catch (e) {
        } finally {
            setCompanyList(res.data);
        }
    };

    useEffect(() => {
        if (token === '' || token === null || state === '' || state === null) {
            window.location.href = '/';
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
