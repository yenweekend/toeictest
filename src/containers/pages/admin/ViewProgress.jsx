import React, {useState} from 'react'
import { Empty } from '../../components'
import icons from '../../../utils/icons'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import {Loading} from "../../components"
import { viewStudentProgress } from '../../../api/teacher/membership'
import { Pagination } from 'antd'
import { useParams } from 'react-router-dom'
import { Progress } from 'antd';
const conicColors = {
    '0%': '#87d068',
    '100%': '#7ce0a2',
  };
const ViewProgress = () => {
const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const handleChangePagination = (page, pageSize) => {
      setCurrentPage(page);
      setPageSize(pageSize)

  }
const {isPending , isError, data, error} = useQuery({ 
    queryKey: ['view-student-progress', params.classroomId],
    queryFn : () => viewStudentProgress(params.classroomId),
    enabled: !! params.classroomId
 });
if (isError) {
  console.log(error)
  return <span>Error: {error.message}</span>
}
if (isPending) {
  return <Loading/>
}
if (isError) {
  console.log(error)
  return <span>Error: {error.message}</span>
}
console.log(data.data);
  return (
    <ViewProgressStyled className='ml-[30px]'>
      <h1 className="title  font-bold text-[20px]">
        <span className='uppercase font-medium text-[20px] mr-2 '>Tiến độ học tập của lớp: </span>
        <span className=' font-bold text-[20px] '>{data.data[0].classroomName}</span>
        {/* Tiến độ học tập của lớp {data.data[0].classroomName} */}
        </h1>
    
    {/* <div className='flex items-center justify-between'>
      <div className='flex items-center gap-3 filter_otp mt-3'>
          <div>
              <div className='flex items-center relative border border-solid rounded-[4px] h-[35px] pl-[20px] pr-[10px] bg-white'>
                  <input type="text" placeholder='Tìm kiếm...' className='outline-none  ' />
                  <div className='absolute right-[10px]'>
                      <icons.search></icons.search>   
                  </div>
              </div>
          </div>
      </div>       
    </div> */}
      <div className='sheets mt-3  border border-solid rounded-[6px]'>
          <div className='flex items-center bg-[#ebebeb] py-2 px-3'>
              <label className='flex-none w-[5%]'>
                  <input
                      type="checkbox"
                      className="hidden input_checkbox"
                  ></input>
                  <div className="input_filter relative mr-2">
                      <div className="absolute "></div>
                  </div>
              </label>
              <div className='whitespace-nowrap  font-bold  w-[25%]'>Tên học sinh</div>
              <div className='whitespace-nowrap  font-bold  w-[20%]'>Email</div>

              <div className='whitespace-nowrap  font-bold  flex-none w-[15%] '>Điểm trung bình</div>
              <div className='whitespace-nowrap  font-bold  flex-none w-[25%]'>Tỉ lệ hoàn thành </div>
              <div className='whitespace-nowrap  font-bold  flex-auto text-center'>Xem chi tiết</div>
          </div>
        {
            data.data.map((result) => (
                      <div className='flex items-center  py-4 px-3 product' key={result.studentInfo.id} >
                          <label className='flex-none w-[5%]'>
                              <input
                                  type="checkbox"
                                  className="hidden input_checkbox"
                              ></input>
                              <div className="input_filter relative mr-2">
                                  <div className="absolute "></div>
                              </div>
                          </label>
                          <div className=' font-bold  w-[25%] flex items-center gap-2 '>
                              <div className='ellipsis_2_lines text-[14px]'>{result.studentInfo.userName}</div>
                          </div>
                          <div className='whitespace-nowrap  font-bold  w-[20%]'>{result.studentInfo.email}</div>

                          <div className='  flex-none w-[15%]'>
                               {
                                result.averageMark > 7 ? <> <span className={`whitespace-nowrap  font-bold text-[#2bc38d] flex items-center gap-2  w-fit px-2 py-1  rounded-[99px] bg-customGreen`}>
                                
                                <span className='text-[12px] px-4'>
                                  {(result.averageMark).toFixed(2)}
                                </span>
                            </span></> : result.averageMark > 4 ?  <span className={`whitespace-nowrap  font-bold text-[#e5ac1a] flex items-center gap-2  w-fit px-2 py-1  rounded-[99px] bg-customYellow`}>
                                
                                <span className='text-[12px] px-4'>
                                  {(result.averageMark).toFixed(2)}
                                </span>
                            </span> :  <span className={`whitespace-nowrap  font-bold text-[#c73231] flex items-center gap-2  w-fit px-2 py-1  rounded-[99px] bg-customRed`}>
                                
                                <span className='text-[12px] px-4'>
                                  {(result.averageMark).toFixed(2)}
                                </span>
                            </span>
                               }
                          </div>
                          <div className='whitespace-nowrap    flex-none w-[25%] text-[14px] ml-[30px]'>  <Progress type="circle" percent={(result.completionRate * 100).toFixed(2)} format={() => `${(result.completionRate * 100).toFixed(2)}%`}  size={40} strokeWidth={12} strokeColor={conicColors} /></div>
                          <div className='whitespace-nowrap    flex-auto text-center'>
                                  <div className='text-[24px] cursor-pointer text-[#9fa4b1] pr-3 items-center w-full flex justify-center' >
                                      <icons.view className='text-black text-[14px]'></icons.view>
                                  </div>                     
                              
                          </div>
                      </div>   

            ))
        }
                
        
        
      </div>
      {/* <div className='pagination mt-4  w-[100%] flex  justify-end'>
          <Pagination  total={20} defaultPageSize={3}  onChange={handleChangePagination} defaultCurrent={1}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} học sinh`}
          showSizeChanger
          pageSizeOptions={[3,5,10,15]}
          />         
      </div> */}
      {/* <Empty text={"Chưa làm kịp trang này ^^ !"} icon={<icons.ongo></icons.ongo>}></Empty> */}
    </ViewProgressStyled>
  )
}
const ViewProgressStyled = styled.div`
    .sheets{
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    }
    

    .footer{
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        background-color: #fff;
    }

    .product:not(:last-child)
    {
        border-bottom: 1px solid #d6d6d6;
    }
`
export default ViewProgress
