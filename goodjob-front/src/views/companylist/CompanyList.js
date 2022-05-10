import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CompanyListPresenter from './CompanyListPresenter';
import { companyApi } from '../../api/api';

const CompanyListContainer = ({ ...props }) => {
    const [companyList, setCompanyList] = useState([]);
    const location = useLocation();
    const { workGroup, company } = location.state;
    const companyFetchData = async () => {
        const formData = {
            job_group: workGroup,
        };
        let res = null;
        try {
            res = await companyApi.list(formData);
        } catch (e) {
        } finally {
            setCompanyList(res.data);
        }
    };
    useEffect(() => {
        companyFetchData();
        console.log(companyList);
    }, [workGroup]);
    return <CompanyListPresenter></CompanyListPresenter>;
};

export default CompanyListContainer;
