import React from 'react'
import { Link } from 'react-router-dom'

const TournamentDetail = (props) => {
    console.log(props)

    const generateBracket = () => {
        props.generateHandler(props.id)
    }

   const participants = Object.keys(props.registrants).map(name => {
       const listItemStyling = {
           marginBottom:'4px',
           fontSize:'14px'
       }
            if (name === 'id' || name === 'bracket_made') {
               return 
            }
            return(
                <ul key={props.title + ' participants'}>
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
   
    return(
        <div style={{marginBottom:'10px'}}>
            <table>
                <tbody>
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