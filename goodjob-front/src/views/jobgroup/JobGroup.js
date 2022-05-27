import React, { useState, useEffect } from 'react';
import JobGroupPresenter from './JobGroupPresenter';
import { companyApi } from '../../api/api';

const JobGroup = ({ ...props }) => {

    const [jobGroup1, setJobGroup1] = useState("");
    const [jobGroup2, setJobGroup2] = useState("");

    const [jobGroup1Data, setJobGroup1Data] = useState(null);
    const [jobGroup2Data, setJobGroup2Data] = useState(null);
    const fetchData1 = async () => {
        let formData = {
            job_group: jobGroup1,
        };
        let res = null;
        try {
            res = await companyApi.getAvg(formData);
        } catch (e) {
        } finally {
            setJobGroup1Data(res.data);
        }
    };

    const fetchData2 = async() => {
         let formData = {
             job_group: jobGroup2,
         };
         let res = null;
         try {
             res = await companyApi.getAvg(formData);
         } catch (e) {
         } finally {
             setJobGroup2Data(res.data);
         }
    }

    const onChangeGroupList1 = (e) => {
        setJobGroup1(e.value);
    }
    const onChangeGroupList2 = (e) =>{
        setJobGroup2(e.value);
    }

    useEffect(() => {
        fetchData1();
    }, [jobGroup1]);

    useEffect(() => {
        fetchData2();
    }, [jobGroup2]);

    return (
        <JobGroupPresenter
            jobGroup1={jobGroup1}
            jobGroup2={jobGroup2}
            jobGroup1Data={jobGroup1Data}
            jobGroup2Data={jobGroup2Data}
            onChangeGroupList1={onChangeGroupList1}
            onChangeGroupList2={onChangeGroupList2}
        />
    );
};

export default JobGroup;
