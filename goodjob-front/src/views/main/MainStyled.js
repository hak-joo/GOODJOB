import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

export const MainCarousel = styled.div`
    flex: 6;
    width: 100%;
    @media screen and (min-width: 767px) {
        max-width: 500px;
    }

    @media screen and (min-width: 1080px) {
        min-width: 900px;
    }

    align-self: center;
    justify-self: center;
`;

export const MainHeader = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
`;

export const MainItem = styled(Link)`
    text-decoration: none;
    font-weight: normal;
    color: black;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #c8ead1;
    border-right: ${(props) => (props.isLast ? 'none' : '1px solid white')};
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

export const StyledSlider = styled(Slider)`
    .slick-slide div {
        outline: none;
    }
`;

export const CardContainer = styled.div`
    margin: 5px;
`;

export const Card = styled.div`
    height: 300px;

    @media screen and (min-width: 767px) {
        padding: 1rem;
    }

    @media screen and (min-width: 1080px) {
        padding: 2rem;
    }
`;

export const CardContent = styled.div`
    padding: 1rem;
    background-color: #3cb371;
    border-radius: 20px;
    height: 100%;
    color: white;
    &:hover {
        background-color: green;
        opacity: 0.4;
    }
`;

export const CompanyName = styled.div`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    @media screen and (min-width: 767px) {
        font-size: 15px;
    }
`;
