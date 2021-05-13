import React, {useContext} from 'react'
import {StateContext} from '../App'

function Level({level, prize}) {

     // Global state
     const { level: currLevel } = useContext(StateContext)

     // Styles
     let className
     if (currLevel === level) className = 'selected-value'

     return (
          <li className={className}> 
               <p className="level">{level}</p> 
               <p className="diamond">{currLevel >= level  && '◆'}</p> 
               <p className="value">{prize}</p> 
          </li>
     )
}

export default Level
