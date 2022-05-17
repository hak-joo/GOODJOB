import React from 'react';
import * as s from './CompanyListStyled';
import {BsArrowLeftCircle} from 'react-icons/bs';
import { BsArrowRightCircle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';

const CompanyListPresenter = ({...props}) => {
    const {companyList,page, totalPage, workGroup} = props;
    const navigate = useNavigate();

    return (
        <s.Container>
            <s.MainBlock>
                <s.MainTitle>회사리스트</s.MainTitle>
                <s.ListArea>
                    <s.ListHeader>
                        <s.CompanyTitle>회사</s.CompanyTitle>
                        <s.WorkGroup>직군</s.WorkGroup>
                        <s.FitRate>적합율</s.FitRate>
                    </s.ListHeader>
                    <s.ListItemArea>
                        {companyList !== null
                            ? companyList.map((item) => (
                                  <s.ListItem
                                      key={item.name}
                                      to={`/company`}
                                      state={{
                                          workGroup: workGroup,
                                          company: item.name,
                                      }}
                                  >
                                      <s.CompanyTitle>{item.name}</s.CompanyTitle>
                                      <s.WorkGroup>{item.job_group}</s.WorkGroup>
                                      <s.FitRate>{Math.floor(item.simillarity * 100)}</s.FitRate>
                                  </s.ListItem>
                              ))
                            : null}
                    </s.ListItemArea>
                </s.ListArea>
                <s.Pagenation>
                    {page === 1 ? null : <BsArrowLeftCircle color={'#16a085'} size={30} onClick={() => props.setPage(page - 1)} />}
                    {totalPage === page ? null : <BsArrowRightCircle color={'#16a085'} size={30} onClick={() => props.setPage(page + 1)} />}
                </s.Pagenation>
            </s.MainBlock>
        </s.Container>
    );
};

export default CompanyListPresenter;
