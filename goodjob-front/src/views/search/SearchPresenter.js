import React from 'react';
import * as s from './SearchStyled';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { BsArrowRightCircle } from 'react-icons/bs';
import {AiOutlineSearch} from 'react-icons/ai';
import Select from 'react-select';
import { jobGroupList } from '../../util/jobGroupList';

const SearchPresenter = ({ ...props }) => {
    const { companyList, page, totalPage, jobGroup, onChangeJobGroup, onClickSearchButton, keyword, onChangeKeyword, onKeyPressKeyword, userData } =
        props;

    return (
        <s.Container>
            <s.MainBlock>
                <s.MainHeader>
                    <s.MainItem to={`/main`}>
                        <div>사용자 추천</div>
                    </s.MainItem>
                    <s.MainItem to={`/jobgroup`}>직군별 통계비교</s.MainItem>
                    <s.MainItem
                        to={`/list/1`}
                        state={{
                            workGroup: userData ? userData.job_group : null,
                        }}
                    >
                        {userData ? <div>{userData.job_group} </div> : null}
                        <div>회사 리스트</div>
                    </s.MainItem>
                </s.MainHeader>
                <s.CompanyListHeader>
                    <s.SelectArea>
                        <Select
                            value={jobGroupList.filter((job) => jobGroup === job.value)}
                            options={jobGroupList.map((job, key) => {
                                return {
                                    value: job.value,
                                    label: job.label,
                                };
                            })}
                            menuPosition="absolute"
                            menuPortalTarget={document.body}
                            onChange={onChangeJobGroup}
                        />
                    </s.SelectArea>
                    <s.CompanySearch
                        placeholder="회사명을 입력해주세요"
                        value={keyword}
                        onChange={onChangeKeyword}
                        onKeyPress={onKeyPressKeyword}
                    />
                    <AiOutlineSearch size={30} style={{ color: '#3cb371', cursor: 'pointer' }} onClick={onClickSearchButton} />
                </s.CompanyListHeader>

                <s.ListArea>
                    <s.ListHeader>
                        <s.CompanyTitle>회사</s.CompanyTitle>
                        <s.WorkGroup>직군</s.WorkGroup>
                        <s.FitRate>적합율</s.FitRate>
                    </s.ListHeader>
                    <s.ListItemArea>
                        {companyList !== null ? (
                            companyList.length === 0 ? (
                                <s.NoData>조건을 만족하는 데이터가 없습니다</s.NoData>
                            ) : (
                                companyList.map((item) => (
                                    <s.ListItem
                                        key={item.name + item.job_group}
                                        to={`/company`}
                                        state={{
                                            workGroup: item.job_group,
                                            company: item.name,
                                            searchGroup: jobGroup,
                                            searchKeyword: keyword,
                                            searchPage: page,
                                        }}
                                    >
                                        <s.CompanyTitle>{item.name}</s.CompanyTitle>
                                        <s.WorkGroup>{item.job_group}</s.WorkGroup>
                                        <s.FitRate>{Math.floor(item.simillarity * 50)}</s.FitRate>
                                    </s.ListItem>
                                ))
                            )
                        ) : null}
                    </s.ListItemArea>
                </s.ListArea>
                <s.Pagenation>
                    {page === 1 ? null : (
                        <BsArrowLeftCircle
                            color={'#16a085'}
                            size={30}
                            // onClick={() => props.setPage(page - 1)}
                            onClick={() => {
                                props.setPage(props.page - 1);
                            }}
                            style={{ cursor: 'pointer', marginLeft: 20, marginRight: 20, marginBottom: 20 }}
                        />
                    )}

                    {totalPage === page ? null : (
                        <BsArrowRightCircle
                            color={'#16a085'}
                            size={30}
                            // onClick={() => props.setPage(page + 1)}
                            onClick={() => {
                                props.setPage(props.page + 1);
                            }}
                            style={{ cursor: 'pointer', marginLeft: 20, marginRight: 20, marginBottom: 20 }}
                        />
                    )}
                </s.Pagenation>
            </s.MainBlock>
        </s.Container>
    );
};

export default SearchPresenter;
