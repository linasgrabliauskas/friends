import React, {useContext, useState, useEffect} from 'react'
import './QuestionBar.css'
import {StateContext} from '../App'
import Answer from './Answer'

export default function QuestionsBar() {

    // Global state 
    const {
        level, 
        currQuestion, 
        setAudioBackground, 
        setAudioEasyBackground
    } = useContext(StateContext)
    
    // State
    const [answerSelected, setAnswerSelected] = useState(false)
    
    // Variables
    const {question, answerA, answerB, answerC, answerD } = currQuestion

    // Effects
    useEffect(() => {
        // Select background audio based on level
        if (level > 4) {
            setAudioEasyBackground(false)
            setAudioBackground(true) 
        } else {
            setAudioEasyBackground(true)
        } 
    }, [level, setAudioBackground, setAudioEasyBackground])

    return (
        <section className="question-bar">
            <div className="question-bar__question">
                <h1>{question}</h1> 
            </div>
            
            <ul className="question-bar__list">  
                <Answer answer={answerA} letter={"A"} answerSelected={answerSelected} setAnswerSelected={setAnswerSelected}/>
                <Answer answer={answerB} letter={"B"} answerSelected={answerSelected} setAnswerSelected={setAnswerSelected}/>
                <Answer answer={answerC} letter={"C"} answerSelected={answerSelected} setAnswerSelected={setAnswerSelected}/>
                <Answer answer={answerD} letter={"D"} answerSelected={answerSelected} setAnswerSelected={setAnswerSelected}/>
            </ul>
        </section>
    )
}
