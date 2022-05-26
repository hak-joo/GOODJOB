import React, { useEffect, useState } from 'react';
import * as s from './JobGroupStyled';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { MdArrowBackIos } from 'react-icons/md';
import Select from 'react-select';
import { jobGroupList } from '../../util/jobGroupList';

const JobGroupPresenter = ({ ...props }) => {
    const { jobGroup1Data, jobGroup2Data, onChangeGroupList1, onChangeGroupList2, jobGroup1, jobGroup2 } = props;
    const [postList, setPostList] = useState(null);
    const [negList, setNegList] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!jobGroup1Data) return;
        let positive = [
            {
                title: '급여',
                JobGroup1: jobGroup1Data.postPay ?? 0,
                JobGroup2: jobGroup2Data.postPay ?? 0,
            },
            {
                title: '복지',
                JobGroup1: jobGroup1Data.postWelfare ?? 0,
                JobGroup2: jobGroup2Data.postWelfare ?? 0,
            },
            {
                title: '출퇴근',
                JobGroup1: jobGroup1Data.postComute ?? 0,
                JobGroup2: jobGroup2Data.postComute ?? 0,
            },
            {
                title: '업무강도',
                JobGroup1: jobGroup1Data.postTask ?? 0,
                JobGroup2: jobGroup2Data.postTask ?? 0,
            },
            {
                title: '문화',
                JobGroup1: jobGroup1Data.postCulture ?? 0,
                JobGroup2: jobGroup2Data.postCulture ?? 0,
            },
        ];

        let negative = [
            {
                title: '급여',
                JobGroup1: jobGroup1Data.negPay ?? 0,
                JobGroup2: jobGroup2Data.negPay ?? 0,
            },
            {
                title: '복지',
                JobGroup1: jobGroup1Data.negWelfare ?? 0,
                JobGroup2: jobGroup2Data.negWelfare ?? 0,
            },
            {
                title: '출퇴근',
                JobGroup1: jobGroup1Data.negCommute ?? 0,
                JobGroup2: jobGroup2Data.negCommute ?? 0,
            },
            {
                title: '업무강도',
                JobGroup1: jobGroup1Data.negTask ?? 0,
                JobGroup2: jobGroup2Data.negTask ?? 0,
            },
            {
                title: '문화',
                JobGroup1: jobGroup1Data.negCulture ?? 0,
                JobGroup2: jobGroup2Data.negCulture ?? 0,
            },
        ];
        setPostList(positive);
        setNegList(negative);
    }, [jobGroup1Data, jobGroup2Data]);


    return (
        <s.Container>
            <s.MainBlock>
                <s.BackButtonArea>
                    <MdArrowBackIos size={30} color={'#3cb371'} cursor="pointer" onClick={() => navigate(-1)} />
                </s.BackButtonArea>
                <s.CompanyInfoArea>직군별 분석 비교</s.CompanyInfoArea>
                <s.SelectArea>
                    <s.flex1Area>
                        직군1 선택
                        <Select
                            value={jobGroupList.filter((job) => jobGroup1 === job.value)}
                            options={jobGroupList.map((job, key) => {
                                return {
                                    value: job.value,
                                    label: job.label,
                                };
                            })}
                            menuPosition="absolute"
                            menuPortalTarget={document.body}
                            onChange={onChangeGroupList1}
                        />
                    </s.flex1Area>

                    <s.flex1Area>
                        직군2 선택
                        <Select
                            value={jobGroupList.filter((job) => jobGroup2 === job.value)}
                            options={jobGroupList.map((job, key) => {
                                return {
                                    value: job.value,
                                    label: job.label,
                                };
                            })}
                            menuPosition="absolute"
                            menuPortalTarget={document.body}
                            onChange={onChangeGroupList2}
                        />
                    </s.flex1Area>
                </s.SelectArea>

                <s.CompanyGraphArea>
                    <s.GraphArea>
                        <s.DescriptionText>장점</s.DescriptionText>
                        <RadarChart outerRadius={120} width={350} height={300} data={postList}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="title" />
                            <PolarRadiusAxis angle={30} domain={[0, 80]} />
                            {
                            jobGroup1 ? 
                            jobGroup1Data.workGroup === "" || !jobGroup1Data.workGroup? null : 
                            <Radar
                                name={jobGroup1Data ? jobGroup1Data.workGroup : ''}
                                dataKey="JobGroup1"
                                stroke="#8884d8"
                                fill="#8884d8"
                                fillOpacity={0.9}
                            />:null
                            }
                            {jobGroup2 ? jobGroup2Data.workGroup === "" || !jobGroup2Data.workGroup? null : 
                            <Radar
                                name={jobGroup2Data ? jobGroup2Data.workGroup : ''}
                                dataKey="JobGroup2"
                                stroke="#82ca9d"
                                fill="#82ca9d"
                                fillOpacity={0.5}
                            />: null}
                            <Legend />
                        </RadarChart>
                    </s.GraphArea>
                    <s.GraphArea>
                        <s.DescriptionText>단점</s.DescriptionText>
                        <RadarChart outerRadius={120} width={350} height={300} data={negList}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="title" />
                            <PolarRadiusAxis angle={30} domain={[0, 80]} />
                            {jobGroup1 ?jobGroup1Data &&jobGroup1Data.workGroup === "" || !jobGroup1Data.workGroup? null : 
                            <Radar
                                name={jobGroup1Data ? jobGroup1Data.workGroup : ''}
                                dataKey="JobGroup1"
                                stroke="#8884d8"
                                fill="#8884d8"
                                fillOpacity={0.9}
                            /> : null
                        }
                            {jobGroup2 ? jobGroup2Data.workGroup === "" || !jobGroup2Data.workGroup? null : 
                            <Radar
                                name={jobGroup2Data ? jobGroup2Data.workGroup : ''}
                                dataKey="JobGroup2"
                                stroke="#82ca9d"
                                fill="#82ca9d"
                                fillOpacity={0.5}
                            /> : null
                        }
                            <Legend />
                        </RadarChart>
                    </s.GraphArea>
                </s.CompanyGraphArea>
            </s.MainBlock>
        </s.Container>
    );
};

export default JobGroupPresenter;
