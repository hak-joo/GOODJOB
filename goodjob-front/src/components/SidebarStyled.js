import styled from 'styled-components';


export const DropDownMenuCorp = styled.div`
    background-color: white;
    height: 100%;
    min-width: 310px;
    min-height: 600px;

    display: inline-block;

    margin-left: ${(props) => (props.NavVisible ? '0' : '-310px')};
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
    height: 90%;
    display: flex;
    flex-direction: column;
`;

export const SideBodyTop = styled.div`
    flex: 0.5;
    width: 100%;
    text-align: right;  
    padding: 20px;
`;

export const ProfileBlock = styled.div`
    flex: 2;
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
    flex: 2;
    width: 100%;
    border-bottom: 5px solid white;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const JobGroupTitle = styled.div`
    font-size: 20px;
    color: #1e2f68;
    padding: 10px;
`;

export const JobGroupSelect = styled.div`
    justify-items: center;
    width: 70%;    
`;

// 드롭다운 메뉴


export const PreferBlock = styled.div`
    flex: 4;

    width: 100%;
    display: flex;
    flex-direction: column;

`;

export const PreferTitle = styled.div`
    padding: 10px;
    border-top: 1px solid #e2e2e2;
    border-bottom: 1px solid #e2e2e2;
    width: 100%;
    font-size: 20px;
    color: #1e2f68;
`;

export const PreferItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 20;

`;
export const PreferItem = styled.div`
    padding-top: 20px;
    display: flex;
    padding-bottom:20px;
    border-bottom: 1px solid #e2e2e2;
`;
export const PreferIndex = styled.div`
    flex:0.5;
    text-align: right;
`;
export const PreferName = styled.div`
    flex: 0.7;
    text-align: center;
`;
export const PreferValue = styled.div`
    flex: 0.5;
    text-align: center;
`;
export const PreferDownButton = styled.div`
    flex: 0.5;
    cursor: pointer;
`;

export const SaveBlock = styled.div`
    flex: 1;

    width: 100%;
    justify-content: right;
    align-items: flex-end;
    display: flex;
    padding: 20px;
`;

export const SaveButton = styled.button`
    width: 30%;
    height: 50%;
    font-size: 90%;
    margin: 5px;
    border-radius: 5px;
    border: none;
    background-color: #3cb371;
    color: white;
    cursor: pointer;
    &:hover{
        font-weight: bolder;
        opacity: 0.9;
    }

`;

export const ResetButton = styled.button`
    width: 30%;
    height: 50%;
    font-size: 90%;
    margin: 5px;
    border-radius: 5px;
    border: none;
    background-color: #e2e2e2;
    color: white;
    cursor: pointer;
    &:hover {
        font-weight: bolder;
        opacity: 0.9;
    }
`;