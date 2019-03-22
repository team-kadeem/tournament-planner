import React from 'react'
import Update from './Brackets/Update'
import './Styles/Tree.css'

export default class Bracket extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            updateFighter1:false,
            updateFighter2:false,
            highlightUpdate:false,
            refresh:false
        }
    }

    showUpdateBox = (e) => {
        let updateFighter1, updateFighter2
        if (e.target.id === 'fighter1') {
            if (this.state.updateFighter1 === true) {
                return this.setState({...this.state, updateFighter1:false})
            } else {
                updateFighter1 = true
                updateFighter2 = false
            }
        } 
        if (e.target.id === 'fighter2') {
            if (this.state.updateFighter2 === true) {
                return this.setState({...this.state, updateFighter2:false})
            } else {
                updateFighter1 = false
                updateFighter2 = true
            }
        }
        return this.setState({...this.state, updateFighter1, updateFighter2})
    }

    highlightUpdateBox = (e) => {
        const currentHighlight = this.state.highlightUpdate
        return this.setState({...this.state, highlightUpdate:!currentHighlight })
    }

    // updateWinner = (fighterName, nodeNum, tournamentNum, roundNumber, division) => {
    //    const loser = fighterName === this.props.fighter1 ? this.props.fighter2 : this.props.fighter1
    //     const body = {
    //         fighterName,
    //         nodeNum,
    //         nextRound:roundNumber+1,
    //         tournamentNum,
    //         loser,
    //         roundNumber,
    //         division
    //     }


    //     fetch('/update_bracket', {
    //         method:'POST',
    //         headers:{
    //             "content-type":"application/json"
    //         },
    //         body:JSON.stringify(body)
    //     })
    //     .then(res => console.log(res))
    //     .then(this.setState({...this.state, refresh:!this.state.refresh}, () => console.log('done setting st8'))) 
    // }

    render(){
        const bracketStyle = {
            border:'1px solid black',
            marginBottom:'1px',
            width:'180px',
            height:'30px',
            textAlign:'center',
            position:'relative'
        }
        
        const containerStyle = {
            margin:'10px 0'
        }
        
        const fighterNames = {
            cursor:'pointer'
        }

        const loserStyle = {
            ...fighterNames,
            textDecoration:'line-through',
            color:'grey'
        }
        //TOURNAMENT ID IS HARDCODED
        return(
            <div style={containerStyle}>
            <div style={bracketStyle} onClick={this.showUpdateBox}>
                <span id="fighter1" 
                      style={this.props.loser === this.props.fighter1 ? loserStyle : fighterNames}>
                        {this.props.fighter1}
                </span>
                {this.state.updateFighter1 ? 
                    <Update highlighted={this.state.highlightUpdate}
                            highlight={this.highlightUpdateBox}
                            declareWinner={this.props.declareWinner}
                            fighter={this.props.fighter1} 
                            bracketNumber={this.props.bracketNumber}
                            tournamentId={1}
                            roundNumber={this.props.roundNumber}
                            division={this.props.division} 
                    /> : null}
            </div>
            <div style={bracketStyle} onClick={this.showUpdateBox}>
                <span id="fighter2" 
                      style={this.props.loser === this.props.fighter2 ? loserStyle : fighterNames}>
                      {this.props.fighter2}
                </span>
                {this.state.updateFighter2 ? 
                    <Update highlighted={this.state.highlightUpdate}
                            highlight={this.highlightUpdateBox}
                            declareWinner={this.props.declareWinner}
                            fighter={this.props.fighter2}
                            bracketNumber={this.props.bracketNumber}
                            tournamentId={1}
                            roundNumber={this.props.roundNumber}
                            division={this.props.division}    
                    />: null}
            </div>
        </div>
        )
    }
}
