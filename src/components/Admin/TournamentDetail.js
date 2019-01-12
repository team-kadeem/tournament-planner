import React from 'react'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const TournamentDetail = (props) => {

    const toggleHandler = (evt) => {
        console.log(evt)
        props.toggleHandler(props.title)
    }

    const dropdownArrowStyle = {
        cursor:'pointer',
        position:'relative',
        top:'3px'
    }

    return(
        <div>
            {props.title}
            {props.showDetail ? 
                <IoIosArrowUp style={dropdownArrowStyle} onClick={toggleHandler}/> : 
                <IoIosArrowDown style={dropdownArrowStyle} onClick={toggleHandler}/>            
            } 

            {
                props.showDetail ? <div>Tournament Details </div> : null 
            }
    </div>
    )
}

export default TournamentDetail;