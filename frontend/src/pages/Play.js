import React, {useContext, useState, useEffect} from 'react'
import { Redirect } from 'react-router'
import {StateContext} from '../App'
import GameOver from '../components/GameOver'
import HelpBar from '../components/HelpBar'
import ProgressBar from '../components/ProgressBar'
import QuestionsBar from '../components/QuestionsBar'


function Play() {

     // Global state 
     const {level, allQuestions, gameOver, showHelpBar, setGameStartTime, selectQuestion} = useContext(StateContext)

     // State
     const [redirect, setRedirect] = useState(false)

     // Effects
     useEffect(() => {
          setGameStartTime(Date.now())
          return () => {
               setRedirect(false)
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [])

     useEffect(() => { 
          // Bug fix
          if (!allQuestions.length) return setRedirect(true)
          selectQuestion(level)
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [level])

     return (
          <main className="play">
               {redirect && <Redirect to="/"/>}
               {showHelpBar && <HelpBar/>}
               <ProgressBar/>
               <QuestionsBar/>
               {gameOver && <GameOver/>}
          </main>
     )
}

export default Play
