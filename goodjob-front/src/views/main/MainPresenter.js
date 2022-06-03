import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as s from './MainStyled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MainPresenter = ({ ...props }) => {
    
    const [width, setWidth] = useState(window.innerWidth);
    const handleResize = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
        slidesToShow: width > 1200 ? 3 : width > 550 ? 2 : 1,
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
                    <s.MainItem
                        to={`/search`}
                        state={{
                            searchPage: 1,
                            searchGroup: '',
                            searchKeyword: '',
                        }}
                        islast="true"
                    >
                        검색
                    </s.MainItem>
                </s.MainHeader>
                <s.MainTitle>적합기업 추천 결과</s.MainTitle>

                <s.MainCarousel>
                    <Slider {...settings}>
                        {companyList.length > 0
                            ? companyList.map((company) => (
                                  <s.CardContainer key={company.name}>
                                      <s.Card>
                                          <Link
                                              to={`/company`}
                                              state={{
                                                  workGroup: userData.job_group,
                                                  company: company.name,
                                              }}
                                              style={{ textDecoration: 'none', textDecorationLine: 'none' }}
                                          >
                                              <s.CardContent>
                                                  <s.CompanyName>{company.name}</s.CompanyName>
                                                  <s.Similarity>
                                                      <s.SimilarityDes>적합도</s.SimilarityDes>
                                                      <s.SimilarityNum>{Math.floor(company.simillarity * 50)}%</s.SimilarityNum>
                                                  </s.Similarity>
                                              </s.CardContent>
                                          </Link>
                                      </s.Card>
                                  </s.CardContainer>
                              ))
                            : null}
                    </Slider>
                </s.MainCarousel>
                {companyList.length < 0 ? <s.NoDataDescription>직군을 선택해주세요</s.NoDataDescription> : null}
            </s.MainBlock>
        </s.Container>
    );
};

export default MainPresenter;
