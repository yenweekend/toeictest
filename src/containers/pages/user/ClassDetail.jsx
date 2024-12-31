import React from 'react'
import { useParams } from 'react-router-dom'
import icons from '../../../utils/icons';
import { getTests } from '../../../api/student/class';
import { Empty, Loading } from '../../components';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
const ClassDetail = () => {
   const params = useParams();
    const { isPending, isError, data, error } = useQuery({ 
        queryKey: ['tests', params.classroomId],
        queryFn: () => getTests(params.classroomId) ,
        enabled: !!params.classroomId
    })
    if (isPending) {
        return <Loading></Loading>
      }
      if (isError) {
        return <span>Error: {error.message}</span>
      }
      console.log(data.data);
  return (
    <div className='ml-[30px]'>
    <div className="flex items-center justify-start">
         
    </div>
    <h2 className='text-[#1e293b] text-[18px] my-[20px] font-medium'>Danh sách các đề đã tạo</h2>

   <div className="w-[80vw] mx-auto shadow-round rounded-xl p-5 ">
      <div className=" flex items-center justify-between top_header ">
        <h2 className='text-[20px] font-medium text-[#000]'>Đề</h2>
        <div className="bg-[#f9f9fb] rounded-full px-5 py-3 flex items-center justify-center text-[#000] font-medium text-[14px] top_header">
          {data.data.filter((test) => test.isDone).length}/{data.data.length} Đề & Bài thi
        </div>
      </div>
      <div className="flex flex-col">
        {
          data.data.length > 0 ?
          data.data.map((lesson, index) => (
            <div className="flex items-center justify-between py-4 pr-5 ml-[44px] lesson relative" key={lesson.id}>
            <div className="flex items-center gap-3 ml-[28px]">
              <icons.file className='text-[20px]'></icons.file>
              <Link className='text-[#000] text-[16px] font-medium hover:text-[#1e40ae] cursor-pointer' to={`${lesson.isDone ? `/vi/student/test-result/${lesson.attemptId}` : `/vi/student/classroom/testpro/${lesson.id}`}`}>{lesson.name}</Link>
            </div>
            {
              lesson.isDone ? <div className="">
                <Link className="" to={`/vi/student/test-result/${lesson.attemptId}`}>
                  <icons.checkfill className='text-[24px] text-[#4ad071]'></icons.checkfill>
                </Link>
            </div> : <Link to={`/vi/student/classroom/testpro/${lesson.id}`} className='flex items-center gap-2'>
            <span className='text-[14px] font-medium'>Vào kiểm tra</span>
            <icons.arrowright></icons.arrowright>
            </Link>
            }
            
            <div className="absolute w-8 h-8 rounded-full bg-[#1e40ae] flex items-center justify-center text-[14px] font-bold text-white left-[-17px]">{index + 1 < 10 ? `0${index + 1}`: index + 1}</div>
          </div>
          ))
           :    <Empty icon={     <icons.file className='text-[28px]'></icons.file>} text={'Chưa có đề , bài tập nào !'}></Empty>
        }
       
      </div>
   </div>
    
  </div>
  )
}

export default ClassDetail
