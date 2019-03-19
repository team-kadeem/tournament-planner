import React from 'react'
import Round from './Round'
import './Styles/Tree.css'


const Division = (props) => {
    console.log(props)
    let rounds = []
    for (let round = 1; round < props.numRounds + 1; round++) {
        rounds.push(
            <Round 
                roundNum={round}
                brackets={props.brackets} 
            />
        )
    }
    return(
        <div>
            {props.division} Division
            <div className="round">
                {rounds}
            </div>
        </div>
    )
}

export default Division;