import React, {useRef, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import icons from '../../../utils/icons'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getTests, createTest } from '../../../api/teacher/class'
import { Loading, Empty } from '../../components'
import Modal from 'antd/es/modal/Modal'
import { useMutation } from '@tanstack/react-query'
import {ExamCodeCopy} from '../../components'
const ListTest = () => {
  const queryClient = useQueryClient();
    const inputTestRef = useRef(null);
    const inputTimeLimitRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleDelete = () => {
      setIsModalOpen(false);
    };
    const params = useParams();
    const { isPending, isError, data, error } = useQuery({ 
        queryKey: ['tests', params.classroomId],
        queryFn: () => getTests(params.classroomId) ,
        enabled: !!params.classroomId
    })
    const mutation = useMutation({
      mutationFn: createTest,
      onSuccess : (data) => {
        console.log(data.data)
        queryClient.invalidateQueries({ queryKey: ['tests'] })
  
      },
      onError : (error) => {
        console.log(error)
      }
    });
  
    const handleOk = () => {
      const formData = {classroomId: params.classroomId, name : inputTestRef.current.value, timeLimit: inputTimeLimitRef.current.value};
      console.log(formData)
      mutation.mutate(formData);
      setIsModalOpen(false);
      successToastify("Tạo đề thành công");
    };
    if (isPending) {
        return <Loading></Loading>
      }
      if (isError) {
        return <span>Error: {error.message}</span>
      }
      console.log(data.data)
  return (
    <div className='ml-[30px]'>
      <div className="flex items-center justify-start">
            <div className="flex items-center gap-2 cursor-pointer bg-[#1e40af] px-[20px] py-[10px] rounded-[8px] text-white font-medium hover:opacity-80 transition-all duration-100 ease-linear " onClick={showModal} >
              <icons.plus></icons.plus>
              <span>Tạo đề mới</span>
            </div>
            <Modal title="Thêm đề " open={isModalOpen} onOk={handleOk} onCancel={handleDelete}>
              <div className="form_group flex flex-col"> 
                <label htmlFor="" className='text-[14px] font-medium'>Tên đề</label>
                <input type="text" name='name' placeholder='Nhập tên đề' className='outline-none border border-[#000] rounded-[6px] px-[12px] py-[6px]' ref={inputTestRef}/>
              </div>
              <div className="form_group flex flex-col mt-3"> 
                <label htmlFor="" className='text-[14px] font-medium'>Giới hạn (phút)</label>
                <input type="text" name='timeLimit' placeholder='Giới hạn thời gian' className='outline-none border border-[#000] rounded-[6px] px-[12px] py-[6px]' ref={inputTimeLimitRef}/>
              </div>
            </Modal>
      </div>
      <h2 className='text-[#1e293b] text-[18px] my-[20px] font-medium'>Danh sách các đề đã tạo</h2>
      {
        data.data.length > 0 ? <div className=" flex items-center flex-wrap  ml-[-24px] mt-[30px] gap-y-[24px]">
        {
          data.data.map((test) => (
              <div className=" px-[20px] py-[12px] bg-[#eeeeee] rounded-[8px] h-[130px] w-[calc((100%/4)-24px)] ml-[24px] flex flex-col justify-between relative" key={test.id} >
              <div className="flex items-center justify-between">
                <div className="class_name whitespace-nowrap font-medium text-[#1e293b] text-[14px]">
                  Tên đề : {" "}
                {test.name}
                </div>
              </div>
              <div className="flex items-center justify-between text-[#647488] text-[12px] font-medium">
               Thời gian : {" "}{test.timeLimit} phút
              </div>
              <div className="w-full overflow-hidden">
                <div className="whitespace-nowrap text-[12px]">Mã đề : </div>
                <div className="flex items-center gap-3">
                    <span className='text-[12px] font-medium line-clamp-1 whitespace-nowrap' >
                    {test.id.slice(0,15)}...
                    </span>
                    <ExamCodeCopy code={test.id}></ExamCodeCopy>
                </div>
              </div>
              <div className="absolute right-[20px] top-[50%] ">
                <Link to={`/vi/admin/student/classroom-details/${params.classroomId}/1/test-review/${test.id}`} className='text-[12px]  text-[#1e40ae] '>
                Review
                </Link>
              </div>
          </div>
          ))
        }
          </div> : 
          <Empty icon={     <icons.file className='text-[28px]'></icons.file>} text={'Chưa có đề , bài tập nào !'}></Empty>
    //        <div className="empty h-[216px] w-full empty flex items-center justify-center bg-white rounded-xl">
    //         <div className="flex flex-col items-center">
           
    //             <span className='primary-color font-medium'>Chưa có đề , bài tập nào !</span>
    //         </div>
    //   </div>
      }
     
      
    </div>
  )
}

export default ListTest
