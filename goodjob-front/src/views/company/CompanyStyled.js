import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 3rem;
    box-shadow: 0px 0px 10px #f3f6fb;
    margin-bottom: 300px;
    height: 85%;
    display: inline-block;
    background-color: white;
    width: 85%;
    @media screen and (min-width: 1180px) {
        min-width: 80%;
    }
    overflow: scroll;
`;


export const MainBlock = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    /* @media screen and (max-height: 968px) {
        min-height: 900px;
    }
    @media screen and (min-width: 968px) {
        min-height: 650px;
    } */
`;
export const BackButtonArea = styled.div`
    flex: 0.3;
    width: 95%;
    display: flex;
    margin: 10px 10px;
    justify-self: left;
`;

export const CompanyInfoArea = styled.div`
    flex: 1;
    font-size: 32px;
    font-weight: bold;
    color: #3cb371;
    display: flex;
    align-items: center;
    border-top: 1px dotted #3cb371;
    border-bottom: 1px dotted #3cb371;
    padding-left: 20px;
    padding-right: 20px;

    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
        font-weight: bolder;
    }
    margin-bottom: 10px;
`;

export const CompanyLinkText = styled.div`
    color: #9a9898;
    font-size: 13px;    
`;

export const DescriptionText = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
`;
export const CompanyGraphArea = styled.div`
    flex: 8;
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-self: center;
    align-items: center;
    @media screen and (max-width: 968px) {
        flex-direction: column;
        width: 100%;
    }
    @media screen and (min-width: 1600px) {
        width: 50%;
    }
`;

export const GraphArea = styled.div`
    flex: 1;
`;