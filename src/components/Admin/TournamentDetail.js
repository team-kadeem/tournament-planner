import React from 'react'
import { Link } from 'react-router-dom'

const TournamentDetail = (props) => {
    console.log(props)

    const generateBracket = () => {
        props.generateHandler(props.id)
    }

   const participants = Object.keys(props.registrants).map(name => {
       const listStyling = {
        listStyleType:'none'
       }

       const listItemStyling = {
           fontSize:'14px',
       }
            if (name === 'id' || name === 'bracket_made') {
               return 
            }
            return(
                <ul style={listStyling} key={props.title + ' participants'}>
                    <li style={listItemStyling}>
                        {name}: {props.registrants[name]}
                    </li>
                </ul>
            )
    })

    const Generate = () => {
        return(
            <div>
                <button onClick={generateBracket}>Generate Brackets</button>
            </div>
        )
    }

    const BracketLink = () => {
        return(
            <Link to={'/bracket/' + props.id}>
                See Bracket
            </Link>
        )
    }

    const hideTournament = () => {
        const tableId = props.title + " " + props.id
        props.hideTournament(tableId)
    }

    const tableStyle = {
        width:'80%'
    }
   
    return(
        <div style={{margin:'10px 0'}}>
            <table style={tableStyle}>
                <button onClick={hideTournament}>
                    {props.buttonText ? <span>Show This Tournament</span> : <span>Hide This Tournament</span>}
                </button>
                <tbody id={props.title + " " + props.id}>
                    <tr>
                        <th>
                            Open Until
                        </th>
                        <th>
                            Participants
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                    <tr>
                        <th>

                        </th>
                        <th>
                            {participants}
                            <button>
                                See More...
                            </button>
                        </th>
                        <th>
                            {props.bracketMade ? <BracketLink/> : <Generate />}
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TournamentDetail;