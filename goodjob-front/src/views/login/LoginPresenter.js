import React,{useEffect} from 'react';
import * as s from './LoginStyled';
import { Link } from 'react-router-dom';
import * as c from '../../config/config';

const LoginPresenter = ({}) => {
    
    

    return (
        <s.Wrapper>
            <s.Container>
                <s.Logo>3M CLOUD</s.Logo>
                <s.DescriptionArea>
                    GoodJob은 네이버 아이디와 연동됩니다
                    <br />
                    <br />
                    아래의 버튼을 눌러 로그인을 진행해주세요
                </s.DescriptionArea>
                <div id='naverIdLogin' />
            </s.Container>
        </s.Wrapper>
    );
};

export default LoginPresenter;
