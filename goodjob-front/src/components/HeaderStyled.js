import styled from 'styled-components';

export const Container = styled.div`
    margin: 0 auto;
    width: 100%;
    position: relative;
    height: 100px;
    background-color: #3cb371;
    display: flex;
    z-index: 99;
    @media screen and (max-width: 1180px) {
        min-width: 100%;
    }
`;

export const NavIconArea = styled.div`
    align-self: center;
    padding-left: 2rem;
    cursor: pointer;
`;

export const LogoArea = styled.div`
    width: 100%;
    align-self: center;
    text-align: center;
    justify-self: center;
`;
export const LogoAreaText = styled.div`
    font-weight: 900;
    font-size: 30px;
    color: #ffffff;

`;
