import React, { useState } from 'react';
import * as s from './HeaderStyled';
import { AiOutlineMenu } from 'react-icons/ai';
import { HiUserCircle } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';

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
            
                
                {props.NavVisible ? null : 
                <s.NavIconArea
                    onMouseOver={() => onMouseOverNav()}
                    onMouseOut={() => onMouseOutNav()}
                    onClick={() => props.onClickMenu()}
                >
                
                
                    <AiOutlineMenu size={50} cursor={'pointer'} color={navColor} />
                </s.NavIconArea>
                }

                
                <s.LogoArea>
                    <s.LogoAreaText>
                        GOOD JOB
                    </s.LogoAreaText>    
                </s.LogoArea>


        </s.Container>
    );
};
export default Header;
