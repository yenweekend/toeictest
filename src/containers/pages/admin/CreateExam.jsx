import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import {roundUpToMultipleOfFour} from "../../../helpers/functions";
import {errorToastify, warnToastify, successToastify} from "../../../helpers/Toastify";
import icons from '../../../utils/icons';
import { ViewQuestion } from '../../components';
import { useNavigate, useNavigation, useParams } from 'react-router-dom';
import {createquestion} from "../../../api/teacher/class"
import { useMutation } from '@tanstack/react-query';
const CreateExam = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [examcode, setExamCode ] = useState(null);
  const [numberQuestion, setNumberQuestion] = useState(8);
  const [questions, setQuestions] = useState([]);
  const numberQuestionEachColumn = useMemo(() => {
    const rs = roundUpToMultipleOfFour(numberQuestion);
    const distance = rs / 4;
    return distance < 4 ? 4 : distance;
  },[numberQuestion]);
  const inputNumberRef = useRef();
  const mutation = useMutation({
    mutationFn: createquestion,
    onSuccess : (data) => {
      console.log(data.data)
      queryClient.invalidateQueries({ queryKey: ['questiontest'] })

    },
    onError : (error) => {
      console.log(error)
    }
  });
  const handleCreateTest = useCallback(() => {
    const formData = {
      testId: examcode, 
      questions : questions
    }
    const flag = questions.every(question => question.content.trim() !== '');
    if(flag)
    {
      mutation.mutate(formData);
      successToastify("Thêm câu hỏi vào đề thành công");
      navigate("/vi/admin/student/manage-classroom/");
    }else
    {
      warnToastify("Hãy điền hết câu hỏi");
    }
  },[questions]);
  useEffect(() => {
    const arr = [];
    for(let i = 0 ; i < numberQuestion; i++)
    {
      arr.push({
        id: i + 1, // render ui 
        content:"",
        answers: [
          {
            key:"a",
            content:"",
            isCorrect:false,
          },
          {
            key:"b",
            content:"",
            isCorrect:false,
          },
          {
            key:"c",
            content:"",
            isCorrect:false,
          },
          {
            key:"d",
            content:"",
            isCorrect:false,
          },
        ]
      })
    }
    setQuestions(arr);
  },[]);
  useEffect(() => {
    const arr = [];
    let number;
    let prevQuestionsLength ;
    if(questions.length === 0)
    {
      prevQuestionsLength  = numberQuestion;
    }else
    {
      prevQuestionsLength = questions.length
    }
    let rs = numberQuestion - prevQuestionsLength; // 10 - 20; 4 - 7 
    console.log(rs);
    console.log(rs > 0);
    if(rs > 0)
    {
      for(let i = 0; i< rs; i++)
        {
          arr.push({
            id: prevQuestionsLength + i, // render ui 
            content:"",
            answers: [
              {
                key:"a",
                content:"",
                isCorrect:false,
              },
              {
                key:"b",
                content:"",
                isCorrect:false,
              },
              {
                key:"c",
                content:"",
                isCorrect:false,
              },
              {
                key:"d",
                content:"",
                isCorrect:false,
              },
            ]
          })
        }
      setQuestions((state) => [...state,...arr]);
    }else
    {
      rs *= -1;
      setQuestions(state => state.splice(0,numberQuestion))
    }
  },[numberQuestion]);
  
  useEffect(() => {
    console.log(questions);
  },[questions]);
  return (
     <CreateExamStlyed >
      <div className=" h-full mx-auto  ">
        <div className="title text-[20px] capitalize font-medium">Tạo đề thủ công</div>
        <div className="bg-white p-4">
          <div className="flex items-center flex-wrap gap-[24px]">
            <div className="form_input ">
              <label htmlFor="exam_code" className='title text-[14px] font-medium' >Mã đề</label>
              <input type="text" placeholder='Nhập mã đề' id='exam_code' className='outline-none border rounded-[6px] px-[12px] py-[9px]' onChange={(e) => {
                setExamCode(e.target.value)
              }}/>
            </div>
          </div>
          <div className="exam_box mt-3 border rounded-[6px] p-3">
            <div className="flex items-center">
              <p className='text-[16px] font-semibold title mr-6'>Phần trắc nghiệm:</p>
              <div className="flex  mr-8 items-center gap-3">
                <span className='text-[14px] font-medium title'>Số lượng câu hỏi</span>
                <input type="text" className='outline-none border rounded-[6px] px-[12px] py-[9px] w-[64px]' ref={inputNumberRef} defaultValue={numberQuestion}/>
                <button className='bg_color text-white px-4 py-1 rounded-[10px] cursor-pointer' onClick={() => {
                  if(inputNumberRef.current.value.length > 0 &&   isNaN(Number(inputNumberRef.current.value)))
                  {1
                    errorToastify("Hãy nhập 1 chữ số !");
                    return 1;
                  }
                  if(Number(inputNumberRef.current.value) > 100)
                  {
                    warnToastify("Tối đa 100 câu hỏi");
                    return 1;
                  } else if (Number(inputNumberRef.current.value) <  10)
                  {
                    warnToastify("Tối đa 10 câu hỏi");
                    return 1;

                  }
                  
                  let number = Number(inputNumberRef.current.value);
                  setNumberQuestion(number)
                  
                }}>OK</button>
              </div>
      
            </div>
          </div>
          <div className="mt-5 mb-6">
            <div className={`grid grid-flow-col grid-cols-4  gap-4`}  style={{
                gridTemplateRows: `repeat(${numberQuestionEachColumn}, minmax(0, 1fr))`,
              }}>
              {questions?.map((ques, index) => (
                  <>
                    <div className="question_item  " key={index}>
                            <div className="flex items-center">
                              <div className="question_number w-6 mr-2"><span>{ques.id}</span></div>
                              <div className="flex items-center gap-3">
                                {
                                  ques.answers.map((c) => (<button type='button' key={`${index}_${c.key}`} className={`question_key rounded-[50%] h-[35px] w-[35px] border flex items-center justify-center uppercase ${c.isCorrect ? "bg-[#1e40ae] text-white" : "" }`}>{c.key}</button>))
                                }
                                
                                {/* <Popover title="Thêm câu hỏi và đáp án" placement='right'>
                                  <div className="border rounded-full cursor-pointer">
                                    <icons.arrowdown className='text-[16px] text-[#b0b1bb]'></icons.arrowdown>
                                  </div>
                                </Popover> */}
                                <ViewQuestion data={ques} setQuestions={setQuestions}/>

                                
                              </div>
                            </div>
                    </div>
                  </>
                
              ))}
            </div>
          </div>
          <div className="flex justify-end w-full ">
            <button className='px-5 py-2 rounded-full bg-[#1e40ae] text-white text-[14px]' onClick={handleCreateTest}>Tạo đề</button>
          </div>
        </div>
      </div>
     </CreateExamStlyed>
  )
}
const CreateExamStlyed = styled.div`
    padding-bottom: 20px;
    max-height: 600px;
    overflow-y: auto;
    ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  /* Hide scrollbar for IE, Edge and Firefox */
    .form_input{
      display: flex;
      flex-direction: column;
      width: calc((100% / 2 - 12px));
    }
    .exam_box{
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
   
    .key{
      border: none !important;
      background-color: var(--bg-color);
      color: #fff;
    }
    .question_key{
      transition: all .1s linear;
    }
    .question_key:hover{
      background-color: var(--bg-color);
      color: white;
    }
    .chosen{
      background-color: var(--bg-color) !important;
      color: white !important;
    }
    .is_block{
      display: block;
      transition: all .5s linear ;
    }
`
export default CreateExam
