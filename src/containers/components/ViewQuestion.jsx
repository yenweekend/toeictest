import React, {useCallback, useEffect, useRef, useState} from 'react'
import icons from '../../utils/icons';
import Modal from 'antd/es/modal/Modal';
import { errorToastify, warnToastify } from '../../helpers/Toastify';
import styled from 'styled-components';
const ViewQuestion = ({data, setQuestions}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [input, setInput] = useState(data.content);
    const [answers, setAnswers] = useState(data.choice);
    const keyRefs = useRef([]);
    const addToRefs = useCallback((el) => {
      if (el && !keyRefs.current.includes(el)) {
        keyRefs.current.push(el);
      }
    });
    const showModal = () => {
        setIsModalOpen(true);
      };
    const handleOk = () => {
      if(answers.every((k,idx) => !k.isCorrect  ))
      {
          warnToastify("Hãy chọn 1 đáp án đúng !")
          return 1;
      }
      if(input.length === 0)
      {
        warnToastify("Chưa có câu hỏi!")
        return 1;
      }
      setQuestions((state) => {
        return state.map((q) => (q.id === data.id ? { ...q, ["content"]: input , choice: answers} : q))
      })
      setIsModalOpen(false);

    };
    const handleDelete = () => {
      setIsModalOpen(false);
    };
    const handleChange = (e) => {
      setAnswers(() => {
          return answers.map((as,idx) => as.key === e.target.name ? {...as,["content"]: e.target.value} : as)
      });
    }
    const handleCorrect = (as) => {
      
    }
    const handleKey = useCallback((e, as) => {
      const element = e.target;
      setAnswers((state) => state.map((item,idx) => as.key === item.key ? {...item, isCorrect : true} : {...item, isCorrect : false} ))
      keyRefs.current.forEach((keyRef) =>  keyRef.classList.contains("correct_key") ?  keyRef.classList.remove("correct_key"): ""  );
      element.classList.add("correct_key");
    })
  return (
        <ViewQuestionStyled>
                    <div className="" onClick={showModal}>
                      <icons.view className='text-slate-400 cursor-pointer text-[12px]'></icons.view>
                    </div>
                    <Modal title={`Câu số ${data.id }`} open={isModalOpen} onOk={handleOk} onCancel={handleDelete}>
                      <div className="relative  pl-[16px] " >
                  <div className="w-full flex mb-5">
                    <span className='text-[14px] font-bold mr-1 '>Câu hỏi :</span> 
                    <input type="text"  className='text-[14px] outline-none border-b-2 block flex-auto' onChange={(e) => {
                      setInput(e.target.value);
                    }}
                    value={input}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    {
                        data.choice.map((as, index) => (
                            <div className="" key={as.key}  >
                                <div className="w-full group ">
                                    <button type='button' className={`hover:translate-y-[-3px] transition-all ease-linear duration-100 text-[12px] font-bold mr-2 uppercase w-8 h-8 rounded-full border hover:bg-[#1e40ae] hover:text-white ${as.isCorrect ? 'correct_key' : ' '} `} 
                                    ref={addToRefs}
                                    onClick={(e) => handleKey(e,as)}
                                    >{as.key}
                                    </button> 
                                    <input type="text"  className='text-[14px] outline-none border-b-2' onChange={handleChange} defaultValue={as.content} name={as.key} />
                                </div>    
                            </div>      
                        ))
                    }

                  </div>
                  <div className="absolute w-[2px] h-full bg-slate-400 left-[4px] top-0"> </div>
                </div>
                    </Modal>

        </ViewQuestionStyled>
    
  )
}
const ViewQuestionStyled = styled.div`


`
export default ViewQuestion
