import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import {Logo} from "../../components";
import icons from '../../../utils/icons';
import { Progress } from 'antd';
const conicColors = {
    '0%': '#87d068',
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
  const checkmarkRef  = useRef([]);
  const quizRef  = useRef([]);
  const [studentAnswer, setStudentAnswer] = useState([]);
  // const [disabled, setDisabled] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(fakeData[0]);
  const handleOnChange = useCallback((event, isCorrect,questionId,selectedKey) => {
    const parentDiv = event.target.closest(".quiz_key");
    parentDiv.classList.add("bg-[#e0e0e0]");
    if (parentDiv) {
      const checkmarkDiv = parentDiv.querySelector(".checkmark");
      if (checkmarkDiv) {
        checkmarkDiv.classList.remove("hidden");     
        isCorrect ?  checkmarkDiv.classList.add("true") :  checkmarkDiv.classList.add("wrong");
        if(!isCorrect)
        {
          currentQuestion.choices.forEach((choice, index) => {
            if (choice.isCorrect) {
              // if the answer is true show them right check
              // Find the correct answer element
              const correctDiv = document.getElementById(`key_${currentQuestion.id}_${choice.key}`)?.closest(".quiz_key");
              correctDiv.classList.add("bg-[#e0e0e0]");
              const correctCheckmark = correctDiv?.querySelector(".checkmark");
              if (correctCheckmark) {
                correctCheckmark.classList.remove("hidden");
                correctCheckmark.classList.add("true");
              }
            }
          });
        }
        // setDisabled(true); // prevent user from click
      }
    }
    // set state which quiz user have done and save key
    setStudentAnswer((state) => state.map((question) => {
      if (question.id === questionId) {
        return {
          ...question,
          isCorrect: isCorrect,
          choices: question.choices.map((choice) => ({
            ...choice,
            isChosen: choice.key === selectedKey, // Set true only for the selected choice
          })),
        };
      }
      return question; // Leave other questions unchanged
    }))
  },[currentQuestion]);
  useEffect(() => {
    const radioButtons = document.getElementsByName(`question_${currentQuestion.id}`);
    radioButtons.forEach((radio) => {
      radio.checked = false; // Uncheck all radios
    });
    const quizKeys = document.querySelectorAll(".quiz_key");
    if(currentQuestion.isCorrect === undefined)
    {
      quizKeys.forEach((quiztag) => {
        if(quiztag.classList.contains("bg-[#e0e0e0]"))
        {
          quiztag.classList.remove("bg-[#e0e0e0]")
        }
      });
      checkmarkRef.current.forEach((tag) => {
        tag.classList.add("hidden");
        tag.classList.remove("true");
        tag.classList.remove("wrong");
      });
    }    
    // setDisabled(false);
    // currentQuestion.isCorrect === undefined ? setDisabled(false) : setDisabled(true);
  },[currentQuestion]);
  useEffect(() => {
    const rs = fakeData.map((quiz) => {
      return {...quiz, ["choices"]: quiz.choices.map((q) => {
        return {...q,isChosen:false};
      })}
    })
    setStudentAnswer(rs);
  },[fakeData]);
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

  return (
    <TestStyled>
      <div className=" flex">   
        <div className="left_sidebar active h-screen flex flex-col items-center px-2 z-10">
            <div className="top">
                <div className="logo mt-2">  
                    <Logo width={160}></Logo></div>
            </div>
            <div className="flex items-center justify-between w-full  cursor-pointer">
                <div className="flex items-center uppercase text-[16px] text-[#1e40ae]  ">
                    <icons.doublearrowdown></icons.doublearrowdown>
                    <span className='font-bold'>past simple tense</span>
                </div>
                <Progress type="circle" percent={75} format={() => `3/4`}  size={60} strokeColor={conicColors} />
            </div>
            <div className=" w-full mt-3 px-3">
                <div className="flex items-center justify-between bg-[#f2f6ff] px-2 py-2 rounded-full cursor-pointer">
                    <span className='font-bold capitalize'>practice 1</span>
                    <div className="progress w-[52px] h-[24px]  border-2 border-[#828282] rounded-xl flex items-center justify-center font-bold  text-[#828282]">
                        0%
                    </div>
                </div>
            </div>
        </div>
        <div className=" w-screen h-screen flex flex-col">
            <div className="header h-[64px] z-10"></div>
            <div className="w-full bg-[#f8f9fb]  flex-auto relative 
            ">
                <div className=" shadow-round p-[20px] mx-auto rounded-2xl  bg-white  mt-[80px] max-w-[1022px] flex flex-col gap-3">
                  {
                    Object.values(currentQuestion).length > 0 && currentQuestion.isCorrect === undefined ? (<>
                      <p className="number font-bold text-[16px]">Câu hỏi {currentQuestion.id}.</p>
                      <p className="questions text-fourth text-[16px]">
                          {currentQuestion.question}
                      </p>
                      <div className="flex flex-col gap-3">
                        {currentQuestion.choices.map((choice, index) => {
                            return (
                              <div className="flex items-center quiz_key  relative pl-10  cursor-pointer py-2 rounded-xl" key={choice.key} ref={addQuizRefs} >
                                <label htmlFor={`key_${currentQuestion.id}_${choice.key}`} className='cursor-pointer block w-full'>{choice.content}
                                  <input type="radio"   name={`question_${currentQuestion.id}`} id={`key_${currentQuestion.id}_${choice.key}`} onChange={(e) => {
                                    handleOnChange(e, choice.isCorrect,currentQuestion.id, choice.key)
                                  }}/>
                                </label>
                                <div className={`
                                  checkmark hidden p-1 `} ref={addCheckmarkRefs}>
                                  {
                                    choice.isCorrect ? <icons.check className='text-white text-[18px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '></icons.check> : <icons.close className='text-white text-[18px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'></icons.close>
                                  }
                                </div>
                              </div>
                            )
                        })}
                      </div>
                      </>) : (<>
                    <p className="number font-bold text-[16px]">Câu hỏi {currentQuestion.id}.</p>
                    <p className="questions text-fourth text-[16px]">
                        {currentQuestion.question}
                    </p>
                    <div className="flex flex-col gap-3">
                      {currentQuestion.choices.map((choice, index) => {
                          return (
                            <div className={`flex items-center quiz_key_view relative pl-10  cursor-pointer py-2 rounded-xl ${choice.isChosen || choice.isCorrect ? "bg-[#e0e0e0]" : "opacity-[0.3]" }`} key={choice.key} >
                              <label htmlFor={`key_${currentQuestion.id}_${choice.key}`} className='cursor-pointer block w-full'>{choice.content}
                                <input type="radio" disabled  name={`question_${currentQuestion.id}`} id={`key_${currentQuestion.id}_${choice.key}`} onChange={(e) => {
                                  handleOnChange(e, choice.isCorrect,currentQuestion.id, choice.key)
                                }}/>
                              </label>
                              {/* <div className={`
                                checkmark p-1 `} >
                                {
                                  currentQuestion.isCorrect 
                                  ?  // if user has the true answer
                                  : // if the user has wrong answer
                                }
                              </div> */}
                              <div className={`
                                checkmark p-1 ${currentQuestion.isCorrect && choice.isChosen ? "true" : !currentQuestion.isCorrect && choice.isChosen ? "wrong" : !currentQuestion.isCorrect && choice.isCorrect ? "true" : "hidden"} `} >
                                {
                                  currentQuestion.isCorrect && choice.isChosen ? <icons.check className='text-white text-[18px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '></icons.check>  : !currentQuestion.isCorrect && choice.isChosen ? <icons.close className='text-white text-[18px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'></icons.close> :  !currentQuestion.isCorrect && choice.isCorrect ? <icons.check className='text-white text-[18px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '></icons.check> : ""
                                }
                              </div>
                            </div>
                          )
                      })}
                    </div>
                    </>)
                  }
                    
                </div>
                <div className="absolute h-[60px] w-fit bg-color flex items-center gap-3 px-[20px] py-[12px] top-0 left-[50%] translate-x-[-50%] shadow-round rounded-bl-[12px] rounded-br-[12px]">
                    <icons.clock className='text-[20px]'>   </icons.clock>
                    <span className='text-[24px] font-bold'>00:00:00</span>
                </div>
                <div className="footer absolute h-[165px] left-0 bottom-0 right-0 p-6 w-full">
                    <div className="">cau hoi 1-20</div>
                    <div className="note flex items-center gap-5 ">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full true"></div> 
                            <span>{studentAnswer.filter((quiz) => quiz.isCorrect).length} Đúng</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full wrong"></div> 
                            <span>{studentAnswer.filter((quiz) => !quiz.isCorrect && quiz.isCorrect !== undefined).length} Sai</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full left"></div> 
                            <span>{studentAnswer.filter((quiz) => quiz.isCorrect === undefined).length} Chưa trả lời</span>
                        </div>
                    </div>
                    <div className="questions flex gap-3">
                        {
                          studentAnswer.map((quiz, index) => (
                            <button type="button" key={`quiz_${index}`} className={`w-10 h-10 rounded-full question text-[16px] font-bold  hover:translate-y-[-2px] duration-200 transition-all ease-linear 
                              ${quiz.id === currentQuestion.id ? "current" : 
                                quiz.isCorrect === undefined ? "" :  quiz.isCorrect ? "true"//
                                : "wrong"  } 
                              `
                            } onClick={() => {
                              setCurrentQuestion(quiz);
                            }}>
                                {index + 1}
                            </button>
                          ))
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
    }

 
    
`
export default Test
