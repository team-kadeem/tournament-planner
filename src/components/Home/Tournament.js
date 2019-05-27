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
    console.log('Tournament props')
    console.log(props)
    console.log(now)
    // const closeDate = new Date(props.closeDate).toDateString()
    const closeDate = new Date(props.closeDate)
    console.log(closeDate > now)
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

            {closeDate > now ? 
                <div>Registration Open Until: {closeDate.toDateString()}</div> : <div>Registration Closed</div>
            }


            <div>
                <Link style={linkStyle} to={"/bracket/" + props.id}>
                    View Bracket
                </Link>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Tournament;