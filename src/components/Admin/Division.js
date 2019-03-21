import React from 'react'
import Round from './Round'
import './Styles/Tree.css'


const Division = (props) => {
    let rounds = []
    for (let round = 1; round < props.numRounds + 1; round++) {
        rounds.push(
            <Round
                division={props.division} 
                roundNum={round}
                brackets={props.brackets}
                updateOpen={props.updateOpen}
            />
        )
    }

    const divisionHeader = {
        width:'100%',
        textAlign:'center',
        fontWeight:'700'
    }
    return(
        <div style={{marginTop:'50px'}}>
            <div style={divisionHeader}>
                {props.division} Division - Fix: These are IDs and not weights
            </div>
            <br/>
            <div className="round">
                {rounds}
            </div>
        </div>
    )
}

export default Division;