import React from 'react';
import * as s from './MainStyled';

const MainPresenter = ({...props}) => {
    const {userData} = props;
    console.log(userData);
    return(
        <div>
            hello           
        </div>
    );
}

export default MainPresenter;