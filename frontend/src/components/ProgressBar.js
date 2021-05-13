import React from 'react'
import './ProgressBar.css'
import Level from './Level'
import Lifeline from './Lifeline'

export default function ProgressBar() {

    return (
        <section className="progress-bar">
            <div className="overlay"></div>  

            <ul className="lifelines">
                <Lifeline name="lifeline-5050"/>
                <Lifeline name="lifeline-phone"/>
                <Lifeline name="lifeline-people"/>
            </ul>

            <ul className="progress">
                <Level level={15}  prize='€1 MILLION'/>
                <Level level={14}  prize='€500,000'/>
                <Level level={13}  prize='€250,000'/>
                <Level level={12}  prize='€125,000'/>
                <Level level={11}  prize='€64,000'/>
                <Level level={10} prize='€32,000'/>
                <Level level={9} prize='€16,000'/>
                <Level level={8} prize='€8,000'/>
                <Level level={7} prize='€4,000'/>
                <Level level={6} prize='€2,000'/>
                <Level level={5} prize='€1,000'/>
                <Level level={4} prize='€500'/>
                <Level level={3} prize='€300'/>
                <Level level={2} prize='€200'/>
                <Level level={1} prize='€100'/>
            </ul>
        </section>
    )
}
