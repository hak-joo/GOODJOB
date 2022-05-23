import React, { useEffect, useState } from 'react';
import * as s from './CompanyAnalysisStyled';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { MdArrowBackIos } from 'react-icons/md';
import Select from 'react-select';

const CompanyAnalysisPresenter = ({ ...props }) => {
    const { workGroupData, avgData, onClickBackButton, labelList, selectedWorkGroup, onChangeJobGroup } = props;
    const [postList, setPostList] = useState(null);
    const [negList, setNegList] = useState(null);

    useEffect(() => {
        if (!workGroupData || !avgData) return;
        let positive = [
            {
                title: '급여',
                current: workGroupData.postPay,
                avg: avgData.pay,
            },
            {
                title: '복지',
                current: workGroupData.postWelfare,
                avg: avgData.welfare,
            },
            {
                title: '출퇴근',
                current: workGroupData.postComute,
                avg: avgData.commute,
            },
            {
                title: '업무강도',
                current: workGroupData.postTask,
                avg: avgData.task,
            },
            {
                title: '문화',
                current: workGroupData.postCulture,
                avg: avgData.culture,
            },
        ];

        let negative = [
            {
                title: '급여',
                current: workGroupData.negPay,
                avg: avgData.npay,
            },
            {
                title: '복지',
                current: workGroupData.negWelfare,
                avg: avgData.nwelfare,
            },
            {
                title: '출퇴근',
                current: workGroupData.negCommute,
                avg: avgData.ncommute,
            },
            {
                title: '업무강도',
                current: workGroupData.negTask,
                avg: avgData.ntask,
            },
            {
                title: '문화',
                current: workGroupData.negCulture,
                avg: avgData.nculture,
            },
        ];
        setPostList(positive);
        setNegList(negative);
    }, [workGroupData, avgData]);

    return (
        <s.Container>
            <s.MainBlock>
                {postList && workGroupData ? (
                    <>
                        <s.BackButtonArea>
                            <MdArrowBackIos size={30} color={'#3cb371'} cursor="pointer" onClick={onClickBackButton} />
                        </s.BackButtonArea>

                        <s.CompanyInfoArea>{workGroupData.companyName + ' 통계'}</s.CompanyInfoArea>
                        <Select
                            value={labelList.filter((job) => selectedWorkGroup === job.value)}
                            options={labelList.map((job, key) => {
                                return {
                                    value: job.value,
                                    label: job.label,
                                };
                            })}
                            menuPosition="absolute"
                            menuPortalTarget={document.body}
                            onChange={onChangeJobGroup}
                        />
                        <s.CompanyGraphArea>
                            <s.GraphArea>
                                <s.DescriptionText>장점</s.DescriptionText>
                                <RadarChart outerRadius={120} width={350} height={300} data={postList}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="title" />
                                    <PolarRadiusAxis angle={30} domain={[0, 80]} />
                                    <Radar
                                        name={workGroupData.workGroup}
                                        dataKey="current"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                        fillOpacity={0.9}
                                    />
                                    <Radar name={avgData.name + ' 평균'} dataKey="avg" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.5} />
                                    <Legend />
                                </RadarChart>
                            </s.GraphArea>
                            <s.GraphArea>
                                <s.DescriptionText>단점</s.DescriptionText>
                                <RadarChart outerRadius={120} width={350} height={300} data={negList}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="title" />
                                    <PolarRadiusAxis angle={30} domain={[0, 80]} />
                                    <Radar
                                        name={workGroupData.workGroup}
                                        dataKey="current"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                        fillOpacity={0.9}
                                    />
                                    <Radar name={avgData.name + ' 평균'} dataKey="avg" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.5} />
                                    <Legend />
                                </RadarChart>
                            </s.GraphArea>
                        </s.CompanyGraphArea>
                    </>
                ) : null}
            </s.MainBlock>
        </s.Container>
    );
};

export default CompanyAnalysisPresenter;
