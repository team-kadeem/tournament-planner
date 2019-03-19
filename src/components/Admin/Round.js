import React from 'react'
import Bracket from './Bracket'
import './Styles/Tree.css'


const Round = (props) => {

    // console.log(tree)
    const roundBrackets = props.brackets.map(bracket => {
        if (bracket.round_number === props.roundNum) {
            return (
                <Bracket 
                    fighter1={bracket.fighter1}
                    fighter2={bracket.fighter2}
                />
            )
        }
    })
    return(
        <div className="round-brackets">
            { roundBrackets }
        </div>
    )
}

export default Round