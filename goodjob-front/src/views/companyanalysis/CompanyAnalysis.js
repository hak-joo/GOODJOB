import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CompanyAnalysisPresenter from './CompanyAnalysisPresenter';
import { companyApi } from '../../api/api';

const CompanyAnalysis = ({ ...props }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [labelList, setLabelList] = useState([]);
    
    
    const { workGroup, company, searchKeyword, searchGroup, searchPage, page } = location.state;
    const [selectedWorkGroup, setSelectedWorkGroup] =useState(workGroup);
    const [workGroupData, setWorkGroupData] = useState(null);
    const [companyList, setCompanyList] = useState([]);
    const [avgData, setAvgData] = useState(null);
    const fetchData = async () => {
        console.log(location.state);
        let formData = {
            name: company,
            job_group: selectedWorkGroup
        };
        let avgRes = null;
        let worRes = null;
        try {
            avgRes = await companyApi.getCompanyAnalysis(formData);
            worRes = await companyApi.getCompanyList(formData)
        } catch (e) {
        } finally {
            setCompanyList(worRes.data);
            setAvgData(avgRes.data);
        }
    };

    const findSelected = (element) => {
        if(element.workGroup === selectedWorkGroup){
            return true;
        }
    }

    const onChangeJobGroup = (e) => {
        setSelectedWorkGroup(e.value);
    };

    const onClickBackButton = () => {

        navigate(`/company`, {
            state: {
                workGroup: workGroup,
                company: company,
                searchKeyword: searchKeyword,
                searchGroup: searchGroup,
                searchPage: searchPage,
                page: page
            },
        });
        return;
    
    };
    const fecthData2 = () => {
        if (companyList.length > 0) {
            setWorkGroupData(companyList.find(findSelected));
            let arr = [];
            companyList.map((company) => {
                arr.push({
                    value: company.workGroup,
                    label: company.workGroup,
                });
            });
            setLabelList(arr);
        }
    }

    useEffect(() => {
        fetchData();
    }, [selectedWorkGroup]);

    useEffect(() => {
        fecthData2();
    }, [companyList]);

    return (
        <CompanyAnalysisPresenter
            workGroupData={workGroupData}
            avgData={avgData}
            searchKeyword={searchKeyword}
            searchGroup={searchGroup}
            searchPage={searchPage}
            onClickBackButton={onClickBackButton}
            labelList={labelList}
            selectedWorkGroup={selectedWorkGroup}
            onChangeJobGroup={onChangeJobGroup}
        />
    );
};

export default CompanyAnalysis;
