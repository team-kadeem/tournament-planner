import React from 'react'
import Round from './Round'
import './Styles/Tree.css'

export default class Division extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            refresh:false
        }
    }

    updateWinner = (fighterName, nodeNum, tournamentNum, roundNumber, division) => {
        const loser = fighterName === this.props.fighter1 ? this.props.fighter2 : this.props.fighter1
         const body = {
             fighterName,
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
         .then(this.props.refresh())
     }

    render(){
        let rounds = []
        for (let round = 1; round < this.props.numRounds + 1; round++) {
            rounds.push(
                <Round
                    key={`Round ${round} of Division ${this.props.division}`}
                    division={this.props.division} 
                    roundNum={round}
                    brackets={this.props.brackets}
                    updateOpen={this.props.updateOpen}
                    declareWinner={this.updateWinner}
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
                    {this.props.division} Division - Fix: These are IDs and not weights
                </div>
                <br/>
                <div className="round">
                    {rounds}
                </div>
            </div>
        )
    }
}
