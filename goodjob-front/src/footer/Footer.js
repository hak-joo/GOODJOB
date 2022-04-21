import React from 'react';
import * as s from './FooterStyled';



const Footer = () => {
    return (
        <>
            <s.Container>
                <s.ContentArea>
                    <s.Info>
                        <s.InfoText>
                            경희대학교 컴퓨터공학과 캡스톤디자인2 개인 프로젝트
                            <br />
                            주제: 기업 리뷰 분석 기반 사용자 맞춤 기업 추천 시스템
                            <br />
                            담당교수: 이영구 | 멘토: 송세헌
                            <br />
                            [개발자] <br />
                            2017104018 컴퓨터공학과 이학주
                            <br />
                            이메일: l--h--j--@naver.com | Github: https://github.com/leehaakjoo
                        </s.InfoText>
                    </s.Info>
                </s.ContentArea>
            </s.Container>
        </>
    );
};

export default Footer;
