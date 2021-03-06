import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { useMatch, useLocation } from 'react-router-dom';
import './index.css';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const rootNode = document.getElementById('root');



const GlobalStyles = createGlobalStyle`

  html, body, div, p {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --color__primary: #E75151;
  }
`;

export default GlobalStyles;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RecoilRoot>
    <GlobalStyles/>
    <App match = {useMatch} location = {useLocation}/>
  </RecoilRoot> 
)

// ReactDOM.createRoot(rootNode).render(
//     <RecoilRoot>
//         <React.Suspense fallback={<div>Loading..</div>}>
//             <GlobalStyles />
//             <App match={useMatch} location={useLocation} />
//         </React.Suspense>
//     </RecoilRoot>
// );
