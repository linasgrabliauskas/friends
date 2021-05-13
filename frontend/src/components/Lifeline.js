import React, {useContext} from 'react'
import {StateContext} from '../App'

function Lifeline({ name }) {

     // Global state
     const {lifelines, handleLifeline} = useContext(StateContext)

     // Styles
     let className = "lifeline"
     lifelines.forEach(lifeline => {
         if (lifeline.isUsed && lifeline.name === name) className = "lifeline used"
     })

     return (
          <li onClick={e => handleLifeline(e)}>
               <div id={name} className={className}></div>
          </li>
     )
}

export default Lifeline
