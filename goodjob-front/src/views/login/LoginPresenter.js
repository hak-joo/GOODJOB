import React from 'react';
import * as s from './LoginStyled';

const LoginPresenter = ({...props}) => {
    
    

    return (
        <s.Wrapper>
            <s.Container>
                <s.Logo>GOOD JOB</s.Logo>
                <s.DescriptionArea>
                    GoodJob은 네이버 아이디와 연동됩니다
                    <br />
                    <br />
                    아래의 버튼을 눌러 로그인을 진행해주세요
                </s.DescriptionArea>
                    <div id="naverIdLogin" onClick={props.Login} style={{ marginBottom: '20px' }} />
            </s.Container>
        </s.Wrapper>
    );
};

export default LoginPresenter;
