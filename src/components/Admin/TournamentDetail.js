import React from 'react'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from 'react-router-dom'

const TournamentDetail = (props) => {
    console.log(props)
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

   const participants = Object.keys(props.registrants).map(name => {
       const listItemStyling = {
           marginBottom:'4px',
           fontSize:'14px'
       }
            if (name === 'id') {
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
                            <Generate/>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    )

    // const formattedRegistrants = props.registrants.map(fighter => {
    //     console.log(fighter)
    //     if (fighter === "null" || fighter === "null null") {
    //         return
    //     } else {
    //         return <li style={{marginBottom:'3px'}}>{fighter}</li>
    //     }
    // })



    // return(
    //     <div style={{marginTop:'15px'}}>
    //         {props.title}
    //         {props.showDetail ? 
    //             <IoIosArrowUp style={dropdownArrowStyle} onClick={toggleHandler}/> : 
    //             <IoIosArrowDown style={dropdownArrowStyle} onClick={toggleHandler}/>            
    //         } 

    //         {
    //             props.showDetail ? 
    //             <div>
    //                 Tournament Details
    //                 <table>
    //                     <tbody>
    //                         <tr>
    //                             <th>
    //                                 Open Until:
    //                             </th>
    //                             <th>
    //                                 Entries:
    //                             </th>
    //                             <th>
    //                                 Action
    //                             </th>
    //                         </tr>

    //                         <tr>
    //                             <td>{props.closeDate}</td>
    //                             <td>
    //                                 <ul>
    //                                     {formattedRegistrants}
    //                                 </ul>
    //                             </td>
    //                             <td>                    
    //                                 <button onClick={generateBracket}>
    //                                     Generate Bracket
    //                                 </button>
    //                                 <br/>
    //                                 <Link to={'/bracket/' + props.id}>View Bracket</Link>
    //                             </td>
    //                         </tr>
    //                     </tbody>
    //                 </table>

    //             </div> 
    //             : null 
    //         }
    //     </div>
    // )
}

export default TournamentDetail;