import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import icons from '../../../utils/icons'
import { Popover, Button } from 'antd'  
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { adminLinks } from '../../../utils/route.links'
import setAuthToken from "../../../helpers/setAuthToken"
import { currentUser } from '../../../redux-toolkit/selector/auth.selector'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {setInfo} from "../../../redux-toolkit/slices/auth.slice";
const Master = () => {
  const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUserData = useSelector(currentUser);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleLogout = () => {
      setAnchorEl(null);
      if(localStorage.getItem("auth-token"))
      {
        localStorage.removeItem("auth-token");
      }
      setAuthToken(null);
      dispatch(setInfo( {
        fullName: null,
        role: null,
        isLogin: false,
    }));
    navigate("/vi/auth/login");
    };

    useEffect(() => {
        if (localStorage["auth-token"]) {
            setAuthToken(localStorage["auth-token"]);
          } else {
            setAuthToken(null);
          }
    },[localStorage["auth-token"]]);
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
                            "h-[50px] w-[100px] rounded-full pl-5 relative flex items-center justify-start mt-[20px] transition-all ease-linear duration-100 " + (isActive && location.pathname !== "/vi/admin/student/create-manual-test"  ? "current_page " : "text-[#fff]")
                        )
                    }}>
                        <Popover title={link.tag} placement='right'>
                            {link.icon}
                        </Popover>
                    </NavLink>
                ))
                
            } 
              <NavLink  to={"/vi/admin/student/create-manual-test"} className={({isActive}) => {
                        return (
                            "h-[50px] w-[100px] rounded-full pl-5 relative flex items-center justify-start mt-[20px] transition-all ease-linear duration-100 " + (isActive ? "current_page " : "text-[#fff]")
                        )
                    }}>
                        <Popover title={"Tạo câu hỏi"} placement='right'>
                        <icons.folder className="cursor-pointer text-[30px]"></icons.folder>
                        </Popover>
                    </NavLink>
        </div>
        <div className="room_sight flex-auto   h-full px-[22px] pb-5 relative overflow-hidden flex flex-col gap-[40px]">
            <div className="top_header h-[67px] w-full flex items-center justify-end flex-shrink-0">
                <div className="flex items-center gap-4 h-[40px]">
                    <div className="notificaiton cursor-pointer">
                        <icons.ring className='text-[20px]'></icons.ring>
                    </div>
                    <div className="flex items-center gap-2">
                        <>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <div className="avt w-[32px] h-[32px] rounded-full overflow-hidden cursor-pointer">
                            <img src="https://cdn.pixabay.com/photo/2024/05/07/06/38/shiny-gold-rose-beetle-8744981_640.jpg" alt="" className='w-full h-full object-cover' />
                        </div>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
        <div className="flex items-center gap-3">
            <div className="avt w-[32px] h-[32px] rounded-full overflow-hidden cursor-pointer">
                <img src="https://cdn.pixabay.com/photo/2024/05/07/06/38/shiny-gold-rose-beetle-8744981_640.jpg" alt="" className='w-full h-full object-cover' />
            </div>
            <div className="info flex flex-col  justify-start ">
                            <span className="text-[#1e293b] font-medium capitalize">{currentUserData?.fullName}</span>
                            <span className="text-[12px] text-[#475569]">{currentUserData?.role}</span>
            </div>

        </div>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
                        </>
                        
                        <div className="info flex flex-col  justify-start ">
                            <span className="text-[#1e293b] font-medium capitalize">{currentUserData?.fullName}</span>
                            <span className="text-[12px] text-[#475569]">{currentUserData?.role}</span>
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
 
`
export default Master
