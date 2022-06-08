import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { HiUserCircle } from 'react-icons/hi';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';

import * as recoilItem from '../util/recoilItem';
import * as s from './SidebarStyled';
import { useRecoilState} from 'recoil';
import { userApi } from '../api/api';
import { jobGroupList } from '../util/jobGroupList';
import SeekBar from 'react-seekbar-component';
import 'react-seekbar-component/dist/index.css';



const Sidebar = ({ ...props }) => {
    //Navigation Management
    const [navColor, setNavColor] = useState('#ffffff');
    const onMouseOverNav = () => {
        setNavColor('#d5d3d3');
    };
    const onMouseOutNav = () => {
        setNavColor('#ffffff');
    };

    //fetch, token
    const [token, setToken] = useRecoilState(recoilItem.access_token);
    const [state, setState] = useRecoilState(recoilItem.state_token);
    const [updated, setUpdated] = useRecoilState(recoilItem.user_update_count);

    const [userData, setUserData] = useState(null);

    const [culture, setCulture] = useState(0);
    const [pay, setPay] = useState(0);
    const [welfare, setWelfare] = useState(0);
    const [commute, setCommute] = useState(0);
    const [task, setTask] = useState(0);

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
                localStorage.clear();
                window.location.href = '/';
            } finally {
                if (res) {
                    setUserData(res.data);
                    if (res.data.prefer.culture + res.data.prefer.pay === 0) {
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
                        setPay(res.data.prefer.pay);
                        setCommute(res.data.prefer.commute);
                        setWelfare(res.data.prefer.welfare);
                        setCulture(res.data.prefer.culture);
                        setTask(res.data.prefer.task);
                        setJobGroup(res.data.job_group ? res.data.job_group : "");
                    }
                }
            }
        }
    };
    const [value, setValue] = useState(0);


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
        window.location.href = '/';
        alert('로그아웃 되었습니다');
        props.setNavVisible(false);
    };

    // job
    const [jobGroup, setJobGroup] = useState('금융/재무');
    const onChangeJobGroup = (e) => {
        setJobGroup(e.value);
    };


    const [preferList, setPreferList] = useState([]);
    
    const onClickSave = async() => {
        if (jobGroup === ''){
            alert('직군을 선택해주세요');
            return;
        }
        let formData = {
            prefer: {
                culture: culture,
                pay: pay,
                commute: commute,
                welfare: welfare,
                task: task,
            },
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
                    if (window.innerWidth < 450) {
                        props.setNavVisible(false);
                    }
                } else {
                    alert('오류가 발생하였습니다');
                }
            } else {
                alert('오류가 발생하였습니다');
            }
        }
    }
    // const onClickSave = async () => {
    //     if (jobGroup === '') {
    //         alert('직군을 선택해주세요');
    //         return;
    //     }
    //     let json = {};
        
    //     for (var i = 0; i < preferList.length; i++) {
    //         let name = preferList[i].name;
    //         let rank = preferList[i].rank;
    //         json[name] = rank;
    //     }
    //     let formData = {
    //         prefer: json,
    //         email: userData.email,
    //         job_group: jobGroup,
    //     };

    //     let res = null;
    //     try {
    //         res = await userApi.setting(formData);
    //     } catch (e) {
    //     } finally {
    //         if (res) {
    //             if (res.data === 'SUCCESS') {
    //                 alert('수정이 완료되었습니다');
    //                 setUpdated(updated + 1);
    //                 if(window.innerWidth < 450){
    //                     props.setNavVisible(false);
    //                 }
    //             } else {
    //                 alert('오류가 발생하였습니다');
    //             }
    //         } else {
    //             alert('오류가 발생하였습니다');
    //         }
    //     }
    // };

    useEffect(() => {
        fetchData();
    }, [token, state, updated]);

    return (
        <>
            {userData ? (
                <s.DropDownMenuCorp NavVisible={props.NavVisible}>
                    <s.SideTopPadding>
                        <s.NavIconArea>
                            <AiOutlineMenu
                                onMouseOver={() => onMouseOverNav()}
                                onMouseOut={() => onMouseOutNav()}
                                onClick={() => props.onClickMenu()}
                                size={window.innerWidth > 500 ? 50 : 30}
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
                            <s.PreferTitle>중요도 할당</s.PreferTitle>
                            <s.PreferItemWrapper>
                                <s.PreferItem>
                                    <s.PreferName>급여</s.PreferName>
                                    <SeekBar
                                        getNumber={setPay}
                                        width="60%"
                                        backgroundColor="#e2e2e2"
                                        fillColor="#3cb371"
                                        headColor="green"
                                        headShadow="#3cb371"
                                        headShadowSize={2}
                                        progress={pay}
                                    />
                                    <s.PreferValue>{pay}</s.PreferValue>
                                </s.PreferItem>
                                <s.PreferItem>
                                    <s.PreferName>문화</s.PreferName>
                                    <SeekBar
                                        getNumber={setCulture}
                                        width="60%"
                                        backgroundColor="#e2e2e2"
                                        fillColor="#3cb371"
                                        headColor="green"
                                        headShadow="#3cb371"
                                        headShadowSize={2}
                                        progress={culture}
                                    />
                                    <s.PreferValue>{culture}</s.PreferValue>
                                </s.PreferItem>
                                <s.PreferItem>
                                    <s.PreferName>복지</s.PreferName>
                                    <SeekBar
                                        getNumber={setWelfare}
                                        width="60%"
                                        backgroundColor="#e2e2e2"
                                        fillColor="#3cb371"
                                        headColor="green"
                                        headShadow="#3cb371"
                                        headShadowSize={2}
                                        progress={welfare}
                                    />
                                    <s.PreferValue>{welfare}</s.PreferValue>
                                </s.PreferItem>
                                <s.PreferItem>
                                    <s.PreferName>출퇴근</s.PreferName>
                                    <SeekBar
                                        getNumber={setCommute}
                                        width="60%"
                                        backgroundColor="#e2e2e2"
                                        fillColor="#3cb371"
                                        headColor="green"
                                        headShadow="#3cb371"
                                        headShadowSize={1}
                                        progress={commute}
                                    />
                                    <s.PreferValue>{commute}</s.PreferValue>
                                </s.PreferItem>
                                <s.PreferItem>
                                    <s.PreferName>업무강도</s.PreferName>
                                    <SeekBar
                                        getNumber={setTask}
                                        width="60%"
                                        backgroundColor="#e2e2e2"
                                        fillColor="#3cb371"
                                        headColor="green"
                                        headShadow="#3cb371"
                                        headShadowSize={2}
                                        progress={task}
                                    />
                                    <s.PreferValue>{task}</s.PreferValue>
                                </s.PreferItem>
                                {/* {preferList.map((item, index) => (
                                    <s.PreferItem key={index}>
                                        <s.PreferName>{item.title}</s.PreferName>
                                        <SeekBar
                                            getNumber={setValue}
                                            width="50%"
                                            backgroundColor="gray"
                                            fillColor="#3cb371"
                                            headColor="green"
                                            headShadow="#3cb371"
                                            headShadowSize={2}
                                            progress={89}
                                        />
                                        {item.rank}
                                    </s.PreferItem>
                                ))} */}
                            </s.PreferItemWrapper>
                        </s.PreferBlock>
                        <s.SaveBlock>
                            <s.SaveButton onClick={onClickSave}>저장</s.SaveButton>
                        </s.SaveBlock>
                    </s.SideBody>
                </s.DropDownMenuCorp>
            ) : null}
        </>
    );
};

export default Sidebar;
