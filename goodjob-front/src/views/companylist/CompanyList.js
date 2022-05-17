import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CompanyListPresenter from './CompanyListPresenter';
import { companyApi, userApi } from '../../api/api';
import { useRecoilValue } from 'recoil';
import * as recoilItem from '../../util/recoilItem';
const CompanyListContainer = ({ ...props }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { workGroup, company } = location.state;
    
    const [userData, setUserData] = useState(null);
    const token = useRecoilValue(recoilItem.access_token);
    const state = useRecoilValue(recoilItem.state_token);
    const [companyList, setCompanyList] = useState([]);
    
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    
    
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
                } else{
                    navigate('/');
                }
            }
        }
    };

    const companyFetchData = async () => {
        if(userData == null) return;
        const formData = {
            job_group: workGroup,
            page: page,
            welfare: userData.prefer.welfare,
            pay: userData.prefer.pay,
            task: userData.prefer.commute,
            culture: userData.prefer.culture,
            commute: userData.prefer.commute,
        };
        console.log(formData);
        let res = null;

        try {
            res = await companyApi.list(formData);
        } catch (e) {
        } finally {
            console.log(res);
            setCompanyList(res.data.companyDtoList);
            setTotalPage(res.data.totalPage);
        }
    };

    useEffect(() => {
        fetchData();
        
    }, []);
    useEffect(() => {
        companyFetchData();

    }, [userData, page]);
    return (<CompanyListPresenter
        workGroup = {workGroup}
        companyList = {companyList}
        page = {page}
        setPage = {setPage}
        totalPage = {totalPage}
    />);
};

export default CompanyListContainer;
