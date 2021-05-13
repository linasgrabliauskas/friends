import React, {useState, useEffect, useContext} from 'react'
import './GameOver.css'
import {StateContext} from '../App'
import { Redirect } from 'react-router'
import countries from '../assets/countries.json'

export default function GameOver(){

     // Global state
     const {
          level,
          handlePlayAgain,
          millionAudio,
          gameOver,
          gameStartTime
     } = useContext(StateContext)

     // State
     const [redirect, setRedirect] = useState(false)
     const [nickname, setNickname] = useState('')
     const [country, setCountry] = useState('')
     const [message, setMessage] = useState('')
     const [prize, setPrize] = useState(0)
     const [gameTime, setGameTime] = useState('')

     // Functions
     function calculateTotalPrize() {
          if (level > 0 && level <= 5){
               return setPrize(0)
          } else if (level > 5 && level <= 10){
               return setPrize(1000)
          } else if (level > 10 && level <= 15 && !millionAudio){
               return setPrize(32000)
          } else if (level === 15 && gameOver && millionAudio){
               return setPrize(1000000)
          }
     }

     function calculateGameTime(){
          const gameTimeSecs = (Date.now() - gameStartTime) / 1000
          setGameTime(gameTimeSecs.toFixed(0))
     }

     function handleAddHighscore(e){
          e.preventDefault()
          if (nickname.length > 22) return setMessage('Your nickname is too long')
          let score = {
               nickname,
               country,
               prize,
               time: gameTime,
               score: (prize + prize / gameTime).toFixed(0)  
          }
          fetch('https://friends-million.herokuapp.com/api/scores', {
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(score),
          })
          .then((res) => res.json())
          .then(() => {
               // Reset
               setNickname('')
               setCountry('')
               setMessage('')
               setGameTime('')
               setPrize(0)
               // Redirect
               setRedirect(true)
          })
          .catch((err) => console.log(err))
     }


     // Effects
     useEffect(() => {
          calculateTotalPrize()
          calculateGameTime()
          return () => {
               setRedirect(false)
               handlePlayAgain()
          }
     }, [])

     const countriesSelectOptions = countries.map(country => <option key={country.code} value={country.code}>{country.name}</option>) 

     return (
          <div className="game-over">
               {redirect && <Redirect to="/"/>}
               <div className="game-over__content">
                    <h2>{(level === 15 && gameOver && millionAudio) ? 'Congratulations!' : 'Game over'}</h2>
                    <h4 className="game-over__prize-full">You won <span className="game-over__prize">€{prize}</span> </h4>
                    <div className="game-over__controls">
                         {prize !== 0 && <form onSubmit={handleAddHighscore}>
                                   <div className="gameover__form-item">
                                        <label>Enter Your Nickname</label>
                                        <input type="text" name="nickname" onChange={(e) => setNickname(e.target.value)} required/>
                                   </div>
                                   <div className="gameover__form-item">
                                        <label>Select Your country</label>
                                        <select name="countries" onChange={(e) => setCountry(e.target.value)} required>
                                             <option value=''>- - -</option>
                                             {countriesSelectOptions}
                                        </select>
                                   </div>
                                   <button className="game-over__controls-btn">SUBMIT TO HIGHSCORE</button>
                         </form>}
                         <button className="game-over__controls-btn" onClick={() => setRedirect(true)}>PLAY AGAIN</button>
                    </div>
                    <p className="game-over__message">{message}</p>
               </div>  
          </div>
     )
}
