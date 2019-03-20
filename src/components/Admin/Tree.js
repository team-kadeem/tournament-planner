import React from 'react'
import Bracket from './Bracket'
import Division from './Division'
import Update from './Brackets/Update'
import Round from './Round'
import './Styles/Tree.css'


export default class Tree extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            rounds:undefined,
            brackets:undefined,
            x:undefined,
            y:undefined
        }
    }

    mapToBrackets = (brackets) => {
        console.log(brackets)
        let currentDivision = brackets[0].division
        let bracketsByDivision = {}
        let currentDivisionFighters = []

        brackets.map(bracket => {
            if (bracket.division !== currentDivision ) {
                bracketsByDivision[currentDivision] = currentDivisionFighters
                currentDivisionFighters = []
                currentDivision = bracket.division
            }
            currentDivisionFighters.push(bracket)
        })
        console.log(bracketsByDivision)
        const rounds = this.determineDivisionRounds(bracketsByDivision)
        
        return this.setState({...this.state, brackets:bracketsByDivision, rounds})
    }

    determineDivisionRounds = (bracketsByDivision) => {
        let rounds = {}
        const divisions = Object.keys(bracketsByDivision)
        divisions.forEach(division => {
            rounds[division] = Math.floor(Math.log2(bracketsByDivision[division].length)) + 1
        })
        return rounds
    }

    updateBracket = event => {
        console.log(event.target.name)
        let updateName = event.target.innerHTML
        console.log(updateName)
        const x = event.pageX
        const y = event.pageY
        this.setState({...this.state, x, y})
    }


    componentDidMount(){
        fetch('/brackets', {
            method:'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({tournamentId:'1'})
        })
        .then(res => res.json())
        .then(data => this.mapToBrackets(data))
        .catch(err => console.log('ERROR FETCHING ' + err))
    }


    render(){
        if (!this.state.brackets) {
            return(
                <div/>
            )
        } else{
            const divisions = Object.keys(this.state.rounds)
            const wholeBrackets = divisions.map(division => {
                return (
                    <Division
                        division={division} 
                        numRounds={this.state.rounds[division]}
                        brackets={this.state.brackets[division]}
                        updateOpen={this.updateBracket}
                        x={this.state.x}
                        y={this.state.y}
                    />
                )
            })
            
            return(
                <div>
                    {this.state.x && this.state.y ? <Update x={this.state.x} y={this.state.y}/> : null}
                    {wholeBrackets}
                </div>
            )
        }
    }
}