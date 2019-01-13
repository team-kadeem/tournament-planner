import React from 'react'
import { Link } from 'react-router-dom'


const Tournament = (props) => {
    console.log(props)
    console.log(typeof(props.closeDate))
    const closeDate = new Date(props.closeDate).toDateString()
    return(
        <div className="tournament-flex-container">
            <div>
                <h3>{props.title}</h3>
                <Link to={'/register/' + props.id}>Click Here to Register</Link>
            </div>
            <div>
                Open Until: {closeDate}
            </div>
            <div>

            </div>
        </div>
    )
}

export default Tournament;