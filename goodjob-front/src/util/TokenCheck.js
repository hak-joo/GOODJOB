// import React, { useState } from 'react';
// import { userApi } from '../api/api';
// import { loginedApi } from '../api/api-base';
// import * as recoilItem from './recoilItem';
// import { useRecoilValue } from 'recoil';

// export const GetUserData = async() => {
//     const token = useRecoilValue(recoilItem.access_token);
//     const state = useRecoilValue(recoilItem.state_token); 
//     const [userData, setUserData] = useState({});

//     if(!token || !state){
//         localStorage.clear();
    
//         return false;
//     } else{
//         const formData = {
//             code: token,
//             state: state,
//         };
//         await userApi.login(formData)
//             .then((response) => {
//                 if(response.data ==="" || response.data === null){
//                     localStorage.clear();
//                     return null;
//                 } else{
//                     console.log(response);
//                     setUserData(response.data);
//                     return userData;
//                 }
//         })
//     }
// }