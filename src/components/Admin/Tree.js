import React from 'react'
import Division from './Division'
import Update from './Brackets/Update'
import './Styles/Tree.css'


export default class Tree extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            rounds:undefined,
            brackets:undefined,
        }
    }

    mapToBrackets = (brackets) => {
        // console.log(brackets)
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
        
        this.setState({...this.state, brackets:bracketsByDivision, rounds})
    }

    determineDivisionRounds = (bracketsByDivision) => {
        let rounds = {}
        const divisions = Object.keys(bracketsByDivision)
        divisions.forEach(division => {
            rounds[division] = Math.floor(Math.log2(bracketsByDivision[division].length)) + 1
        })
        return rounds
    }

    refresh = (updatedBrackets) => this.mapToBrackets(updatedBrackets)
    

    componentWillMount(){
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
                        key={`${division} division`}
                        division={division}
                        divisionTitle={this.state.brackets[division][0]['division_title']} 
                        numRounds={this.state.rounds[division]}
                        brackets={this.state.brackets[division]}
                        updateOpen={this.updateBracket}
                        refresh={this.refresh}
                    />
                )
            })
            
            return(
                <div>
                    {wholeBrackets}
                </div>
            )
        }
    }
}