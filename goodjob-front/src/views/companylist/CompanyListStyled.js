import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 3rem;
    box-shadow: 0px 0px 10px #f3f6fb;
    margin-bottom: 300px;
    height: 70%;
    display: inline-block;
    background-color: white;
    width: 85%;
    max-width: 1000px;
    @media screen and (min-width: 1180px) {
        min-width: 80%;
    }
`;

export const MainBlock = styled.div`
    text-align: left;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const MainTitle = styled.div`
    padding: 30px;
    font-size: 35px;
    font-weight: bold;
    color: #3cb371;
    flex: 1;
`;

export const ListArea = styled.div`
    width: 100%;
    flex: 5;
    display: flex;
    flex-direction: column;

    

`;

export const ListHeader = styled.div`
    flex: 0.5;
    width: 100%;
    display: flex;
    text-align: center;

    align-items: center;
    background-color: #3cb371;
    color: white;

`;
export const CompanyTitle =styled.div`
    flex: 1;


`;

export const FitRate = styled.div`
    flex: 1;

`;

export const WorkGroup = styled.div`
    flex: 1;
    width: 100%;
`;

export const ListItemArea = styled.div`
    flex: 7;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 30px;
    align-items: center;
    background-color: white;
    color: white;
`;
export const ListItem = styled(Link)`
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: #e2e2e2;
    color: black;
    height: 40px;

    align-items: center;
    border-bottom: 1px solid white;
    text-decoration: none;
    
`;

export const Pagenation = styled.div`
    display: flex;
    justify-content: center;
`;