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
    border: 2px solid #3cb371;

    display: flex;
    flex-direction: column;
    text-align: center;
    @media screen and (max-width: 768px) {
        width: 90%;
    }
`;

export const Logo = styled.div`
    font-size: 200%;
    font-weight: bolder;
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #3cb371;
`;

export const DescriptionArea = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #3cb371;
    font-size: 100%;
    font-weight: bold;
`;
