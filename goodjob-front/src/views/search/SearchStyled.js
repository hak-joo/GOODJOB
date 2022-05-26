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

export const MainHeader = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
`;

export const MainItem = styled(Link)`
    text-decoration: none;
    font-weight: normal;
    color: green;
    font-weight: bold;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #c8ead1;
    border-right: ${(props) => (props.islast ? 'none' : '1px solid white')};
    flex-direction: column;
    cursor: pointer;
    &:hover {
        font-size: 18px;
        background-color: #3cb371;
        opacity: 0.7;
        font-weight: bolder;
        color: white;
    }
    -webkit-transition: all 0.2s ease-out 0s;
    -moz-transition: all 0.2s ease-out 0s;
    -ms-transition: all 0.2s ease-out 0s;
    -o-transition: all 0.2s ease-out 0s;
    transition: all 0.2s ease-out 0s;
`;

export const CompanyListHeader = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const SelectArea = styled.div`
    width: 30%;
`;

export const CompanySearch = styled.input`
    margin-left: 10px;
    margin-right: 10px;
    width: 30%;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #3cb371;
    outline: none;
    color: #3cb371;
    font-weight: bold;
    text-align: center;
    ::placeholder{
        color: #cecbcb;
    }
    
`;

export const NoData = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #7f7c7c;
    font-weight: bold;
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
    font-weight: bolder;
    align-items: center;
    background-color: #3cb371;
    color: white;
`;
export const CompanyTitle = styled.div`
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
    background-color: #f6f6f6;
    color: black;
    height: 40px;
    &:hover {
        background-color: #e2e2e2;
    }
    align-items: center;
    border-bottom: 1px solid white;
    text-decoration: none;
    -webkit-transition: all 0.6s ease-out 0s;
    -moz-transition: all 0.6s ease-out 0s;
    -ms-transition: all 0.6s ease-out 0s;
    -o-transition: all 0.6s ease-out 0s;
    transition: all 0.6s ease-out 0s;
`;

export const Pagenation = styled.div`
    display: flex;
    justify-content: center;
`;
