import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CompanyListPresenter from './CompanyListPresenter';
import { companyApi, userApi } from '../../api/api';
import { useRecoilValue } from 'recoil';
import * as recoilItem from '../../util/recoilItem';

const CompanyListContainer = ({ ...props }) => {
    const navigate = useNavigate();
    
    const [userData, setUserData] = useState(null);
    const token = useRecoilValue(recoilItem.access_token);
    const state = useRecoilValue(recoilItem.state_token);
    const updated = useRecoilValue(recoilItem.user_update_count);
    const [companyList, setCompanyList] = useState([]);
    const [workGroup, setWorkGroup] = useState('');

    const [totalPage, setTotalPage] = useState(1);
    const param = useParams();
    const [page, setPage] = useState(param.page? parseInt(param.page) : 1);
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
                alert('세션이 만료되어 로그아웃 되었습니다!');
                window.location.href = '/';
            } finally {
                if (res) {
                    setUserData(res.data);
                    setWorkGroup(res.data.job_group);
                } else{
                    window.location.href = '/';
                }
            }
        }
    };

    const companyFetchData = async () => {
        if(userData == null) return;
        if(userData.job_group === "" || null){
            alert('직군과 우선순위를 할당해주세요');
            navigate('/');
            return;
        }
        const formData = {
            job_group: userData.job_group,
            page: page,
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
            res = await companyApi.list(formData);
        } catch (e) {
        } finally {

            setCompanyList(res.data.companyDtoList);
            setTotalPage(res.data.lastPage);
        }
    };



    useEffect(() => {
        fetchData();
        
    }, [page, updated]);
    useEffect(() => {
        companyFetchData();
    }, [userData, page, updated]);
    return (<CompanyListPresenter
        workGroup = {workGroup}
        companyList = {companyList}
        page = {page}
        setPage = {setPage}
        totalPage = {totalPage}
    />);
};

export default CompanyListContainer;
