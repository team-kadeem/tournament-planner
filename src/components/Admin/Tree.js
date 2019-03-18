import React from 'react'
import Bracket from './Bracket'
import Round from './Round'
import './Styles/Tree.css'


export default class Tree extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            trees:null
        }
    }

    mapToBrackets = (brackets) => {
        // console.log(brackets)
        let currentDivision = brackets[0].division
        let bracketsByDivision = []
        let currentDivisionFighters = []

        brackets.map(bracket => {
            if (bracket.division !== currentDivision ) {
                // console.log('new division ' + bracket.division)
                // console.log('current division fighters')
                // console.log(currentDivisionFighters)
                bracketsByDivision.push(currentDivisionFighters)
                currentDivisionFighters = []
                currentDivision = bracket.division
                // console.log('new division is')
                // console.log(currentDivision)
            }
            currentDivisionFighters.push(bracket)
        })

        // console.log(bracketsByDivision)


        const trees = bracketsByDivision.map(divisionBrackets => {
            return(
                <div>
                    {
                        divisionBrackets.map(bracket => {
                            console.log(bracket)
                            return (
                                <Round>
                                    <Bracket
                                        fighter1={bracket.fighter1}
                                        fighter2={bracket.fighter2}
                                        division={bracket.division}
                                    />
                                </Round>
                            )
                        })
                    }
                </div>
            )
        })
        this.setState({...this.state, trees})
    }

    componentWillMount(){
        //fetch brackets
        fetch('/brackets', {
            method:'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({tournamentId:'1'})
        })
        .then(res => res.json())
        // .then(data => console.log(data))
        .then(data => this.mapToBrackets(data))
        .catch(err => console.log('ERROR FETCHING ' + err))
    }


    render(){
        
        return(
            <div>
                TREE<br/>
                {this.state.trees}
            </div>
        )
    }
}