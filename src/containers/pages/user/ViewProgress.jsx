import React,{useState} from 'react'
import {useMutation, useQuery} from '@tanstack/react-query';
import { Loading } from '../../components';
import { viewProgress } from '../../../api/student/membership';
import styled from 'styled-components';
import { Pagination } from 'antd';
import icons from '../../../utils/icons';
import timestamp from "../../../helpers/timestamp"
const ViewProgress = () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize, setPageSize] = useState(3);
        const handleChangePagination = (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize)
            // const startIndex = (page - 1) * pageSize;
            // const currentData = fakeData.slice(startIndex, startIndex + pageSize);
            // setData(currentData);
        }
    const {isPending , isError, data, error} = useQuery({ queryKey: ['progress'], queryFn: viewProgress });
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
    <ViewProgressStlyed>
           
           <h1 className="title uppercase font-bold text-[20px]">Tiến độ học tập</h1>
    
    <div className='flex items-center justify-between'>
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
    </div>
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
              <div className='whitespace-nowrap  font-bold  w-[25%]'>Tên đề đã làm</div>
              <div className='whitespace-nowrap  font-bold  flex-none w-[15%] '>Điểm</div>
              <div className='whitespace-nowrap  font-bold  flex-none w-[25%]'>Thời gian nộp bài</div>
              <div className='whitespace-nowrap  font-bold   flex-none w-[20%]'>Tên lớp</div>
              <div className='whitespace-nowrap  font-bold  flex-auto text-center'>Xem chi tiết</div>
          </div>
          {
              data.data?.map((attempt) => (
                  <>
                      <div className='flex items-center  py-4 px-3 product' key={attempt.id}>
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
                              <div className='ellipsis_2_lines text-[14px]'>{attempt.testName}</div>
                          </div>
                     
                          <div className='  flex-none w-[15%]'>
                          <span className={`whitespace-nowrap  font-bold text-[#2bc38d] flex items-center gap-2  w-fit px-2 py-1  rounded-[99px] bg-customGreen`}>
                                  {/* <span className="dot w-2 h-2 rounded-[50%] bg-[#2bc38d] "></span> */}
                                  <span className='text-[12px] px-4'>
                                    {attempt.mark}
                                  </span>
                              </span>
                        
                          
                          </div>
                          <div className='whitespace-nowrap    flex-none w-[25%] text-[14px]'>{timestamp(attempt.doneAt)}</div>
                          <div className='whitespace-nowrap     flex-none w-[20%]'>{attempt.classroomName}</div>
                          <div className='whitespace-nowrap    flex-auto text-center'>
                                  <div className='text-[24px] cursor-pointer text-[#9fa4b1] pr-3 items-center w-full flex justify-center' >
                                      <icons.view className='text-black text-[14px]'></icons.view>
                                  </div>                     
                              
                          </div>
                      </div>   
                  </>
              ))
          }
      </div>
      <div className='pagination mt-4  w-[100%] flex  justify-end'>
          <Pagination  total={data.data.length} defaultPageSize={3}  onChange={handleChangePagination} defaultCurrent={1}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} bài test`}
          showSizeChanger
          pageSizeOptions={[3,5,10,15]}
          />         
      </div>
    </ViewProgressStlyed>
  )
}
const ViewProgressStlyed = styled.div`
    
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
