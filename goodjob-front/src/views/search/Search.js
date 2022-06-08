import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SearchPresenter from './SearchPresenter';
import { companyApi, userApi } from '../../api/api';
import { useRecoilValue } from 'recoil';
import * as recoilItem from '../../util/recoilItem';

const SearchContainer = ({ ...props }) => {
    const param = useParams();

    const navigate = useNavigate();
    const location = useLocation();
    const { searchGroup, searchKeyword, searchPage } = location.state;
    const [keyword, setKeyword] = useState(searchKeyword ? searchKeyword: '');

    const [userData, setUserData] = useState(null);
    const token = useRecoilValue(recoilItem.access_token);
    const state = useRecoilValue(recoilItem.state_token);
    const [companyList, setCompanyList] = useState([]);
    const [jobGroup, setJobGroup] = useState(searchGroup ? searchGroup : '');

    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(searchPage ? searchPage : 1);
    
    const fetchData = async () => {
        
        if (!token || !state) {
            localStorage.clear();
            alert('로그인 후 이용해주세요');
            window.location.href = '/';
            return;
        } else {
            const formData = {
                code: token,
                state: state,
            };
            let res = null;

            try {
                res = await userApi.getUser(formData);
            } catch (e) {
                alert('에러가 발생하였습니다');
                window.location.href = '/';
            } finally {
                
                if (res.data === '') {
                    alert('세션이 만료되어 로그아웃 되었습니다');
                    window.location.href = '/';
                } else {
                    setUserData(res.data);
                }
            }
        }
    };

    const companyFetchData = async () => {
        if (userData == null) return;
        if ((keyword === "" || keyword === "none") && (jobGroup === "미정" || jobGroup === "")) return;
        // const formData = {
        //     job_group: jobGroup === '미정' ? '' : jobGroup,
        //     page: page,
        //     name: keyword,
        //     commute: Math.pow(2, Math.abs(userData.prefer.commute - 4)),
        //     pay: Math.pow(2, Math.abs(userData.prefer.pay - 4)),
        //     welfare: Math.pow(2, Math.abs(userData.prefer.welfare - 4)),
        //     culture: Math.pow(2, Math.abs(userData.prefer.culture - 4)),
        //     task: Math.pow(2, Math.abs(userData.prefer.task - 4)),

        //     ncommute: Math.pow(2, Math.abs(userData.prefer.commute)),
        //     npay: Math.pow(2, Math.abs(userData.prefer.pay)),
        //     nwelfare: Math.pow(2, Math.abs(userData.prefer.welfare)),
        //     nculture: Math.pow(2, Math.abs(userData.prefer.culture)),
        //     ntask: Math.pow(2, Math.abs(userData.prefer.task)),
        // };

        const formData = {
            job_group: jobGroup === '미정' ? '' : jobGroup,
            page: page,
            name: keyword,
            commute: userData.prefer.commute,
            pay: userData.prefer.pay,
            welfare: userData.prefer.welfare,
            culture: userData.prefer.culture,
            task: userData.prefer.task,

            nCommute: userData.prefer.commute * -1,
            nPay: userData.prefer.pay * -1,
            nWelfare: userData.prefer.welfare * -1,
            nCulture: userData.prefer.culture * -1,
            nTask: userData.prefer.task * -1,
        };

        let res = null;

        try {
            res = await companyApi.getSearchList(formData);
        } catch (e) {
        } finally {
            setCompanyList(res.data.companyDtoList);
            setTotalPage(res.data.lastPage);
        }
    };

    const onChangeKeyword = (e) => {
        setKeyword(e.target.value);
    };
    const onKeyPressKeyword = (e) => {
        if(e.key === 'Enter'){
            onClickSearchButton();
        }
    }

    const onChangeJobGroup = (e) => {
        setJobGroup(e.value);
    };


    const onClickSearchButton = async () => {
        if (keyword === '') {
            alert('검색어를 입력해주세요');
            return;
        } else {
            setPage(1);
            companyFetchData();
        }
    };


    useEffect(() => {
        fetchData();
    }, [page]);
    useEffect(() => {
        companyFetchData();
    }, [userData, page]);
    return (
        <SearchPresenter
            jobGroup={jobGroup}
            onChangeJobGroup={onChangeJobGroup}
            companyList={companyList}
            page={page}
            setPage={setPage}
            totalPage={totalPage}
            keyword={keyword}
            onChangeKeyword={onChangeKeyword}
            onClickSearchButton={onClickSearchButton}
            onKeyPressKeyword={onKeyPressKeyword}
            userData = {userData}
        />
    );
};

export default SearchContainer;
