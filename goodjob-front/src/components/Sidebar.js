import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import * as s from './SidebarStyled';
import { IoPersonCircle } from 'react-icons/io5';
import { BiX } from 'react-icons/bi';
import {HiUserCircle} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import * as recoilItem from '../util/recoilItem';
import { useRecoilValue } from 'recoil';
import { userApi } from '../api/api';
import { useNavigate } from 'react-router-dom';


const Sidebar = ({...props}) => {
    const [navColor, setNavColor] = useState('#ffffff');
     const onMouseOverNav = () => {
         setNavColor('#d5d3d3');
     };
     const onMouseOutNav = () => {
         setNavColor('#ffffff');
     };
    const token = useRecoilValue(recoilItem.access_token);
    const state = useRecoilValue(recoilItem.state_token);
    const [jobGroup, setJobGroup] = useState("금융/재무");
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const onChangeJobGroup = (e) =>{
        setJobGroup(e.value);
    }
    const fetchData = async() => {
        
        if(!token || !state){
            localStorage.clear();
            return;
        } else{
            const formData = {
                code: token,
                state: state,
            };
            let res = null;
            
            try{
                res = await userApi.getUser(formData);
                console.log(res);
            }
            catch(e) {

                alert("잘못된 접근입니다.");
                navigate('/');
            }
            finally{
                if (res) {
                    setUserData(res.data);
                } 
            }
            
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const jobGroupList = [
        { value: '생산관리/품질관리', label: '생산관리/품질관리' },
        { value: '경영/기획/컨설팅', label: '경영/기획/컨설팅' },
        { value: '생산/제조', label: '생산/제조' },
        { value: '영업/제휴', label: '영업/제휴' },
        { value: '연구개발', label: '연구개발' },
        { value: '마케팅/시장조사', label: '마케팅/시장조사' },
        { value: '엔지니어링', label: '엔지니어링' },
        { value: '유통/무역', label: '유통/무역' },
        { value: '금융/재무', label: '금융/재무' },
        { value: 'IT/인터넷', label: 'IT/인터넷' },
        { value: '인사/총무', label: '인사/총무' },
        { value: '디자인', label: '디자인' },
        { value: '의약', label: '의약' },
        { value: '특수계층/공공', label: '특수계층/공공' },
        { value: '미디어/홍보', label: '미디어/홍보' },
        { value: '전문직', label: '전문직' },
        { value: '기타', label: '기타' },
        { value: '교육', label: '교육' },
    ];

    jobGroupList.sort();

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
                        <s.WhiteSpace/>
                        <s.ProfileBlock>
                            <HiUserCircle size="70" color="#3cb371" />
                            <s.ProfileUserName>{userData.name}</s.ProfileUserName>
                            {userData.gender === 'M' ? '남' : '여'} / {userData.job_group ? userData.job_group : '직군미정'}
                        </s.ProfileBlock>

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
                                    menuPortalTarget={document.body}
                                    onChange={onChangeJobGroup}
                                />
                            </s.JobGroupSelect>
                        </s.JobGroupBlock>
                    </s.SideBody>
                </s.DropDownMenuCorp>
            ) : null}
        </>
    );
}

export default Sidebar;