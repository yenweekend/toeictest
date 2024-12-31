import React , {useState}from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components'
import {Loading} from "../../components"
import { viewAllResult } from '../../../api/student/membership'
import { Pagination } from 'antd'
import icons from '../../../utils/icons';
import { getFirstAndLastInitials } from '../../../helpers/functions';
import timestamp from '../../../helpers/timestamp';
const ReviewTest = () => {
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const handleChangePagination = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize)
  
    }
    const {isPending , isError, data, error} = useQuery({ queryKey: ['viewprogress', params.testId], queryFn: () => viewAllResult(params.testId) , enabled: !!params.testId});
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
const currentData = data.data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <ReviewTestStyled>
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
              <div className='whitespace-nowrap  font-bold  w-[25%]'>Họ và tên</div>
              <div className='whitespace-nowrap  font-bold  w-[20%]'>Email</div>

              <div className='whitespace-nowrap  font-bold  flex-none w-[15%] '>Điểm</div>
              <div className='whitespace-nowrap  font-bold  flex-none w-[25%]'>Thời gian nộp bài</div>
              <div className='whitespace-nowrap  font-bold  flex-auto text-center'>Xem chi tiết</div>
          </div>
          {
            currentData.map((student) => (
                <div className='flex items-center  py-4 px-3 product'  key={student.id}>
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
                           <div className="avt w-[45px] h-[45px] bg-[#dddddd] text-[#000] text-[22px] font-medium rounded-full flex items-center justify-center ">
                                              {getFirstAndLastInitials(student.student.userName)}
                                            </div>
                                <div className='ellipsis_2_lines text-[14px] font-medium'>{student.student.userName}</div>
                          </div>
                          <div className='whitespace-nowrap  font-bold  w-[20%]'>{student.student.email}</div>

                          <div className='  flex-none w-[15%]'>
                          <span className={`whitespace-nowrap  font-bold  flex items-center gap-2  w-fit px-2 py-1  rounded-[99px]   ${student.mark > 7 ? "text-[#2bc38d] bg-customGreen " : student.mark > 4 ? "text-[#e5ac1a] bg-customYellow" :"text-[#c73231] bg-customRed" }`}>
                                  <span className='text-[12px] px-4'>
                                    {student.mark}
                                  </span>
                              </span>
                        
                          
                          </div>
                          <div className='whitespace-nowrap    flex-none w-[25%] text-[14px]'>{timestamp(student.doneAt)}</div>
                          <div className='whitespace-nowrap    flex-auto text-center'>
                                  <div className='text-[24px] cursor-pointer text-[#9fa4b1] pr-3 items-center w-full flex justify-center' >
                                      <icons.view className='text-black text-[14px]'></icons.view>
                                  </div>                     
                              
                          </div>
                      </div>   
            ))
          }
        
      </div>
      <div className='pagination mt-4  w-[100%] flex  justify-end'>
          <Pagination  total={data.data.length} defaultPageSize={3}  onChange={handleChangePagination} defaultCurrent={1}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} học sinh`}
          showSizeChanger
          pageSizeOptions={[3,5,10,15]}
          />         
      </div>
    </ReviewTestStyled>
  )
}
const ReviewTestStyled = styled.div`
    
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
export default ReviewTest
