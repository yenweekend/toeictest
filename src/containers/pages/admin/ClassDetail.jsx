import React from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import Link from 'antd/es/typography/Link'
import icons from "../../../utils/icons"

const ClassDetail = () => {
  const params = useParams();
  return (
    <div className='flex '>
      <div className="max-w-[25%] flex-shrink-0 border-r border-[rgb(226,232,240)] border-solid pr-[20px] h-[200px]">
        {/* <span>{
          params.classroomId
          }</span> */}
        <ul>
          <li>
            <NavLink to={`/vi/admin/student/classroom-details/${params.classroomId}/0`} className={({isActive}) => {
                        return (
                            " flex items-center rounded-xl  pl-3 pr-[40px] py-2 gap-3 cursor-pointer transition-all ease-linear duration-100 " + (isActive ? "bg-[#1e40ae] text-white " : "text-[#1e293b] ")
                        )
                    }}>  
              <icons.person className='text-inherit text-[20px] w-[30px]'></icons.person>
              <span className='text-inherit text-[14px] font-medium'>Tiến độ học tập học sinh</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/vi/admin/student/classroom-details/${params.classroomId}/1`} className={({isActive}) => {
                        return (
                            " flex items-center rounded-xl  pl-3 pr-[40px] py-2 gap-3 cursor-pointer transition-all ease-linear duration-100 " + (isActive ? "bg-[#1e40ae] text-white " : "text-[#1e293b] ")
                        )
                    }}>  
              <icons.calender className='text-inherit text-[20px] w-[30px]'></icons.calender>
              <span className='text-inherit text-[14px] font-medium'>Đề & bài tập</span>
            </NavLink>
          </li>
    
        </ul>
      </div>
      <div className="flex-auto ">
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default ClassDetail
