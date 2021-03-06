import React from 'react'
import Round from './Round'
import '../Styles/Tree.css'

export default class Division extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            refresh:false
        }
    }

    updateWinner = (winner, loser, nodeNum, tournamentNum, roundNumber, division) => {
         const body = {
             winner,
             nodeNum,
             nextRound:roundNumber+1,
             tournamentNum,
             loser,
             roundNumber,
             division
         }
 
         fetch('/update_bracket', {
             method:'POST',
             headers:{
                 "content-type":"application/json"
             },
             body:JSON.stringify(body)
         })
         .then(res => res.json())
         .then(data => {
             console.log(data)
             return data
         })
         .then(updatedBrackets => this.props.refresh(updatedBrackets))
     }

    render(){
        let rounds = []
        for (let round = 1; round < this.props.numRounds + 1; round++) {
            rounds.push(
                <Round
                    authenticated={this.props.authenticated}
                    key={`Round ${round} of Division ${this.props.division}`}
                    division={this.props.division} 
                    roundNum={round}
                    brackets={this.props.brackets}
                    updateOpen={this.props.updateOpen}
                    declareWinner={this.updateWinner}
                    tournamentId={this.props.tournamentId}
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
                    {this.props.divisionTitle}
                </div>
                <br/>
                <div className="round">
                    {rounds}
                </div>
            </div>
        )
    }
}
