import styled from 'styled-components';

export const RouterDivision = styled.div`
    display: flex;
    flex-direction: row;
    text-align: center;
    width: 100%;   
    background-color: #f2f2f2;

    @media screen and (min-width: 1180px) {
        min-width: 100%;
    }
    @media screen and (max-width: 767px) {
        min-width: 100%;
        overflow: hidden;
    }
`;

export const WidthDiv = styled.div`
    width: 100%;
`;
