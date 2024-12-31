import React,{useState} from 'react'
import styled from 'styled-components'
import icons from '../../../utils/icons';
import { Pagination, Select ,Modal, Radio, Space} from 'antd';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {getRequestMembership} from "../../../api/teacher/membership"
import {Loading} from "../../components/index"
import timestamp from '../../../helpers/timestamp';
import {putRequest} from "../../../api/teacher/membership";
const fakeData =  [
    {
        id: 1,
        name: "Nguyen Van A",
        email: "abc@gmail.com",
        requestDay: "07:00:00 AM 20/11/2024",
        state: "ongo"
    },
    {
        id: 2,
        name: "Tran Thi B",
        email: "tranb@gmail.com",
        requestDay: "08:30:00 AM 20/11/2024",
        state: "disapproved"
    },
    {
        id: 3,
        name: "Le Van C",
        email: "levanc@gmail.com",
        requestDay: "09:15:00 AM 20/11/2024",
        state: "approved"
    },
    {
        id: 4,
        name: "Pham Minh D",
        email: "pham.minh@gmail.com",
        requestDay: "10:45:00 AM 20/11/2024",
        state: "ongo"
    },
    {
        id: 5,
        name: "Hoang Anh E",
        email: "hoange@gmail.com",
        requestDay: "11:20:00 AM 20/11/2024",
        state: "disapproved"
    },
    {
        id: 6,
        name: "Nguyen Thi F",
        email: "nguyenf@gmail.com",
        requestDay: "01:30:00 PM 20/11/2024",
        state: "approved"
    }
];
const options = [
    // {
    //     label:"Từ chối",
    //     value: "disapproved"
    // },
    {
        label:"Duyệt vào lớp",
        value: "approve"
    },
]

const ManageStudent = () => {
    const queryClient = useQueryClient();
    const params = useParams();
    const [openModalId, setOpenModalId] = useState(null);
    const [membershipId, setMembershipId] = useState(null);

    const [selectedOption, setSelectedOption] = useState("approve");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);

    // const [data,setData] = useState(fakeData.slice(0,3)); 
    const showModal = (id) => {
        setOpenModalId(id);
    };
    const handleOk = (membershipId) => {
        mutation.mutate(membershipId);
        setOpenModalId(null);
    };

    const handleCancel = () => {
        setOpenModalId(null);
    };
    const onChange = (value) => {
        console.log(`selected ${value}`);
      };

    const handleChangePagination = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize)
        // const startIndex = (page - 1) * pageSize;
        // const currentData = fakeData.slice(startIndex, startIndex + pageSize);
        // setData(currentData);
    }
    const onRadioChange = (value) => {
        setSelectedOption(value);
    };
    const { isPending, isError, data, error } = useQuery({ 
        queryKey: ['membership', params.classroomId],
        queryFn: () => getRequestMembership(params.classroomId) ,
        enabled: !!params.classroomId
    })
    const mutation = useMutation({
        mutationFn: putRequest,
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({queryKey: ['membership']})
        } ,
    onError : (error) => {
      console.log(error)
    }
    })
    if (isPending) {
        return <Loading></Loading>
      }
      if (isError) {
        return <span>Error: {error.message}</span>
      }
      const currentData = data.data.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      );
    //   console.log(data.data);
  return (
    <ManageStudentStyled>
         
        <h1 className="title uppercase font-bold text-[20px]">quản lí học sinh</h1>
    
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3 filter_otp mt-3'>
            <div>
            <Select
            style={{
                width: 200,
              }}
            showSearch
            placeholder="Lọc theo"
            optionFilterProp="label"
            onChange={onChange}
            options={[
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
            ]}
  />
            </div>
          
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
                <div className='whitespace-nowrap  font-bold  w-[20%]'>Thông tin học sinh</div>
                <div className='whitespace-nowrap  font-bold  w-[20%]'>Email</div>
                <div className='whitespace-nowrap  font-bold  flex-none w-[15%] '>Trạng thái</div>
                <div className='whitespace-nowrap  font-bold  flex-none w-[25%]'>Thời gian gửi yêu cầu</div>
                <div className='whitespace-nowrap  font-bold   flex-none w-[10%]'>Lớp tham gia</div>
                <div className='whitespace-nowrap  font-bold  flex-auto text-center'>Thao tác</div>
            </div>
            {
                currentData?.map((student) => (
                    <>
                        <div className='flex items-center  py-4 px-3 product' key={student.id}>
                            <label className='flex-none w-[5%]'>
                                <input
                                    type="checkbox"
                                    className="hidden input_checkbox"
                                ></input>
                                <div className="input_filter relative mr-2">
                                    <div className="absolute "></div>
                                </div>
                            </label>
                            <div className=' font-bold  w-[20%] flex items-center gap-2 '>
                                <div className='w-8 h-8 flex-shrink-0 rounded-full overflow-hidden'>
                                    <img src='https://cdn.pixabay.com/photo/2024/07/08/05/41/girl-8880144_640.png' className='w-full h-full object-cover'></img>
                                </div>
                                <div className='ellipsis_2_lines text-[14px]'>{student.studentInfo.userName}</div>
                            </div>
                            <div className='   w-[20%] flex items-center gap-2'>
                            {student.studentInfo.email}
                            </div>
                            <div className='  flex-none w-[15%]'>
                                {
                                    student.isApproved  ? <><span className={`whitespace-nowrap  font-bold text-[#2bc38d] flex items-center gap-2  w-fit px-2 py-1  rounded-[99px] bg-customGreen`}>
                                    <span className="dot w-2 h-2 rounded-[50%] bg-[#2bc38d] "></span>
                                    <span className='text-[12px]'>
                                        Đã duyệt
                                    </span>
                                </span></> : <span className='whitespace-nowrap  font-bold text-[#e5ac1a] flex items-center gap-2 bg-customYellow w-fit px-2 py-1  rounded-[99px]'>
                                    <span className="dot w-2 h-2 rounded-[50%] bg-[#e5ac1a] "></span>
                                    <span className='text-[12px]'>
                                        Chờ phê duyệt
                                    </span>
                                </span> 
                                }
                                {/* <span className='whitespace-nowrap  font-bold text-[#c73231] flex items-center gap-2 bg-customRed w-fit px-2 py-1  rounded-[99px]'>
                                    <span className="dot w-2 h-2 rounded-[50%] bg-[#c73231] "></span>
                                    <span className='text-[12px]'>
                                        Đã từ chối
                                    </span>
                                </span> */}
                            </div>
                            <div className='whitespace-nowrap    flex-none w-[25%] text-[14px]'>{timestamp(student.sendAt)}</div>
                            <div className='whitespace-nowrap     flex-none w-[10%]'>{student.className}</div>
                            <div className='whitespace-nowrap    flex-auto text-center'>
                                    <div className='text-[24px] cursor-pointer text-[#9fa4b1] pr-3 items-center w-full flex justify-center' onClick={() => showModal(student.id)}>
                                        <icons.view className='text-black text-[14px]'></icons.view>
                                    </div>                     
                                    <Modal title={`Thông tin : ${student.studentInfo.userName}`} open={openModalId === student.id} onOk={() => {
                                        handleOk(student.id)
                                    }} onCancel={handleCancel} >
                                        <Radio.Group
                                            onChange={(e) => onRadioChange( e.target.value)}
                                            value={selectedOption}                                           
                                        >
                                            <Space direction='vertical'>
                                                {options.map((state) => (
                                                    <Radio key={state.value} value={state.value}>
                                                            {state.label}   
                                                    </Radio>
                                                ))}

                                            </Space>
                                        </Radio.Group>
                                       
                                    </Modal>
                            </div>
                        </div>   
                    </>
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
  
    </ManageStudentStyled>
  )
}
const ManageStudentStyled = styled.div`
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
export default ManageStudent
