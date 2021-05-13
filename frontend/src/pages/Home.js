import React, {useEffect} from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

function Home({handlePlayAgain, isLoaded}) {

     useEffect(() => {
          // Restart game on mount
          handlePlayAgain()
     }, [])

     return (
          <main className="home">
               <div className="home__content">
                    <div>
                         <h1 className="home__title">Who Wants to Be a Millionaire</h1>
                         <h2 className="home__edition">Friends edition</h2>
                         <p>You watched all seasons of TV series "Friends" and call yourself a fan?</p>
                         <p>Play this game and see how hardcore of a fan You are!</p>
                    </div>
                    
                    {isLoaded 
                    ? <Link className="home__play-btn" to='/play'>Play now</Link> 
                    : <button className="home__play-btn loading">Loading game</button>}
                    
                    <div className="home__lifelines">
                         <h2>Lifelines:</h2>
                         <div className="home__lifeline">
                              <div className="home__lifeline-img home__lifelines--50-50"></div>
                              <p>When a contestant uses this lifeline, two of the wrong answers are removed, leaving one wrong answer and the correct one.</p>
                         </div>
                         <div className="home__lifeline">
                              <div className="home__lifeline-img home__lifelines--call"></div>
                              <p>When a contestant uses this lifeline, the contestant has <b>70 seconds to call</b> a friend and ask the current question. Choose your friend <b>before game</b>, and be ready to call him.</p>
                         </div>
                         <div className="home__lifeline">
                              <div className="home__lifeline-img home__lifelines--switch"></div>
                              <p>When a contestant uses this lifeline, the computer will replace the current question with another one.</p>
                         </div>
                    </div>
               </div>
          </main>
     )
}

export default Home
