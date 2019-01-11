import React from 'react'
import { Link } from 'react-router-dom'


const Tournament = (props) => {
    console.log(props)
    return(
        <div className="tournament-flex-container">
            <div>
                <Link to={'/register/' + props.id}>{props.title}</Link>
            </div>
            <div>
                Open Until: {props.closeDate}
            </div>
            <div>

            </div>
        </div>
    )
}

export default Tournament;