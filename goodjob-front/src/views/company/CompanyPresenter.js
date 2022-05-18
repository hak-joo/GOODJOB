import React, {useEffect, useState} from 'react';
import * as s from './CompanyStyled';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Legend,
} from 'recharts';

const CompanyPresenter = ({...props}) => {
    const {companyData, avgData} = props;
    const [postList, setPostList] = useState(null);
    const [negList, setNegList] = useState(null);
    useEffect(() => {
        if(!companyData || !avgData) return;
        let positive = [
            {
                title: "급여",
                current: companyData.postPay,
                avg: avgData.postPay,
            },
            {
                title: "복지",
                current: companyData.postWelfare,
                avg: avgData.postWelfare,
            },
            {
                title: "출퇴근",
                current: companyData.postComute,
                avg: avgData.postComute,
            },
            {
                title: "업무강도",
                current: companyData.postTask,
                avg: avgData.postTask,
            },
            {
                title: "문화",
                current: companyData.postCulture,
                avg: avgData.postCulture,
            }

        ];

        let negative = [
            {
                title: '급여',
                current: companyData.negPay,
                avg: avgData.negPay,
            },
            {
                title: '복지',
                current: companyData.negWelfare,
                avg: avgData.negWelfare,
            },
            {
                title: '출퇴근',
                current: companyData.negCommute,
                avg: avgData.negCommute,
            },
            {
                title: '업무강도',
                current: companyData.negTask,
                avg: avgData.negTask,
            },
            {
                title: '문화',
                current: companyData.negCulture,
                avg: avgData.negCulture,
            },
        ];
        setPostList(positive);
        setNegList(negative);
    }, [companyData, avgData]);

    return (
        <s.Container>
            <s.MainBlock>
                {postList && companyData ? (
                    <>
                        <s.CompanyInfoArea>
                            {companyData.companyName} - {companyData.workGroup}
                        </s.CompanyInfoArea>
                        <s.CompanyGraphArea>
                            <s.GraphArea>
                                <s.DescriptionText>장점</s.DescriptionText>
                                <RadarChart outerRadius={120} width={350} height={300} data={postList}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="title" />
                                    <PolarRadiusAxis angle={30} domain={[0, 80]} />
                                    <Radar
                                        name={companyData.companyName}
                                        dataKey="current"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                        fillOpacity={0.9}
                                    />
                                    <Radar name="동종업계평균" dataKey="avg" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.5} />
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
                                        name={companyData.companyName}
                                        dataKey="current"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                        fillOpacity={0.9}
                                    />
                                    <Radar name="동종업계평균" dataKey="avg" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.5} />
                                    <Legend />
                                </RadarChart>
                            </s.GraphArea>
                        </s.CompanyGraphArea>
                        {/* <BarChart width={730} height={250} data={dataList}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="postCulture" fill="#8884d8" />
                            <Bar dataKey="postPay" fill="#82ca9d" />
                        </BarChart> */}

                        {/* <ComposedChart width={800} height={400} data={dataList} margin={{ top: 40, right: 40, bottom: 30, left: 40 }}>
                            <XAxis dataKey="postCulture" />
                            <XAxis dataKey="postPay" />
                            <XAxis dataKey="postCommute" />
                            <XAxis dataKey="postTask" />
                            <XAxis dataKey="postWelfare" />

                            <Tooltip />
                            <Legend />
                            <Bar barSize={20} dataKey="postCulture" fill="#153D77" />
                            <Bar barSize={20} dataKey="postPay" fill="#153D77" />
                            <Bar barSize={20} dataKey="postCommute" fill="#153D77" />
                            <Bar barSize={20} dataKey="postTask" fill="#153D77" />
                            <Bar barSize={20} dataKey="postWelfare" fill="#153D77" />
                        </ComposedChart> */}
                    </>
                ) : null}
            </s.MainBlock>
        </s.Container>
    );

}

export default CompanyPresenter;