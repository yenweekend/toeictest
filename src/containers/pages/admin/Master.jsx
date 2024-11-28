import React from 'react'
import styled from 'styled-components'
import icons from '../../../utils/icons'
import { Popover, Button } from 'antd'  
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { adminLinks } from '../../../utils/route.links'
const Master = () => {
  return (
    <MasterStyled >
     <div className="room_place flex ">
        <div className="left_sight w-[85px] h-full pr-[20px] ">
            <div className=" flex w-full h-auto pt-[16px] ml-[20px]">
                <div className="logo w-[40px] h-[40px] flex-shrink-0">
                    <img src="https://239114911.e.cdneverest.net/cdnazota/storage_public/azota_assets/images/logo-white.svg" alt="" className="w-full h-full object-cover" />
                </div>

            </div>
            <div className="side-nav__devider my-6"></div>
             {
                adminLinks?.map((link) => (
                    <NavLink key={link} to={link.link} className={({isActive}) => {
                        return (
                            "h-[50px] w-[100px] rounded-full pl-5 relative flex items-center justify-start mt-[20px] transition-all ease-linear duration-100 " + (isActive ? "current_page " : "text-[#fff]")
                        )
                    }}>
                        <Popover title={link.tag} placement='right'>
                            {link.icon}
                        </Popover>
                    </NavLink>
                ))
            } 
                   
          
           
            
        </div>
        <div className="room_sight flex-auto   h-full px-[22px] pb-5 relative overflow-hidden flex flex-col gap-[40px]">
            <div className="top_header h-[67px] w-full flex items-center justify-end flex-shrink-0">
                <div className="flex items-center gap-4 h-[40px]">
                    <div className="notificaiton cursor-pointer">
                        <icons.ring className='text-[20px]'></icons.ring>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="avt w-[32px] h-[32px] rounded-full overflow-hidden cursor-pointer">
                            <img src="https://cdn.pixabay.com/photo/2024/05/07/06/38/shiny-gold-rose-beetle-8744981_640.jpg" alt="" className='w-full h-full object-cover' />
                        </div>
                        <div className="info flex flex-col  justify-start ">
                            <span className="text-[#1e293b] font-medium capitalize">nguyen van yen</span>
                            <span className="text-[12px] text-[#475569]">Hoc Sinh</span>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet/>
        </div>
     </div>
     <div className="setting fixed bottom-[50px] left-[40px] cursor-pointer">
        <icons.setting className='text-white text-[30px]'></icons.setting>
     </div>
    </MasterStyled>
  )
}
const MasterStyled = styled.div`
    background-color: var(--bg-color);
    width: 100vw;
    height: 100vh;
    padding: 20px;
    .bg_color{
        background-color: #1e40ae;
    }
    .title{
        color: var(--primary-color);
    }
    .danger_btn{
        background-color: var(--danger-btn);
    }
    .cancel_btn{
        background-color: var(--secondary-color) ;
    }
    .top_header{
        border-bottom: 1px solid rgb(226,232,240);
    }
    .room_place{
        flex : 1 1 0%;
        width:100% ;
        height: 100%;
    }
    .room_sight{
        background-color: rgb(241,245,249);
        border-radius: 30px;
    }
     .side-nav__devider {
    position: relative;
    z-index: 10;
    height: 1px;
    width: 100%;
    background-color: #ffffff14;
}
    /* .top, .bottom{
       width: 50px;
       height: 50px;
       border-radius :50% ;
       background-color: transparent;
       right: 15px;
    }
    .top{
        bottom: 100%;
        box-shadow: 25px 25px 10px 0 rgb(241,245,249);
    }
    .bottom{
        box-shadow: 25px -25px 10px 0 rgb(241,245,249);
        top: 100%;
    } */
    .current_page{
        position: relative;
        color: #1e40ae;
        background-color: rgb(241,245,249);
    }
    .current_page::before, .current_page::after{
        content: "";
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius :50% ;
        background-color: transparent;
        right: 15px;
    }
    .current_page::before{
        box-shadow: 25px -25px 10px 0 rgb(241,245,249);
        top: 100%;
    }
    .current_page::after{
        bottom: 100%;
        box-shadow: 25px 25px 10px 0 rgb(241,245,249);
    }
`
export default Master
