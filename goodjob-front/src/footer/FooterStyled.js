import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-width: 1180px;
    margin: auto 0;
    text-align: center;
    z-index: 99;
    position: relative;
    background-color: #222222;
    height: 300px;

    @media screen and (max-width: 1180px) {
        min-width: 100%;
    }
`;

export const ContentArea = styled.div`
    width: 1180px;
    display: inline-block;
    margin: 0 auto;
    text-align: start;
    @media screen and (max-width: 1180px) {
        width: 94%;
    }
`;

export const Info = styled.div`
    width: 1180px;
    margin: 0 auto;
    padding: 30px 0px;
    color: #777;
    font-family: Noto Sans Kr, nanum Gothic;
    font-size: 0.9em;
    font-weight: 600;
    @media screen and (max-width: 1180px) {
        width: 94%;
    }
`;

export const InfoText = styled.p`
    line-height: 1.8em;
`;
