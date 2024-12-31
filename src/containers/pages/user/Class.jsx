import React, { useCallback, useEffect, useRef, useState } from 'react'
import {getclass,findClass} from "../../../api/student/class";
import {useMutation, useQuery} from '@tanstack/react-query';
import { Loading } from '../../components';
import { requestJoin } from '../../../api/student/membership';
import icons from '../../../utils/icons';
import {getFirstAndLastInitials} from "../../../helpers/functions";
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import { successToastify } from '../../../helpers/Toastify';

const Class = () => {
  const [input,setInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
const handleOk = () => {
  setIsModalOpen(false);
};
  const [classMatchId, setClassMatchId] = useState(null);
  const inputRef = useRef(null);
    const mutation = useMutation({
        mutationFn: findClass,
        onSuccess : (data) => {
          console.log(data.data);
          setClassMatchId(data.data);
        },
        onError : (error) => {
          console.log(error)
        }
    });
    const requestMutation = useMutation({
        mutationFn: requestJoin,
        onSuccess : (data) => {
          console.log(data.data);
            successToastify(`Gửi yêu cầu đến lớp ${classMatchId.className} thành công !`);
            setInput(null);
            setClassMatchId(null);
        },
        onError : (error) => {
          console.log(error)
        }
    });
    const handleFindClass = useCallback(() => {
      mutation.mutate(input);
    },[input]);
    const handleSendRequest = useCallback(() => {
      requestMutation.mutate(classMatchId.id)
    },[classMatchId]);
    const { isPending, isError, data, error } = useQuery({ queryKey: ['classes'], queryFn: getclass });

    if (isPending) {
        return <Loading/>
      }
    
  return (
    <div className='ml-4'>
      <div className="">
        <div className="search_class flex items-center justify-between mb-5">    
            <div className="">
              <div className="text-[14px] font-medium mb-2">
                Tìm kiếm lớp
              </div>
              <div className="form-group"> 
                <input className='outline-none px-[12px] py-[8px] rounded-xl text-[14px] font-medium' type='text' placeholder='Nhập id lớp' ref={inputRef} value={input} onChange={(e) => {
                  setInput(e.target.value);
                }}></input>
                <button type="button" className="search-btn ml-5 px-2 py-2 rounded-xl bg-[#1e40ae] text-[14px] font-medium text-white" onClick={handleFindClass}>
                  Tìm kiếm
                </button>
              </div>
                
            </div>
             <div className="bg-[#1e40ae] text-[14px]  text-white px-3 py-2 rounded-xl capitalize cursor-pointer " >
              <Modal title={`Tiến độ học tập `} className='progress' open={isModalOpen} onOk={handleOk} onCancel={() => {
                      setIsModalOpen(false);
              }}> 
              </Modal>

              <div  onClick={showModal}>tiến độ học tập</div>
             </div>
        </div>
        {
                classMatchId !== null && <>
                  <div className="class px-[20px] py-[12px] bg-[#fff] rounded-[8px] h-[120px] w-[calc((100%/3)-24px)] "   >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="avt w-[45px] h-[45px] bg-[#dddddd] text-[#000] text-[22px] font-medium rounded-full flex items-center justify-center ">
                    {getFirstAndLastInitials(classMatchId.teacherName)}
                  </div>
                  <div className="">
                    <p className='text-[#1e3a8a] text-[18px] font-medium capitalize'>{classMatchId.className}</p>
                    <p className='text-[#1e293b] text-[12px] font-medium'>Giáo viên {classMatchId.teacherName}</p>
                  </div>
                </div>
                {
                  classMatchId.state === "Joined" ? <div className="bg-[#0cc021] text-white text-[14px] font-medium px-2 py-1 rounded-xl ">Đã tham gia</div>: <div className="bg-[#fcc865] text-white text-[14px] font-medium px-2 py-1 rounded-xl cursor-pointer" onClick={handleSendRequest}>Gửi yêu cầu </div>
                }
               
              </div>
              <div className="flex items-center justify-between mt-5">
                <div className="flex items-center gap-2">
                  <icons.schedule className='text-[20px]'></icons.schedule>
                  <span className='text-[#1e293b] text-[14px] font-medium'>Bài tập, Đề</span>
                  <span className='text-[#1e293b] text-[14px] font-medium'>(... đề )</span>
                </div>
                
              </div>
            </div>
                </>
              }

      </div>
        <div className="flex items-center justify-between">
        <div className="text-[20px] font-medium mt-4">Danh sách lớp đã tham gia </div>
     
      </div>
        <div className="classes flex items-center flex-wrap  ml-[-24px] mt-[30px] gap-y-[24px]">
        {
          data.data.map((item) => (
            <div className="class px-[20px] py-[12px] bg-[#fff] rounded-[8px] h-[120px] w-[calc((100%/3)-24px)] ml-[24px] " key={item.id}  >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="avt w-[45px] h-[45px] bg-[#dddddd] text-[#000] text-[22px] font-medium rounded-full flex items-center justify-center ">
                  {getFirstAndLastInitials(item.teacherName)}
                </div>
                <div className="">
                  <p className='text-[#1e3a8a] text-[18px] font-medium capitalize'>{item.className}</p>
                  <p className='text-[#1e293b] text-[12px] font-medium'>Giáo viên {item.teacherName}</p>
                </div>
              </div>
              <Link className='text-[#647488] flex items-center gap-2' to={`/vi/student/classroom-details/${item.id}`} >
                <span className='text-inherit'>Vào lớp {" "}</span>
                <icons.arrowright className='text-inherit text-[20px]'></icons.arrowright>
              </Link>
            </div>
            <div className="flex items-center justify-between mt-5">
              <div className="flex items-center gap-2">
                <icons.schedule className='text-[20px]'></icons.schedule>
                <span className='text-[#1e293b] text-[14px] font-medium'>Bài tập, Đề</span>
                <span className='text-[#1e293b] text-[14px] font-medium'>(... đề )</span>
              </div>
              
            </div>
          </div>
          ))
        }
            <div>

    </div>
      </div>
    </div>
  )
}

export default Class
