import React from 'react'
import './About.css'

function About() {
     return (
          <main className="about">
               <div className="about__content">
                    <h1 className="about__title">About</h1>
                    <div className="about__project">
                         <h4 className="about__heading">About project:</h4>
                         <p>This project was created for all the TV show "Friends" fans.</p>
                         <p>It was created just for learning purposes and has no commercial use.</p>
                         <p>It combines two TV shows I really love: "Friends" and "Who Wants to Be a Millionaire".</p>
                    </div>

                    <div className="about__author">
                         <h4 className="about__heading">About author:</h4>
                         <p>Linas G.</p>
                         <div className="about__contact"><a href="https://www.linkedin.com/in/linas-g-b37017206/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"> Linkedin</i></a></div>
                         <div className="about__contact"><a href="https://github.com/linasgrabliauskas" target="_blank" rel="noreferrer"><i className="fab fa-github"></i> Github</a></div>
                    </div>
               </div>
          </main>
     )
}

export default About
