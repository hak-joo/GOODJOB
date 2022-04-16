import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    @media screen and (max-width: 768px) {
    }
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;

`;

export const Container = styled.div`
    width: 50%;
    height: 50%;
    border: 2px solid #6dc4db;

    display: flex;
    flex-direction: column;
    text-align: center;
`;

export const Logo = styled.div`
    font-size: 200%;
    font-weight: bolder;
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #6dc4db;
`;

export const DescriptionArea = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #6dc4db;
    font-size: 100%;
    font-weight: bold;
`;

export const LoginButton = styled.div`
    flex: 0.5;
    font-size: 100%;
    font-weight: bold;
    width: 65%;
    background-color: #6DC4DB;
    border-radius: 5px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    margin-bottom: 20px;
    border: none;
    cursor: pointer;
`;

