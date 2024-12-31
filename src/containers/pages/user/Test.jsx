import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import {Logo, Loading} from "../../components";
import icons from '../../../utils/icons';
import { Progress } from 'antd';
import { doTest } from '../../../api/student/test';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { submitTest } from '../../../api/student/test';
import {warnToastify} from "../../../helpers/Toastify"
import
{ Statistic }
from
"antd"
;
const { Countdown } = Statistic;

  import { useMutation } from '@tanstack/react-query';
const goodMark = {
    '0%': '#4ad071',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
  };
const fakeData = [
    {
      id: "q1",
      question: "What is the capital of France?",
      choices: [
        { key: "a", content: "Paris", isCorrect: true },
        { key: "b", content: "London", isCorrect: false },
        { key: "c", content: "Berlin", isCorrect: false },
        { key: "d", content: "Madrid", isCorrect: false },
      ],
    },
    {
      id: "q2",
      question: "What is 2 + 2?",
      choices: [
        { key: "a", content: "3", isCorrect: false },
        { key: "b", content: "4", isCorrect: true },
        { key: "c", content: "5", isCorrect: false },
        { key: "d", content: "6", isCorrect: false },
      ],
    },
    {
      id: "q3",
      question: "Which planet is known as the Red Planet?",
      choices: [
        { key: "a", content: "Earth", isCorrect: false },
        { key: "b", content: "Mars", isCorrect: true },
        { key: "c", content: "Venus", isCorrect: false },
        { key: "d", content: "Jupiter", isCorrect: false },
      ],
    },
    {
      id: "q4",
      question: "What is the largest ocean on Earth?",
      choices: [
        { key: "a", content: "Atlantic Ocean", isCorrect: false },
        { key: "b", content: "Indian Ocean", isCorrect: false },
        { key: "c", content: "Arctic Ocean", isCorrect: false },
        { key: "d", content: "Pacific Ocean", isCorrect: true },
      ],
    },
    {
      id: "q5",
      question: "Who wrote 'Hamlet'?",
      choices: [
        { key: "a", content: "Charles Dickens", isCorrect: false },
        { key: "b", content: "William Shakespeare", isCorrect: true },
        { key: "c", content: "Jane Austen", isCorrect: false },
        { key: "d", content: "Mark Twain", isCorrect: false },
      ],
    },
    {
      id: "q6",
      question: "What is the chemical symbol for water?",
      choices: [
        { key: "a", content: "H2O", isCorrect: true },
        { key: "b", content: "O2", isCorrect: false },
        { key: "c", content: "CO2", isCorrect: false },
        { key: "d", content: "NaCl", isCorrect: false },
      ],
    },
    {
      id: "q7",
      question: "How many continents are there?",
      choices: [
        { key: "a", content: "5", isCorrect: false },
        { key: "b", content: "6", isCorrect: false },
        { key: "c", content: "7", isCorrect: true },
        { key: "d", content: "8", isCorrect: false },
      ],
    },
    {
      id: "q8",
      question: "What is the smallest prime number?",
      choices: [
        { key: "a", content: "1", isCorrect: false },
        { key: "b", content: "2", isCorrect: true },
        { key: "c", content: "3", isCorrect: false },
        { key: "d", content: "5", isCorrect: false },
      ],
    },
    {
      id: "q9",
      question: "What is the speed of light?",
      choices: [
        { key: "a", content: "300,000 km/s", isCorrect: true },
        { key: "b", content: "150,000 km/s", isCorrect: false },
        { key: "c", content: "1,000 km/s", isCorrect: false },
        { key: "d", content: "10,000 km/s", isCorrect: false },
      ],
    },
    {
      id: "q10",
      question: "What is the boiling point of water in Celsius?",
      choices: [
        { key: "a", content: "90°C", isCorrect: false },
        { key: "b", content: "100°C", isCorrect: true },
        { key: "c", content: "110°C", isCorrect: false },
        { key: "d", content: "120°C", isCorrect: false },
      ],
    },
    {
      id: "q11",
      question: "Who painted the Mona Lisa?",
      choices: [
        { key: "a", content: "Vincent van Gogh", isCorrect: false },
        { key: "b", content: "Leonardo da Vinci", isCorrect: true },
        { key: "c", content: "Pablo Picasso", isCorrect: false },
        { key: "d", content: "Claude Monet", isCorrect: false },
      ],
    },
    {
      id: "q12",
      question: "What is the capital of Japan?",
      choices: [
        { key: "a", content: "Kyoto", isCorrect: false },
        { key: "b", content: "Osaka", isCorrect: false },
        { key: "c", content: "Tokyo", isCorrect: true },
        { key: "d", content: "Nagoya", isCorrect: false },
      ],
    },
    {
      id: "q13",
      question: "Which gas do plants use during photosynthesis?",
      choices: [
        { key: "a", content: "Oxygen", isCorrect: false },
        { key: "b", content: "Carbon Dioxide", isCorrect: true },
        { key: "c", content: "Nitrogen", isCorrect: false },
        { key: "d", content: "Hydrogen", isCorrect: false },
      ],
    },
    {
      id: "q14",
      question: "Which is the largest mammal?",
      choices: [
        { key: "a", content: "Elephant", isCorrect: false },
        { key: "b", content: "Blue Whale", isCorrect: true },
        { key: "c", content: "Giraffe", isCorrect: false },
        { key: "d", content: "Hippopotamus", isCorrect: false },
      ],
    },
    {
      id: "q15",
      question: "Who developed the theory of relativity?",
      choices: [
        { key: "a", content: "Isaac Newton", isCorrect: false },
        { key: "b", content: "Albert Einstein", isCorrect: true },
        { key: "c", content: "Galileo Galilei", isCorrect: false },
        { key: "d", content: "Nikola Tesla", isCorrect: false },
      ],
    },
    {
      id: "q16",
      question: "Which country is the largest by area?",
      choices: [
        { key: "a", content: "Canada", isCorrect: false },
        { key: "b", content: "USA", isCorrect: false },
        { key: "c", content: "Russia", isCorrect: true },
        { key: "d", content: "China", isCorrect: false },
      ],
    },
    {
      id: "q17",
      question: "Which metal is liquid at room temperature?",
      choices: [
        { key: "a", content: "Mercury", isCorrect: true },
        { key: "b", content: "Gold", isCorrect: false },
        { key: "c", content: "Silver", isCorrect: false },
        { key: "d", content: "Copper", isCorrect: false },
      ],
    },
    {
      id: "q18",
      question: "What is the main ingredient in guacamole?",
      choices: [
        { key: "a", content: "Tomato", isCorrect: false },
        { key: "b", content: "Avocado", isCorrect: true },
        { key: "c", content: "Lettuce", isCorrect: false },
        { key: "d", content: "Onion", isCorrect: false },
      ],
    },
    {
      id: "q19",
      question: "What is the square root of 64?",
      choices: [
        { key: "a", content: "6", isCorrect: false },
        { key: "b", content: "8", isCorrect: true },
        { key: "c", content: "7", isCorrect: false },
        { key: "d", content: "9", isCorrect: false },
      ],
    },
    {
      id: "q20",
      question: "Which language is primarily spoken in Brazil?",
      choices: [
        { key: "a", content: "Spanish", isCorrect: false },
        { key: "b", content: "Portuguese", isCorrect: true },
        { key: "c", content: "French", isCorrect: false },
        { key: "d", content: "English", isCorrect: false },
      ],
    },
  ];

const Test = () => {
  const navigate = useNavigate();
  const params = useParams();
  const checkmarkRef  = useRef([]);
  const quizRef  = useRef([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [studentAnswer, setStudentAnswer] = useState([]);
  const [doneQuestion, setDoneQuestion] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const onFinish = useCallback(()=> {
    const formData = {testId: params.testId, attemptDetails: studentAnswer};
    mutation.mutate(formData);
  },[studentAnswer]);
  const onChange = (val) => {
    if (typeof val === 'number' && 4.95 * 1000 < val && val < 5 * 1000) {
      console.log('changed!');
    }
  };
  // useEffect(() => {
  //   const rs = fakeData.map((quiz) => {
  //     return {...quiz, ["choices"]: quiz.choices.map((q) => {
  //       return {...q,isChosen:false};
  //     })}
  //   })
  //   setStudentAnswer(rs);
  // },[fakeData]);
  const handleChooseAnswer = useCallback((e,questionId, answerId) =>{
    setStudentAnswer((state) => {
      const existingAnswer = state.find(
        (answer) => answer.questionId === questionId
      );

      if (existingAnswer) {
        // Update the answer if the question exists
        return state.map((answer) =>
          answer.questionId === questionId
            ? { ...answer, answerId: answerId }
            : answer
        );
      } else {
        // Add a new question-answer pair if it doesn't exist
        return [...state, { questionId : questionId, answerId: answerId }];
      }
    });
    setDoneQuestion((prev) => {
      return prev.map((question) => question.id === questionId ? {...question, isDone: true}: question )
    })
 
  },[]);
  const addCheckmarkRefs = useCallback((el) => {
    if (el && !checkmarkRef.current.includes(el)) {
      checkmarkRef.current.push(el);
    }
  });
  const addQuizRefs = useCallback((el) => {
    if (el && !quizRef.current.includes(el)) {
      quizRef.current.push(el);
    }
  });

  const { isPending, isError, data, error } = useQuery({ 
    queryKey: ['submittest', params.testId],
    queryFn: () => doTest(params.testId) ,
    enabled: !!params.testId
    })
  const mutation = useMutation({
    mutationFn: submitTest,
    onSuccess : (data) => {
      console.log(data.data)
    },
    onError : (error) => {
      console.log(error.message)
    }
  });

  useEffect(() => {
    if(data)
    {
      setCurrentQuestion(data.data.questions[0]);
      const rs = data.data.questions.map((quiz) => {
        return {...quiz,isDone :false }
      })
      // console.log(rs);
      setDoneQuestion(rs);
    }
  },[data]);
  const calculateCompletionPercentage = useMemo(() => {
    const totalQuestions = doneQuestion.length;
    const completedQuestions = doneQuestion.filter((q) => q.isDone).length;
    return ((completedQuestions / totalQuestions) * 100).toFixed(2); // Returns percentage with two decimal places
  },[doneQuestion]);
  const handleSubmit = useCallback(() =>{
  
    const flag = doneQuestion.filter((quiz) => quiz.isDone === true );

    if (flag.length === data.data.questions.length)
    {
        const formData = {testId: params.testId, attemptDetails: studentAnswer};
        mutation.mutate(formData);
        navigate("/vi/student/classroom");
    }else
    {
    console.log("ko cho nộp bài");
    warnToastify("Hãy làm hết các câu hỏi trước khi nộp bài");
    return;
    }
  // if(flag || doneQuestion)
  // {
  //   console.log("ko cho nộp bài");
  //   warnToastify("Hãy làm hết các câu hỏi trước khi nộp bài");
  //   return;
  // }
  // const formData = {testId: params.testId, attemptDetails: studentAnswer};
  // mutation.mutate(formData);
},[studentAnswer])

if (isPending) {
    return <Loading></Loading>
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <TestStyled>
      <div className=" flex">   
        <div className="left_sidebar active h-screen flex flex-col items-center px-2 z-10">
            <div className="top">
                <Link className="logo mt-2" to={"/vi/student/classroom"}>  
                    <Logo width={160}></Logo>
                </Link>
            </div>
            <div className="flex items-center justify-between w-full  cursor-pointer">
                {/* <div className="flex items-center uppercase text-[16px] text-[#1e40ae]  ">
                    <icons.doublearrowdown></icons.doublearrowdown>
                    <span className='font-bold'>past simple tense</span>
                </div> */}
                {/* <Progress type="circle" percent={75} format={() => `3/4`}  size={60} strokeColor={conicColors} /> */}
            </div>
            <div className=" w-full mt-3 px-3">
                <div className="flex items-center justify-between bg-[#f2f6ff] px-2 py-2 rounded-full cursor-pointer">
                    <span className='font-bold capitalize'>{data.data.name}</span>
                    <div className="progress w-[52px] h-[24px]  border-2 border-[#828282] rounded-xl flex items-center justify-center font-bold  text-[#828282]">
                        {calculateCompletionPercentage}%
                    </div>
                </div>
            </div>
        </div>
        <div className=" w-screen  flex flex-col">
            <div className="header h-[64px] z-10"></div>
            <div className="w-full bg-[#f8f9fb]  flex-auto relative overflow-hidden">
              <div className=" overflow-y-scroll h-[calc(100vh-64px)]  no-scrollbar">
                {
                   !showResult ? <>
                  <div className=" shadow-round p-[20px] mx-auto rounded-2xl  bg-white  mt-[80px] max-w-[1022px] flex flex-col gap-3">
                  {
                      Object.values(currentQuestion).length > 0 &&(<>
                      <div className="flex ">
                        <p className="number font-bold text-[16px]">Câu hỏi :</p>
                        <p className="questions text-fourth text-[16px]">
                            {currentQuestion.content}
                        </p>

                      </div>
                        <div className="flex flex-col gap-3">
                          {currentQuestion.answers.map((answer, index) => {
                              return (
                                <div className={`flex items-center quiz_key  relative pl-10  cursor-pointer py-2 rounded-xl ${studentAnswer.some((a) => a.answerId === answer.answerId) ? "is_check ":" "}`} key={answer.answerId} ref={addQuizRefs} >
                                  <label htmlFor={`${answer.answerId}`} className='cursor-pointer block w-full'>{answer.content}
                                    <input type="radio"   name={`answer}`} id={`${answer.answerId}`} onChange={(e) => {
                                      handleChooseAnswer(e,currentQuestion?.id, answer.answerId)
                                    }} />
                                  </label>
                                  <div className={` ${studentAnswer.some((a) => a.answerId === answer.answerId) ? "checkmark block": "hidden"}
                                     p-1 `} ref={addCheckmarkRefs}>
                                      <icons.check className='text-white text-[18px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '></icons.check> 
                                  </div>
                                </div>
                              )
                          })}
                        </div>
                        </>) 
                    }       
                  </div>
                   </> : <>
               ""
                   </>
                }
                {/* show result */}
              </div>
              {
                !showResult?  <div className="absolute h-[60px] w-fit bg-color flex items-center gap-3 px-[20px] py-[12px] top-0 left-[50%] translate-x-[-50%] shadow-round rounded-bl-[12px] rounded-br-[12px]">
                <icons.clock className='text-[20px]'>   </icons.clock>
                {/* <span className='text-[24px] font-bold'>00:00:00</span> */}
                <Countdown  value={Date.now() + data.data.timeLimit * 60 * 1000} onChange={onChange} onFinish={onFinish}/>
            </div>: ""
              }
                
                <div className={`footer absolute h-[165px] left-0 bottom-0 right-0 p-6 w-full z-50 shadow-round transition-all ease-linear duration-150 ${!disabled ? "" : "translate-y-[100%]" }`}>
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
                        currentQuestion?.id === data.data.questions[data.data.questions.length - 1].id ?  <div className="absolute p-3 font-bold bg-[#1e40ae] text-white text-center text-[14px] rounded-full bottom-[100%] right-[100px] shadow-round cursor-pointer hover:opacity-80 transition-all ease-linear duration-150 " onClick={handleSubmit}>Finish</div>  : ""
                      }
                      
                    
                    
                    <div className={`absolute left-[50%] translate-x-[-50%] w-10 h-10 rounded-full bg-[#1e40ae] flex items-center justify-center ${!disabled ? "bottom-[88%]" : "bottom-[100%]"} cursor-pointer`} onClick={() => {
                      setDisabled((state) => !state)
                    }}>
                      {
                        !disabled ? <icons.arrowdown className='text-white'></icons.arrowdown> : <icons.arrowup className='text-white text-[20px]'></icons.arrowup>
                      }
                    </div>
                </div>
            </div>

        </div>
      </div>
       
    </TestStyled>
  )
}
const TestStyled = styled.div`
    .box{
      background: radial-gradient(111.48% 112.7% at 43.11% 26.07%, #fff 16.98%, #e7e7e7 65.21%);;
    }
    .active{
        min-width: 336px;
    }
    .header{
        box-shadow: var(--shadow-bottom);
    }
    .left_sidebar{
        box-shadow:  var(--shadow-right);
    }
    .footer{
        background-color: var(--footer-color);
    }
    .true{
        background-color: var(--true-color) !important;
        color:white !important;

    }
    .wrong{
        background-color: var(--wrong-color) !important;
        color:white !important;

    }
    .left,  .question{
        background-color:var(--current-color-2);
        color: var(--current-color-1)
    }
    .current{
        background-color: var(--bg-color);
        color:white;
    }
    .quiz_key:hover{
      background-color: var(--bg-hover);
    }
    .quiz_key input{
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }
    .quiz_key label::after{
      width: 24px;
      height: 24px;
      content: "";
      position: absolute;
      border-radius: 8px;
      top: 50%;
      transform: translateY(-50%);
      left: 8px;
      border: 2px solid #000;
      cursor: pointer;
      z-index: 0;

    }
    .quiz_key_view:hover{
      background-color: var(--bg-hover);
    }
    .quiz_key_view input{
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }
    .quiz_key_view label::after{
      width: 24px;
      height: 24px;
      content: "";
      position: absolute;
      border-radius: 8px;
      top: 50%;
      transform: translateY(-50%);
      left: 8px;
      border: 2px solid #000;
      cursor: pointer;
      z-index: 0;

    }
    .checkmark{
      width: 24px;
      height: 24px;
      position: absolute;
      border-radius: 8px;
      top: 50%;
      transform: translateY(-50%);
      left: 8px;
      border: 1px solid transparent;
      z-index: 10;
      background-color: #0cc021;
    }
    .is_check{
      background-color: var(--bg-hover);

    }
    

 
    
`
export default Test
