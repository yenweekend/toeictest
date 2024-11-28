import { createGlobalStyle } from "styled-components";
const  GlobalStyle = createGlobalStyle`
    :root{
        --danger-color: #dc2626;
        --bg-color: #1e40ae;
        --primary-color: #1e293b;
        --secondary-color:   #e2e8f0b3;
        --third-color:#64748b;
        --fourth-color:#535353;
        --ks-background-color-6: #F8F9FA;
        --shadow-bottom:  rgba(0, 0, 0, 0.1) 0px 4px 4px;
        --shadow-right:  rgba(0, 0, 0, 0.1) 4px 0px 4px;
        --shadow-round: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
        --wrong-color: #ef5350;
        --true-color: #0ec122;
        --current-color-1: #0D6EFD;
        --current-color-2: #0D6EFD26;
        --footer-color:#F2F6FF;
        --bg-hover: #e0e0e0;
        
    }
`
export default GlobalStyle