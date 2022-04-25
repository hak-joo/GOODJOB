import React from 'react';
import { Link } from 'react-router-dom';
import * as s from './MainStyled';

const MainPresenter = ({...props}) => {
    const {userData, companyList} = props;
    return(
        <s.Container>
            <s.MainBlock>
                {
                    companyList.length > 0 ? 
                        companyList.map((company) => (
                            <Link key={company.companyName}
                                to={`/company`}
                                state={{
                                    workGroup: userData.job_group,
                                    company: company.companyName,
                                }}
                            >
                                {company.companyName}
                            </Link>
                        ))

                    : null
                }
            </s.MainBlock>
        </s.Container>

    );
}

export default MainPresenter;