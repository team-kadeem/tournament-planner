import React from 'react'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const TournamentDetail = (props) => {

    const toggleHandler = () => {
        props.toggleHandler(props.title)
    }

    const generateBracket = () => {
        props.generateHandler(props.id)
    }

    const dropdownArrowStyle = {
        cursor:'pointer',
        position:'relative',
        top:'3px'
    }

    const loadDetailCard = (fighter) => {
        props.fighterDetailHandler(fighter)
    }

    const formattedRegistrants = props.registrants.map(fighter => 
        <li 
            onMouseEnter={() => loadDetailCard(fighter)}
        >
                {fighter}
    </li>
    )



    return(
        <div style={{marginTop:'15px'}}>
            {props.title}
            {props.showDetail ? 
                <IoIosArrowUp style={dropdownArrowStyle} onClick={toggleHandler}/> : 
                <IoIosArrowDown style={dropdownArrowStyle} onClick={toggleHandler}/>            
            } 

            {
                props.showDetail ? 
                <div>
                    Tournament Details
                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    Open Until:
                                </th>
                                <th>
                                    Entries:
                                </th>
                                <th>
                                    Action
                                </th>
                            </tr>

                            <tr>
                                <td>{props.closeDate}</td>
                                <td>
                                    <ul>
                                        {formattedRegistrants}
                                    </ul>
                                </td>
                                <td>                    
                                    <button onClick={generateBracket}>
                                        Generate Bracket
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div> 
                : null 
            }
        </div>
    )
}

export default TournamentDetail;