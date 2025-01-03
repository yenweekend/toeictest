import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import icons from '../../../utils/icons'
import { Popover , Modal, Select} from 'antd';
import {successToastify} from "../../../helpers/Toastify";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useMutation , useQuery, useQueryClient} from '@tanstack/react-query';
import {create, getclass} from "../../../api/teacher/class"
import { Loading } from '../../components';
const Content = ({class_name, class_id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOkDeleteClass = () => {
    setIsModalOpen(false);
    // ket qua tu api
    successToastify("Thao tác xóa lớp đanh update");
  };
  const handleCancelDeleteClass = () => {
    setIsModalOpen(false);
  };

  return (
  <div>
    {/* <div className="flex items-center gap-[20px] text-[#1e293b] text-[14px] hover:bg-[#e2e8f099] px-[8px] py-[4px] rounded-[6px] cursor-pointer">
      <icons.note className="text-[20px]" />
      <span>Sửa lớp</span>
    </div> */}
    <div
      className="text-[#dc2626] flex items-center gap-[20px] hover:bg-[#e2e8f099] px-[8px] py-[4px] rounded-[6px] cursor-pointer"
      onClick={showModal}
    >
      <icons.bin className="text-[20px]" />
      <span>Xóa lớp</span>
    </div>
    <div className="ant_modal">
      <Modal open={isModalOpen} onOk={handleOkDeleteClass} onCancel={handleCancelDeleteClass}>
        <span>
        Bạn có chắc chắn muốn xóa lớp " "
        </span>
        <span className="font-medium">
        {class_name}
        </span>
      </Modal>

    </div>
  </div>

  )
};
const fakeData = [
  {
    value: 'jack',
    label: 'Jack',
  },
  {
    value: 'lucy',
    label: 'Lucy',
  },
  {
    value: 'tom',
    label: 'Tom',
  },
];
const ManageRoom = () => {
  const queryClient = useQueryClient()
  const inputRef = useRef(null);
  const [options,setOptions] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onChange = (value) => {
    const rs = fakeData?.filter((e) => e.label === value)
    // call api here;
  }
  const onSearch = (value) => {
    // get api and render
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleDelete = () => {
    setIsModalOpen(false);
  };
  const { isPending, isError, data, error } = useQuery({ queryKey: ['classes'], queryFn: getclass })
  const mutation = useMutation({
    mutationFn: create,
    onSuccess : (data) => {
      console.log(data.data)
      queryClient.invalidateQueries({ queryKey: ['classes'] })

    },
    onError : (error) => {
      console.log(error)
    }
  });

  const handleOk = () => {
    const formData = {className : inputRef.current.value};
    mutation.mutate(formData);
    setIsModalOpen(false);
    successToastify("Tạo lớp học thành công");
  };
  if (isPending) {
    return <Loading/>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <ManageRoomStyled>
      {/* <div className="search_class">
        <Select showSearch placeholder="Tìm kiếm lớp học" optionFilterProp='label' onChange={onChange} onSearch={onSearch}
        options={options}
        ></Select>
      </div> */}
      <div className="flex items-center justify-between">
        <div className="text-[20px] font-medium">Danh sách lớp</div>
        <div className="flex items-center gap-8">
         
            <div className="flex items-center gap-2 cursor-pointer bg-[#1e40af] px-[20px] py-[10px] rounded-[8px] text-white font-medium hover:opacity-80 transition-all duration-100 ease-linear" onClick={showModal}>
              <icons.plus></icons.plus>
              <span>Tạo lớp học</span>
            </div>
            <Modal title="Thêm lớp học" open={isModalOpen} onOk={handleOk} onCancel={handleDelete}>
              <div className="form_group flex flex-col"> 
                <label htmlFor="">Tên lớp</label>
                <input type="text" name='className' placeholder='Nhập tên lớp' className='outline-none border border-[#000] rounded-[6px] px-[12px] py-[6px]' ref={inputRef}/>
              </div>
            </Modal>
            <div className="flex items-center gap-2 cursor-pointer  px-[20px] py-[10px] rounded-[8px] filter_btn bg-white hover:bg-[rgba(241,245,249)] transition-all duration-100 ease-linear">
              <icons.filter className='text-[20px]'></icons.filter>
              <span>Bộ lọc</span>
            </div>
        </div>
      </div>
      <div className="classes flex items-center flex-wrap  ml-[-24px] mt-[30px] gap-y-[24px]">
        {
          data.data.map((item) => (
            <div className="class px-[20px] py-[12px] bg-[#eeeeee] rounded-[8px] h-[84px] w-[calc((100%/6)-24px)] ml-[24px] flex flex-col justify-between" key={item.id} >
                <div className="flex items-center justify-between">
                  <Link className="class_name whitespace-nowrap font-medium text-[#1e293b] text-[14px]" to={`/vi/admin/student/classroom-details/${item.id}`}>
                    Lớp : {" "}
                  {item.className}
                  </Link>
                </div>
                <div className="flex items-center justify-between">
                <div className="group" >
                    <Popover  trigger="click" content={<Content class_id={item.id} class_name={ item.className} />} placement='bottom'  >
                      <icons.threedot className='cursor-pointer w-[20px] rounded-full h-[20px]  group-hover:bg-[#a0a5b4] '></icons.threedot>
                    </Popover>

                  </div>
                  <Link className="flex items-center text-[#647488] text-[12px] mt-auto  px-2 py-1 rounded-lg ml-auto hover:text-[#2c67f5]" to={`/vi/admin/student/manage-student/${item.id}`}>
                    <icons.arrowright></icons.arrowright>
                    <span>Quản lí lớp</span>
                  </Link>
                </div>
            </div>
          ))
        }
      </div>
     
    </ManageRoomStyled>
  )
}
const ManageRoomStyled = styled.div`
  .filter_btn{
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`
export default ManageRoom
