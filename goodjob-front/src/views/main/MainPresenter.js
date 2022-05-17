import React from 'react';
import { Link } from 'react-router-dom';
import * as s from './MainStyled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MainPresenter = ({ ...props }) => {
    function Arrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: 'block', background: 'gray', outline: 'none', borderRadius: '10px' }}
                onClick={onClick}
            />
        );
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
    };
    const { userData, companyList } = props;
    return (
        <s.Container>
            <s.MainBlock>
                <s.MainHeader>
                    <s.MainItem to={`/`}>기업별 통계조회</s.MainItem>
                    <s.MainItem
                        to={`/list`}
                        state={{
                            workGroup: userData ? userData.job_group : null,
                        }}
                    >
                        {userData ? <div>{userData.job_group} </div> : null}
                        <div>회사 리스트</div>
                    </s.MainItem>
                    <s.MainItem to={`/`} isLast={true}>
                        검색
                    </s.MainItem>
                </s.MainHeader>
                <s.MainTitle>적합기업 추천 결과</s.MainTitle>

                <s.MainCarousel>
                    <Slider {...settings}>
                        {companyList.length > 0
                            ? companyList.map((company) => (
                                  <s.CardContainer>
                                      <s.Card>
                                          <Link
                                              key={company.name}
                                              to={`/company`}
                                              state={{
                                                  workGroup: userData.job_group,
                                                  company: company.name,
                                                  
                                              }}
                                              style={{ textDecoration: 'none', textDecorationLine: 'none' }}
                                          >
                                              <s.CardContent>
                                                  <s.CompanyName>{company.name}</s.CompanyName>
                                              </s.CardContent>
                                          </Link>
                                      </s.Card>
                                  </s.CardContainer>
                              ))
                            : null}
                    </Slider>
                </s.MainCarousel>
            </s.MainBlock>
        </s.Container>
    );
};

export default MainPresenter;
