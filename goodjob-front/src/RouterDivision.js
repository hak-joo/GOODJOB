import styled from 'styled-components';

export const RouterDivision = styled.div`
    display: flex;
    flex-direction: row;
    text-align: center;
    width: 100%;
    @media screen and (min-width: 1180px) {
        min-width: 100%;
    }
    @media screen and (max-width: 767px) {
        min-width: 100%;
        overflow: hidden;
    }
`;

export const widthDiv = styled.div`
    width: 100%;
`;
