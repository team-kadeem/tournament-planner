import React from 'react'
import Round from './Round'
import './Styles/Tree.css'


const Division = (props) => {
    let rounds = []
    for (let round = 1; round < props.numRounds + 1; round++) {
        rounds.push(
            <Round 
                roundNum={round}
                brackets={props.brackets}
                updateOpen={props.updateOpen}
                x={props.x}
                y={props.y} 
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
                {props.division} Division
            </div>
            <br/>
            <div className="round">
                {rounds}
            </div>
        </div>
    )
}

export default Division;