import React from 'react'
import { Link } from 'react-router-dom'


const Tournament = (props) => {
    return(
        <div className="tournament-flex-container">
            <div>
                <Link to="/register">{props.title}</Link>
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