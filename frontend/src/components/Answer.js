import React, { useState, useEffect, useContext, useRef } from 'react'
import { StateContext } from '../App'
import ReactHowler from 'react-howler'

// Audios
import finalAnswer from '../assets/sounds/compressed/finalAnswer2.mp3'
import correct from '../assets/sounds/compressed/correctAnswer-c.mp3'
import incorrect from '../assets/sounds/compressed/wrongAnswer.mp3'

export default function Answer({answer, letter, answerSelected, setAnswerSelected}) {

     // Global state 
     const {
          level,
          setLevel, 
          allQuestions, 
          currQuestion,
          setAllQuestions, 
          setGameOver, 
          setAudioBackground, 
          setAudioEasyBackground, 
          setShowHelpBar, 
          setAudioCall,
          showCorrect, 
          setShowCorrect,
          setMillionAudio
     } = useContext(StateContext)

     // State     
     const [answerBtn, setAnswerBtn] = useState('')
     const [selectedAnsText, setSelectedAnsText] = useState('')
     // State - Audio playing
     const [correctAudio, setCorrectAudio] = useState(false)
     const [incorrectAudio, setIncorrectAudio] = useState(false)
     const [finalAnswerAudio, setFinalAnswerAudio] = useState(false)

     // Variables
     const {correctAnswer} = currQuestion

     // Refs
     const audioCorrectRef = useRef(null)

     // Effects
     useEffect(() => {
          answerSelected ? setAnswerBtn('block') : setAnswerBtn('')
          // Reset answers and audio
          setAnswerSelected(false)
          setFinalAnswerAudio(false)
          setCorrectAudio(false)
          setIncorrectAudio(false)
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [currQuestion, allQuestions])
     
     useEffect(() => {
          let timer3
          let timer4
          audioCorrectRef.current.seek(0.0)
          if (answerSelected && answerBtn === 'selected'){
               // Get them waiting and excited
               timer3 = setTimeout(() => {   
                    if (selectedAnsText === correctAnswer){
                         setAnswerBtn('correct')
                         if (level === 15){
                              // Correct answer && last question ( won million)
                              setMillionAudio(true)
                              setGameOver(true)
                         } else {
                              // Correct answer
                              setCorrectAudio(true)
                              let updatedQuestions = [...allQuestions]
                              updatedQuestions.map(q => q.question === currQuestion.question ? q.isUsed = true : q)
                              // Show next question after 3.5s
                              timer4 = setTimeout(() => {
                                   setAnswerBtn('')
                                   setAllQuestions(updatedQuestions)
                                   setLevel(level + 1) 
                              }, 3500)
                         }
                    } else {
                         // Game over
                         setShowCorrect(true)
                         setIncorrectAudio(true)
                         setGameOver(true)
                    }
               }, 7000)
          }
          return () => {
               clearTimeout(timer4)
               clearTimeout(timer3)
               setSelectedAnsText('')
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [answerSelected])

     // Functions
     function handleAnswer(e) {
          e.preventDefault()  
          const selectedAns = e.target.innerText.substring(3)
          // Answer selected
          setSelectedAnsText(selectedAns)
          setAnswerBtn('selected')
          setAudioEasyBackground(false)
          setAudioBackground(false)
          setAudioCall(false)
          setShowHelpBar(false)
          setFinalAnswerAudio(true)
          setAnswerSelected(true)
     }


     // Styles
     let className = answerSelected 
     ? 'question-bar__list-item question-bar__list-item--block' 
     : 'question-bar__list-item'
     switch (answerBtn) {
          case 'selected':
               className = 'question-bar__list-item question-bar__list-item--selected'
               break
          case 'correct':
               className = 'question-bar__list-item question-bar__list-item--correct'
               break
          case 'incorrect':
               className = 'question-bar__list-item question-bar__list-item--selected'
               break
          default:
               break
     } 
     // Reveal correct answer, when click on wrong answer
     if (showCorrect && (answer === currQuestion.correctAnswer)) className = 'question-bar__list-item question-bar__list-item--correct'

     return (
          <li className={className} onClick={e => handleAnswer(e, currQuestion)}> 
               <h2>
                    <span className="question-bar__list-item__diamond">◆</span>
                    <span className="question-bar__list-item__letter">{letter}:</span>
                    {answer}
               </h2>

               <ReactHowler src={correct} playing={correctAudio} volume={0.8} ref={audioCorrectRef}/>
               <ReactHowler src={incorrect} playing={incorrectAudio} volume={0.8}/>
               <ReactHowler src={finalAnswer} playing={finalAnswerAudio} volume={0.8}/>
          </li>
     )
}
