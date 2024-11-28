import React from 'react'
import icons from '../../utils/icons';
import { Popover, Modal } from 'antd';
import styled from 'styled-components';
const Question = () => {
  return (
    <QuestionStyled >
        <div className="question_item  " >
        <div className="flex items-center">            
        <Popover title="Thêm câu hỏi và đáp án" placement='top'>
            <div className="border rounded-full cursor-pointer mr-3" onClick={() => {
                questionRef.current.classList.toggle("is_block");
            }}>
                <icons.arrowdown className='text-[16px] text-[#b0b1bb]'></icons.arrowdown>
            </div>
        </Popover>
        <div className="question_number w-6 "><span className='font-bold'>1.</span></div>
        <div className="flex items-center gap-3">
            <button type='button' className=" question_key rounded-[50%] h-[35px] w-[35px] border flex items-center justify-center uppercase">a</button>
            <button type='button' className=" question_key rounded-[50%] h-[35px] w-[35px] border flex items-center justify-center uppercase">b</button>
            <button type='button' className=" question_key rounded-[50%] h-[35px] w-[35px] border flex items-center justify-center uppercase">c</button>
            <button type='button' className=" question_key rounded-[50%] h-[35px] w-[35px] border flex items-center justify-center uppercase">d</button>
            
        </div>
        </div>
        <div className="relative  pl-[16px] hidden" ref={questionRef}>
        <div className="flex">
            <span className='text-[14px] font-bold mr-1'>Câu hỏi :</span> 
            <input type="text"  className='text-[14px] outline-none border-b-2 ' />
            <div className="" onClick={showModal}>
            <icons.view className='text-slate-400 cursor-pointer'></icons.view>
            </div>
            <Modal title="Câu hỏi" open={isModalOpen} onOk={handleOk} onCancel={handleDelete}>
            <div className="form_group flex flex-col"> 
            <input type="text"  value={"Cau hoi 1"} className='outline-none border border-[#000] rounded-[6px] px-[12px] py-[6px] ' onChange={() => {
                console.log('gg');
            }}/>
            </div>
        </Modal>
        </div>
        <div className="">
            <div className="flex items-center ">
            <span className='text-[12px] font-bold mr-2'>A:</span> 
            <input type="text"  className='text-[14px] outline-none border-b-2 ' />
            </div>
            <div className="flex items-center">
            <span className='text-[12px] font-bold mr-2'>B:</span> 
            <input type="text"  className='text-[14px] outline-none border-b-2 ' />
            </div>
            <div className="flex items-center">
            <span className='text-[12px] font-bold mr-2'>C:</span> 
            <input type="text"  className='text-[14px] outline-none border-b-2 ' />
            </div>
            <div className="flex items-center">
            <span className='text-[12px] font-bold mr-2'>D:</span> 
            <input type="text"  className='text-[14px] outline-none border-b-2 ' />
            </div>
            
        </div>
        <div className="absolute w-[2px] h-full bg-slate-400 left-[4px] top-0"> </div>
        </div>
        </div>
    </QuestionStyled>
  )
}
const QuestionStyled = styled.div`
    
`
export default Question
