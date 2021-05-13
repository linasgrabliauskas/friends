import React, {useState, useEffect} from 'react'
import './Highscore.css'

function Highscore() {

     // State
     const [scores, setScores] = useState([])
     const [isLoaded, setIsLoaded] = useState(false)

     // Effects
     useEffect(() => {
          fetch('https://friends-million.herokuapp.com/api/scores')
          .then(res => res.json())
          .then(data => {
               setScores(data)
               setIsLoaded(true)
          })
          .catch(err => console.error(err))
     }, [])

     const scoreList = scores.map(score => (
          <li key={score._id} className="highscore__list-item">
               <div className="highscore__name">{score.nickname}</div>
               <div className="highscore__prize">€{score.prize}</div>
               <div className="highscore__country">{score.country}</div>
               <div className="highscore__time">{score.time}</div>
          </li>
     ))

     return (
          <main className="highscore">
               <div className="highscore__content">
                    <h1>Scoreboard</h1>
                    <h2>Biggest friends fans:</h2>
                    <div className="highscore__list-container">
                         <ul className="highscore__list-head">
                              <div className="highscore__name">Nickname</div>
                              <div className="highscore__prize">Prize won</div>
                              <div className="highscore__country">Country</div>
                              <div className="highscore__time">Time</div>
                         </ul>
                         <ul className="highscore__list">
                             {isLoaded 
                             ? scoreList 
                             : <li className="highscore__list-item loading">Loading...</li>}
                         </ul>
                    </div>
               </div>
          </main>
     )
}

export default Highscore
