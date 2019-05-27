import React from 'react'
import { Link } from 'react-router-dom'

const containerStyle = {
    fontFamily:`Roboto`,
    marginBottom:'50px',
    textAlign:'center'
}

const linkStyle = {
    textDecoration:'none',
    color:'#fff',
    fontWeight:'700'
}

const headingStyle = {
    margin:'5px 0',
    fontFamily:'Roboto Condensed',
    color:'#00aeee'
}
const now = new Date()


const Tournament = (props) => {

    const closeDate = new Date(props.closeDate)
    return(
        <div style={containerStyle}>
            <div>
                <h2 style={headingStyle}>{props.title}</h2>
                {!props.bracketMade ?
                <strong>
                    <Link style={linkStyle} to={'/register/' + props.id}>
                        <strong><i>Click Here to Register</i></strong>
                    </Link>
                </strong> : null
                }
                
            </div>

            {props.bracketMade ? 
                <div>Registration Closed</div>: <div>Registration Open Until: {closeDate.toDateString()}</div>
            }


            {props.bracketMade ?
                <div>
                    <Link style={linkStyle} to={"/bracket/" + props.id}>
                        View Bracket
                    </Link>
                </div> : null
            }

        </div>
    )
}

export default Tournament;