import styled from 'styled-components';


export const DropDownMenuCorp = styled.div`
    background-color: white;

    min-width: 300px;
    min-height: 700px;

    display: inline-block;
    
    margin-left: ${(props) => (props.NavVisible ? '0' : '-300px')};
    font-size: 18px;
    // margin-left:20px;
    color: #000000;
    -webkit-transition: all 0.4s ease-out 0s;
    -moz-transition: all 0.4s ease-out 0s;
    -ms-transition: all 0.4s ease-out 0s;
    -o-transition: all 0.4s ease-out 0s;
    transition: all 0.4s ease-out 0s;

    @media screen and (max-width: 767px) {
        overflow: hidden;
        min-width: 100%;
        margin-left: ${(props) => (props.NavVisible ? '0' : '-100%')};
    }
`;

export const SideTopPadding = styled.div`
    height: 100px;
    background-color: #3cb371;
    width: 100%;
    display: flex;
    align-items: center;

`;

export const NavIconArea = styled.div`
    justify-content: left;
    flex: 1;
    display: flex;
    padding-left: 2rem;
    cursor: pointer;
`;

export const LogoArea = styled.div`
    flex: 8;
    display: flex;
    align-items: center;
`;
export const LogoAreaText = styled.div`
    font-weight: 900;
    font-size: 30px;
    color: #ffffff;
`;

export const SideCompanyName = styled.text`
    color: white;
    font-weight: bold;
    text-align: center;
    flex: 10;
`;
export const SideMenuButton = styled.div`
    color: white;
    display: none;
    @media screen and (max-width: 767px) {
        display: inline-block;
    }
`;

export const SideBody = styled.div`

    display: flex;
    justify-self: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
`;
export const WhiteSpace = styled.div`
    flex: 0.1;
    height: 100px;
`;
export const ProfileBlock = styled.div`
    flex: 1;
    width: 100%;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    border-bottom: 5px solid white;
`;
export const ProfileUserName = styled.div`
    
    font-size: 25px;
    color: #1e2f68;
    font-weight: bold;
`;

export const JobGroupBlock = styled.div`
    flex: 1;
    width: 100%;
    border-bottom: 5px solid white;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const JobGroupTitle = styled.div`
    font-size: 20px;
    color: #1e2f68;
`;

export const JobGroupSelect = styled.div`
    justify-items: center;
    width: 70%;    
`;

// 드롭다운 메뉴

