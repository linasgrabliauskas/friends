import React, {useState, useEffect, useContext} from 'react'
import './HelpBar.css'
import {StateContext} from '../App'

function HelpBar(){

    // Global state 
    const {
        level, 
        setShowHelpBar, 
        setAudioCall, 
        setAudioBackground, 
        setAudioEasyBackground, 
        audioCallRef
    } = useContext(StateContext)

    // State (NEED FIX)
    const [timerStarted, setTimerStarted] = useState(false)

    // Vairables
    let timerInterval

    // Functions
    function showCallFriendTimer(duration) {
        let counter = document.getElementById('help-timer-counter')
        let canvas = document.getElementById('help-timer-circle')
        let ctx = canvas.getContext('2d')
        let X = canvas.width / 2
        let Y = canvas.height / 2
        let R = 55
        let angle = 2 * Math.PI / duration
        let timeLeft = duration;


        timerInterval = setInterval(() =>{
            counter.innerHTML = timeLeft;
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.beginPath()
            ctx.arc(X, Y, R, -0.5 * Math.PI + angle * (duration - timeLeft) , 1.5 * Math.PI , false)
            ctx.lineWidth = 6
            ctx.strokeStyle = 'rgb(252,146,0)'
            ctx.shadowBlur = 15
            ctx.shadowColor = 'rgb(252,146,0)'
            ctx.stroke()
            if (timeLeft === 0) {
                clearInterval(timerInterval)
            }
            timeLeft--
        }, 1000)
     
    }

    // Effects
    useEffect(() => {
        let timer1 = setTimeout(() => { 
            showCallFriendTimer(60) 
            setTimerStarted(true)
        }, 10000)
        let timer2 = setTimeout(() => {
            setAudioCall(false)
            level > 4 
            ? setAudioBackground(true) 
            : setAudioEasyBackground(true)
            setShowHelpBar(false)
        }, 74000)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
            clearInterval(timerInterval)
            setTimerStarted(false)
            // Restart audio to 0.00 time
            audioCallRef.current.seek(0.0)
        }
    },[])



    return(
        <section className="help-bar">

            <div className="overlay"></div>  
            <div className="help-timer">
                <canvas id="help-timer-circle" width="150" height="150"></canvas>
                <p id="help-timer-counter">60</p>
            </div>
            <div className="help-info">
                <p className="help-message">{timerStarted ? 'Ask your friend' : 'Call your friend now! Timer start after 10 seconds'} </p>
            </div>

        </section>
    )
}

export default HelpBar