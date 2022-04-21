import React from 'react';
import * as s from './MainStyled';

const MainPresenter = ({...props}) => {
    const {userData} = props;
    return(
        <s.Container>
            <s.MainBlock>
                Test
            </s.MainBlock>
        </s.Container>

    );
}

export default MainPresenter;