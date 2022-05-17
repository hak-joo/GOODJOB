import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import CompanyPresenter from './CompanyPresenter';
import { companyApi } from '../../api/api';

const Company = ({...props}) => {
    const location = useLocation();
    const { workGroup, company} = location.state;

    const [companyData, setCompanyData] = useState(null);
    const [avgData, setAvgData] = useState(null);
    const fetchData = async() => {
        let formData ={
            job_group: workGroup,
            name: company
        };
        let avgRes = null;
        let comRes = null;
        try{
            avgRes = await companyApi.getAvg(formData);
            comRes = await companyApi.getInfo(formData);
        } catch (e){}
        finally{
            setCompanyData(comRes.data);
            setAvgData(avgRes.data);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return(
        <CompanyPresenter
            companyData={companyData}
            avgData={avgData}
        />
    )
}

export default Company;
