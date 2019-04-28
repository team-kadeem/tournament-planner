import React from 'react'
import Bracket from './Bracket'
import '../Styles/Tree.css'


const Round = (props) => {

    const roundBrackets = props.brackets.map(bracket => {
        if (bracket.round_number === props.roundNum) {
            return (
                <Bracket
                    authenticated={props.authenticated} 
                    fighter1={bracket.fighter1}
                    fighter2={bracket.fighter2}
                    bracketNumber={bracket.node_number}
                    updateOpen={props.updateOpen}
                    roundNumber={bracket.round_number}
                    division={props.division}
                    winner={bracket.winner}
                    loser={bracket.loser}
                    declareWinner={props.declareWinner}
                    tournamentId={props.tournamentId}
                />
            )
        }
        return(
            <div/>
        )
    })
    return(
        <div className="round-brackets">
            { roundBrackets }
        </div>
    )
}

export default Round