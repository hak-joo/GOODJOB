import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { HiUserCircle } from 'react-icons/hi';
import { AiOutlineArrowLeft, AiFillCaretDown } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';

import * as recoilItem from '../util/recoilItem';
import * as s from './SidebarStyled';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userApi } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { jobGroupList } from '../util/jobGroupList';

const Sidebar = ({ ...props }) => {
    //Navigation Management
    const [navColor, setNavColor] = useState('#ffffff');
    const onMouseOverNav = () => {
        setNavColor('#d5d3d3');
    };
    const onMouseOutNav = () => {
        setNavColor('#ffffff');
    };
    const navigate = useNavigate();

    //fetch, token
    const [token, setToken] = useRecoilState(recoilItem.access_token);
    const [state, setState] = useRecoilState(recoilItem.state_token);
    const [updated, setUpdated] = useRecoilState(recoilItem.user_update_count);

    const [userData, setUserData] = useState(null);
    const fetchData = async () => {
        if (!token || !state) {
            localStorage.clear();
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
                alert('잘못된 접근입니다.');
                navigate('/');
            } finally {
                if (res) {
                    setUserData(res.data);
                    if (res.data.prefer.culture + res.data.prefer.pay == 0) {
                        setPreferList([
                            { title: '문화', rank: 0, name: 'culture' },
                            { title: '급여', rank: 1, name: 'pay' },
                            { title: '업무강도', rank: 2, name: 'task' },
                            { title: '복지', rank: 3, name: 'welfare' },
                            { title: '출퇴근', rank: 4, name: 'commute' },
                        ]);
                        setJobGroup(res.data.job_group);
                    } else {
                        setPreferList([
                            { title: '문화', rank: res.data.prefer.culture, name: 'culture' },
                            { title: '급여', rank: res.data.prefer.pay, name: 'pay' },
                            { title: '업무강도', rank: res.data.prefer.task, name: 'task' },
                            { title: '복지', rank: res.data.prefer.welfare, name: 'welfare' },
                            { title: '출퇴근', rank: res.data.prefer.commute, name: 'commute' },
                        ]);
                        setJobGroup(res.data.job_group);
                        preferList.sort();
                    }
                }
            }
        }
    };

    useEffect(() => {
        fetchData();
        jobGroupList.sort();
    }, []);

    const onClickLogout = () => {
        localStorage.clear();
        setToken(null);
        setState(null);
        setUpdated(null);
        setUserData(null);
        navigate('/');
        alert('로그아웃 되었습니다');
        props.setNavVisible(false);
    };

    // job
    const [jobGroup, setJobGroup] = useState('금융/재무');
    const onChangeJobGroup = (e) => {
        setJobGroup(e.value);
    };


    // prefer
    const [preferList, setPreferList] = useState([]);
    preferList.sort(function (a, b) {
        return parseFloat(a.rank) - parseFloat(b.rank);
    });
    const onClickDown = (index: number) => {
        let tempArray = preferList;
        let temp = preferList[index];
        tempArray.splice(index, 1);
        tempArray.splice(index + 1, 0, temp);
        tempArray.map((item, index) => {
            item.rank = index;
        });
        setPreferList(Array.from(tempArray));
    };

    const onClickSave = async () => {
        if (jobGroup === '') {
            alert('직군을 선택해주세요');
            return;
        }
        let json = {};
        
        for (var i = 0; i < preferList.length; i++) {
            let name = preferList[i].name;
            let rank = preferList[i].rank;
            json[name] = rank;
        }
        let formData = {
            prefer: json,
            email: userData.email,
            job_group: jobGroup,
        };

        let res = null;
        try {
            res = await userApi.setting(formData);
        } catch (e) {
        } finally {
            if (res) {
                if (res.data === 'SUCCESS') {
                    alert('수정이 완료되었습니다');
                    setUpdated(updated + 1);
                } else {
                    alert('오류가 발생하였습니다');
                }
            } else {
                alert('오류가 발생하였습니다');
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [token, state, updated]);

    return (
        <>
            {userData ? (
                <s.DropDownMenuCorp NavVisible={props.NavVisible}>
                    <s.SideTopPadding>
                        <s.NavIconArea>
                            <AiOutlineArrowLeft
                                onMouseOver={() => onMouseOverNav()}
                                onMouseOut={() => onMouseOutNav()}
                                onClick={() => props.onClickMenu()}
                                size={50}
                                cursor={'pointer'}
                                color={navColor}
                            />
                        </s.NavIconArea>
                    </s.SideTopPadding>
                    <s.SideBody>
                        <s.SideBodyTop>
                            <FiLogOut size={30} color="#3cb371" onClick={onClickLogout} />
                        </s.SideBodyTop>
                        <s.ProfileBlock>
                            <HiUserCircle size="70" color="#3cb371" />
                            <s.ProfileUserName>{userData.name}</s.ProfileUserName>
                            {userData.gender === 'M' ? '남' : '여'} / {userData.job_group ? userData.job_group : '직군미정'}
                        </s.ProfileBlock>

                        {/* 직군 */}
                        <s.JobGroupBlock>
                            <s.JobGroupTitle>직군</s.JobGroupTitle>
                            <s.JobGroupSelect>
                                <Select
                                    value={jobGroupList.filter((job) => jobGroup === job.value)}
                                    options={jobGroupList.map((job, key) => {
                                        return {
                                            value: job.value,
                                            label: job.label,
                                        };
                                    })}
                                    menuPosition="absolute"
                                    menuPortalTarget={document.body}
                                    onChange={onChangeJobGroup}
                                />
                            </s.JobGroupSelect>
                        </s.JobGroupBlock>

                        {/* 선호도 선택 */}
                        <s.PreferBlock>
                            <s.PreferTitle>우선순위 할당</s.PreferTitle>
                            <s.PreferItemWrapper>
                                {preferList.map((item, index) => (
                                    <s.PreferItem key={index}>
                                        <s.PreferIndex>{index + 1}</s.PreferIndex>
                                        <s.PreferName>{item.title}</s.PreferName>
                                        <s.PreferDownButton>
                                            <AiFillCaretDown onClick={() => onClickDown(index)} />
                                        </s.PreferDownButton>
                                    </s.PreferItem>
                                ))}
                            </s.PreferItemWrapper>
                        </s.PreferBlock>
                        <s.SaveBlock>
                            <s.ResetButton onClick={fetchData}>초기화</s.ResetButton>
                            <s.SaveButton onClick={onClickSave}>저장</s.SaveButton>
                        </s.SaveBlock>
                    </s.SideBody>
                </s.DropDownMenuCorp>
            ) : null}
        </>
    );
};

export default Sidebar;
