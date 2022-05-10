import React, { useEffect, useState } from 'react';
import * as s from './HeaderStyled';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }
`;

const Header = ({ ...props }) => {
    const [navColor, setNavColor] = useState('#ffffff');
    const onMouseOverNav = () => {
        setNavColor('#d5d3d3');
    };
    const onMouseOutNav = () => {
        setNavColor('#ffffff');
    };

    return (
        <s.Container>
            {props.NavVisible ? null : (
                <s.NavIconArea onMouseOver={() => onMouseOverNav()} onMouseOut={() => onMouseOutNav()} onClick={() => props.onClickMenu()}>
                    <AiOutlineMenu size={50} cursor={'pointer'} color={navColor} />
                </s.NavIconArea>
            )}

            <s.LogoArea>
                <StyledLink to={`/main`}>
                    <s.LogoAreaText>GOOD JOB</s.LogoAreaText>
                </StyledLink>
            </s.LogoArea>
        </s.Container>
    );
};
export default Header;
