import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CompanyPresenter from './CompanyPresenter';
import { companyApi } from '../../api/api';

const Company = ({...props}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { workGroup, company, searchKeyword, searchGroup, searchPage} = location.state;

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

    const onClickBackButton = () => {
        if(searchPage){
            navigate(`/search`, {
                state: {
                    searchGroup: searchGroup,
                    searchKeyword: searchKeyword,
                    searchPage: searchPage,
                },
            });
            return;
        } else{
            navigate(-1);
        }
        
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <CompanyPresenter
            companyData={companyData}
            avgData={avgData}
            searchKeyword={searchKeyword}
            searchGroup={searchGroup}
            searchPage={searchPage}
            onClickBackButton={onClickBackButton}
        />
    );
}

export default Company;
