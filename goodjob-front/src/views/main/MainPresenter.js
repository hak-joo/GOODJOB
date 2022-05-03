import React from 'react';
import { Link } from 'react-router-dom';
import * as s from './MainStyled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MainPresenter = ({...props}) => {

    function Arrow(props) {
        const { className, style, onClick } = props;
        return <div className={className} style={{ ...style, display: 'block', background: 'gray', outline: 'none', borderRadius: '10px'}} onClick={onClick} />;
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        nextArrow: <Arrow/>,
        prevArrow: <Arrow/>,
    };
    const {userData, companyList} = props;
    return (
        <s.Container>
            <s.MainBlock>
                <s.MainHeader>적합기업 추천 결과</s.MainHeader>

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
                <s.MainOther></s.MainOther>
            </s.MainBlock>
        </s.Container>
    );
}

export default MainPresenter;