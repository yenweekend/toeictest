import React, { useMemo } from 'react'
import icons from '../../../utils/icons';
import {Logo, Loading} from "../../components";
import { Progress } from 'antd';
import { useParams } from 'react-router-dom';
import { viewResult } from '../../../api/student/test';
import { useMutation } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
const conicColors = {
    '0%': '#87d068',
    '100%': '#7ce0a2',
  };
const ViewResult = () => {
    const params = useParams();
    const { isPending, isError, data, error } = useQuery({ 
        queryKey: ['viewresult', params.attemptId],
        queryFn: () => viewResult(params.attemptId) ,
        enabled: !!params.attemptId
    })
    const result = useMemo(() => {
      let correctCount = 0;
      let wrongCount = 0;
      if(data)
      {
        data.data.result.forEach(item => {
            const correctAnswer = item.question.answers.find(answer => answer.isCorrect);
            if (correctAnswer && correctAnswer.answerId === item.studentChoiceId) {
                correctCount++;
            } else {
                wrongCount++;
            }
        });

        return { correctCount, wrongCount };
      }
    },[data])
    if (isPending) {
        return <Loading></Loading>
      }
      if (isError) {
        return <span>Error: {error.message}</span>
      }
      console.log(data.data);
  return (
    <div className=" w-full overflow-y-auto h-[74vh] no-scrollbar">   
 
    <div className="   flex flex-col">
        <div className="w-full bg-[#f8f9fb]  flex-auto relative overflow-hidden">
          <div className=" overflow-y-scroll h-[calc(100vh-64px)]  no-scrollbar">
           
            {/* show result */}
            <div className=" shadow-round p-[20px] mx-auto rounded-2xl  bg-white  mt-[80px] max-w-[1022px] flex gap-3 w-[756px]">
    <div className="progress flex-auto">
      <div className="flex items-center gap-3 justify-center px-4">
        <div className="flex items-center justify-center flex-auto relative ">

          <Progress type="circle" percent={(result.correctCount / data.data.result.length) * 100} format={() => `${(result.correctCount / data.data.result.length)* 100}%`}  size={160} strokeWidth={12} strokeColor={conicColors} />
          <div className="box w-[90px] h-[90px] rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-0"></div>
        </div>
        <div className="flex flex-col gap-3 flex-auto ">
          {/* <div className="total_time p-3 mx-5 rounded-full bg-[#f5f5f5] flex gap-3 items-center">
            <span className='text-[14px] text-[#535353]'>Total Time:</span>
            <span className='font-bold text-[16px] text-[#000]'>23s</span>
          </div> */}
          <div className="total_question p-3 mx-5 rounded-full bg-[#f5f5f5] flex gap-3 items-center">
            <span className='text-[14px] text-[#535353]'>Total question:</span>
            <span className='font-bold text-[16px] text-[#000]'>{data.data.result.length}</span>
          </div>
        </div>  
      </div>
      <div className="w-full flex items-center gap-4 px-4 mt-5">
        <button type="button" className="flex-auto review text-[16px] p-3 rounded-full border border-[#000] ">Review</button>
        <button type="button" className="flex-auto practice text-[16px] p-3 rounded-full border border-[#000]">Practice</button>
      </div>
    </div>
    <div className="detailed_result p-4 rounded-[12px] bg-[#f5f5f5] w-[298px]">
      <div className="quote text-center capitalize mb-2">don't get frustrated, keep practicing and you can get 100% too</div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center shadow-round bg-white rounded-[12px] p-3 justify-between">
            <div className='text-[14px] relative pl-4 w-[50%]'>Đúng
              <div className="absolute w-[8px] h-[8px] rounded-full bg-[#4ad071] top-[50%] translate-y-[-50%] left-0"></div>
            </div>
            <div className="flex-auto text-center relative pl-3">
              <span className='text-[16px] text-[#4ad071] font-bold '>{result?.correctCount}</span>
              <div className="absolute h-full w-[0.6px] bg-black left-0 top-0"></div>
            </div>
        </div>
        <div className="flex items-center shadow-round bg-white rounded-[12px] p-3 justify-between">
            <div className='text-[14px] relative pl-4 w-[50%]'>Sai
              <div className="absolute w-[8px] h-[8px] rounded-full bg-[#df5e62] top-[50%] translate-y-[-50%] left-0"></div>
            </div>
            <div className="flex-auto text-center relative pl-3">
              <span className='text-[16px] text-[#df5e62] font-bold '>{result?.wrongCount}</span>
              <div className="absolute h-full w-[0.6px] bg-black left-0 top-0"></div>
            </div>
        </div>
        {/* <div className="flex items-center shadow-round bg-white rounded-[12px] p-3 justify-between">
            <div className='text-[14px] relative pl-4 w-[50%]'>Chưa trả lời
              <div className="absolute w-[8px] h-[8px] rounded-full bg-[#fcc865] top-[50%] translate-y-[-50%] left-0"></div>
            </div>
            <div className="flex-auto text-center relative pl-3">
              <span className='text-[16px] text-[#fcc865] font-bold '>6</span>
              <div className="absolute h-full w-[0.6px] bg-black left-0 top-0"></div>
            </div>
        </div> */}
      </div>
    </div>
  </div>
  {
        <div className="mb-[200px]"> 
        {
        data.data.result.map((question, index) => (<>
          <div className=" shadow-round p-[20px] mx-auto rounded-2xl  bg-white  mt-[80px] max-w-[1022px] flex flex-col gap-3 h-[308px]" key={question.question.id}>
          
                <p className="number font-bold text-[16px]">Câu hỏi {index + 1}.</p>
                <p className="questions text-fourth text-[16px]">
                    {question.question.content}
                </p>
                <div className="flex flex-col gap-3">
                  {question.question.answers.map((choice, index) => {
                      return (
                        <div className={`flex items-center quiz_key_view relative pl-10  cursor-pointer py-2 rounded-xl ${choice.isChosen || choice.isCorrect ? "bg-[#e0e0e0]" : "opacity-[0.3]" }`} key={choice.key} >
                          <label htmlFor={choice.answerId} className='cursor-pointer block w-full'>{choice.content}
                            <input type="radio" disabled  name={"key"} id={choice.answerId}/>
                          </label>
                        
                          <div className={`
                            checkmark p-1 ${choice.isCorrect && choice.answerId === question.studentChoiceId ? "true" :  choice.isCorrect && choice.answerId !== question.studentChoiceId ?"true" :  !choice.isCorrect && choice.answerId === question.studentChoiceId ? "wrong" :"hidden"} `} >
                            {
                             
                              choice.isCorrect && choice.answerId === question.studentChoiceId ?  <icons.check className='text-white text-[18px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '></icons.check> :  choice.isCorrect && choice.answerId !== question.studentChoiceId ? <icons.check className='text-white text-[18px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '></icons.check> :  !choice.isCorrect && choice.answerId === question.studentChoiceId ? <icons.close className='text-white text-[18px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'></icons.close> :""
                            }
                          </div>
                        </div>
                      )
                  })}
                </div>
          </div>
          </>))
        }
        </div>
  }
          </div>
            
            {/* <div className={`footer absolute h-[165px] left-0 bottom-0 right-0 p-6 w-full z-50 shadow-round transition-all ease-linear duration-150 ${!disabled ? "" : "translate-y-[100%]" }`}>
                <div className="">Câu hỏi 1-{fakeData.length}</div>
                <div className="note flex items-center gap-5 ">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full true"></div> 
                        <span>4 Đã chọn</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full left"></div> 
                        <span>16 Chưa trả lời</span>
                    </div>
                </div>
                <div className="questions flex gap-3">
                    {
                      doneQuestion?.map((quiz, index) => (
                        <button type="button" key={quiz.id} className={`w-10 h-10 rounded-full question text-[16px] font-bold  hover:translate-y-[-2px] duration-200 transition-all ease-linear 
                          ${quiz.isDone || currentQuestion.id === quiz.id ?"current" : ""}
                          `
                        } onClick={() => {
                          setCurrentQuestion(quiz);
                        }}>
                            {index + 1}
                        </button>
                      ))
                    }
                </div>
                {
                   <div className="absolute p-3 font-bold bg-[#1e40ae] text-white text-center text-[14px] rounded-full bottom-[100%] right-[100px] shadow-round cursor-pointer hover:opacity-80 transition-all ease-linear duration-150 " onClick={handleSubmit}>View Results</div> 
                }
                
                <div className={`absolute left-[50%] translate-x-[-50%] w-10 h-10 rounded-full bg-[#1e40ae] flex items-center justify-center ${!disabled ? "bottom-[88%]" : "bottom-[100%]"} cursor-pointer`} onClick={() => {
                  setDisabled((state) => !state)
                }}>
                  {
                    !disabled ? <icons.arrowdown className='text-white'></icons.arrowdown> : <icons.arrowup className='text-white text-[20px]'></icons.arrowup>
                  }
                </div>
            </div> */}
        </div>

    </div>
  </div>
  )
}

export default ViewResult
