import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import ReactHowler from 'react-howler'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Pages & Components
import Home from './pages/Home'
import Play from './pages/Play'
import Highscore from './pages/Highscore'
import About from './pages/About'
import Header from './components/Header'

// Audios
import lifelineChange from './assets/sounds/compressed/lifeline50change.mp3'
import lifelineFriend from './assets/sounds/compressed/phoneFriend-60.mp3'
import millionier from './assets/sounds/compressed/commericalBreak.mp3'
import mainBgSound from './assets/sounds/compressed/2000-32000-c.mp3'
import easyBgSound from './assets/sounds/compressed/100-1000-c.mp3'

// Context
export const StateContext = React.createContext()


function App() {

    const initialLifelines = [
        { id: 1, name: "lifeline-5050", isUsed: false},
        { id: 2, name: "lifeline-phone", isUsed: false},
        { id: 3, name: "lifeline-people", isUsed: false},
    ]

    // Refs
    let audioCallRef = useRef(null)
    let audioEasyBackgroundRef = useRef(null)
    let audioBackgroundRef = useRef(null)
    let audioMillionRef = useRef(null)
  
    // States
    const [level, setLevel ] = useState(1)
    const [lifelines, setLifelines] = useState(initialLifelines)
    const [allQuestions, setAllQuestions] = useState([])
    const [currQuestion, setCurrQuestion] = useState([])
    const [showHelpBar, setShowHelpBar] = useState(false)
    const [showCorrect, setShowCorrect] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [gameStartTime, setGameStartTime] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)

    // State - Audio playing
    const [audio5050, setAudio5050] = useState(false)
    const [audioCall, setAudioCall] = useState(false)
    const [audioChange, setAudioChange] = useState(false)
    const [audioBackground, setAudioBackground] = useState(false)
    const [audioEasyBackground, setAudioEasyBackground] = useState(false)
    const [millionAudio, setMillionAudio] = useState(false)

    // Provider
    const providerValue = {
        level, setLevel, 
        allQuestions, setAllQuestions, 
        lifelines, setLifelines, 
        gameOver,setGameOver, 
        showCorrect, setShowCorrect, 
        currQuestion, 
        showHelpBar, setShowHelpBar,
        handlePlayAgain, 
        selectQuestion,
        setAudioBackground, 
        setAudioEasyBackground, 
        setAudioCall, 
        handleLifeline, 
        isLoaded,
        audioEasyBackgroundRef, 
        audioBackgroundRef, 
        audioCallRef, 
        millionAudio, setMillionAudio,
        gameStartTime,setGameStartTime
    }

    // Effects
    useEffect(() => {
        getAllQuestions()
    }, [])

    useEffect(() => { 
        // Play again (Level 0 = Play again)
        if (level === 0) setLevel(1)
        // Audio bug fix
        if (lifelines[0].isUsed) setAudio5050(false)
        if (lifelines[1].isUsed) setAudioCall(false)
        if (lifelines[2].isUsed) setAudioChange(false)
    }, [level])

    // Functions
    function getAllQuestions(){
        fetch('https://friends-million.herokuapp.com/api/question')
        .then(res => res.json())
        .then(data => {
            setAllQuestions([...data])
            setIsLoaded(true)
        })
        .catch(err => console.error(err))
    }

    function selectQuestion(level){
        // Sort levels
        let questionsLevelOne = allQuestions.filter(q => q.level === '1' && !q.isUsed)
        let questionsLevelTwo = allQuestions.filter(q => q.level === '2' && !q.isUsed)
        let questionsLevelThree = allQuestions.filter(q => q.level === '3' && !q.isUsed)
        let questionsLevelFour = allQuestions.filter(q => q.level === '4' && !q.isUsed)
        let questionsLevelFive = allQuestions.filter(q => q.level === '5' && !q.isUsed)
        let currQuestion = []

        // Select level
        if (level > 0 && level < 5) {
            currQuestion = questionsLevelOne[pickRandomNum(questionsLevelOne)]
        } else if (level >= 5 && level < 9) {
            currQuestion = questionsLevelTwo[pickRandomNum(questionsLevelTwo)]
        } else if (level >= 9 && level < 12) {
            currQuestion = questionsLevelThree[pickRandomNum(questionsLevelThree)]
        } else if (level >= 12 && level < 15) {
            currQuestion = questionsLevelFour[pickRandomNum(questionsLevelFour)]
        } else if (level === 15){
            currQuestion = questionsLevelFive[pickRandomNum(questionsLevelFive)]
        } else {
            return
        }

        // Shuffle answers
        let answers = [ currQuestion.answerA, currQuestion.answerB, currQuestion.answerC, currQuestion.answerD]
        shuffle(answers)
        currQuestion.answerA = answers[0]
        currQuestion.answerB = answers[1]
        currQuestion.answerC = answers[2]
        currQuestion.answerD = answers[3]
        // Set question
        setCurrQuestion(currQuestion)
    }
    function shuffle(array) {
        // Fisher-Yates shuffle algorithm
        for(let i = array.length - 1; i>0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array
    }
    function pickRandomNum(arr){
        return  Math.floor(Math.random()*arr.length)
    }
    function handleLifeline(e) {

        // Lifeline: 50:50
        if (e.target.id === 'lifeline-5050' && !lifelines[0].isUsed){
            let answers = [ currQuestion.answerA, currQuestion.answerB, currQuestion.answerC, currQuestion.answerD]
            let wrongAnswerToShow = answers.filter( a => a !== currQuestion.correctAnswer)[Math.floor(Math.random()*3)]
            let modifiedAnswers = answers.map( ans => ans !== currQuestion.correctAnswer && ans !== wrongAnswerToShow ? ans = '' : ans)
            let updatedAnswers = {
                answerA: modifiedAnswers[0],
                answerB: modifiedAnswers[1],
                answerC: modifiedAnswers[2],
                answerD: modifiedAnswers[3]
            }
            let updatedQuestion = {...currQuestion, ...updatedAnswers}
            let updatedLifelines = [...lifelines]
            updatedLifelines[0].isUsed = true
            setLifelines(updatedLifelines)
            setCurrQuestion(updatedQuestion)
            setAudio5050(true)
            setTimeout(() => {
                setAudio5050(false)
            }, 2000)

            // Restart
            audioCallRef.current.seek(0.0)
        }

        // Lifeline: Phone call
        else if (e.target.id === 'lifeline-phone' && !lifelines[1].isUsed){
            setAudioBackground(false)
            setAudioEasyBackground(false)
            setAudioCall(true)

            // Show HelpBar
            setShowHelpBar(true)
            // Update lifelines
            let updatedLifelines = [...lifelines]
            updatedLifelines[1].isUsed = true
            setLifelines(updatedLifelines)
        }

        // Lifeline: Switch question
        else if (e.target.id === 'lifeline-people' && !lifelines[2].isUsed){
            // Updated unanswered question
            let updatedQuestions = [...allQuestions]
            updatedQuestions.map(q => q.question === currQuestion.question ? q.isUsed = !q.isUsed : q)
            let updatedLifelines = [...lifelines]
            updatedLifelines[2].isUsed = true
            setLifelines(updatedLifelines)
            setAllQuestions(updatedQuestions)
            selectQuestion(level)
            setAudioChange(true)
            setTimeout(() => {
                setAudioChange(false)
            }, 2000)
        }
    }
    function handlePlayAgain(){
        // Reset game
        getAllQuestions()
        setLifelines(initialLifelines)
        setLevel(0)
        setShowHelpBar(false)
        setGameOver(false)
        setShowCorrect(false)
        setGameStartTime('')
        // Reset audio
        setAudio5050(false)
        setAudioCall(false)
        setAudioChange(false)
        setMillionAudio(false)
        setAudioBackground(false)
        setAudioEasyBackground(false)
        audioEasyBackgroundRef.current.seek(0.0)
        audioBackgroundRef.current.seek(0.0)
        audioCallRef.current.seek(0.0)
        audioMillionRef.current.seek(0.0)
    }

    return (
    <div className="App">
        <div className="container">
            <Router>
                <Header/>
                <Switch>
                    <Route exact path='/' >
                        <Home handlePlayAgain={handlePlayAgain} isLoaded={isLoaded}/>
                    </Route>
                    <Route path='/play'>
                        <StateContext.Provider value={{ ...providerValue}}>
                            <Play/>
                        </StateContext.Provider>
                    </Route>
                    <Route path='/scores' component={Highscore} />  
                    <Route path='/about'  component={About} />
                </Switch>
            </Router>

            <ReactHowler src={lifelineChange} playing={audio5050} volume={0.8}/>                    
            <ReactHowler src={lifelineFriend} playing={audioCall} volume={0.8} ref={audioCallRef}/>                    
            <ReactHowler src={lifelineChange} playing={audioChange} volume={0.8}/>                    
            <ReactHowler src={millionier} playing={millionAudio} volume={0.8} ref={audioMillionRef}/>
            <ReactHowler src={easyBgSound} playing={audioEasyBackground} volume={0.7} loop={true} ref={audioEasyBackgroundRef}/>
            <ReactHowler src={mainBgSound} playing={audioBackground} volume={0.7} loop={true} ref={audioBackgroundRef}/>   
        </div>
    </div>
    )

}

export default App


