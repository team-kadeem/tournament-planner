import React from 'react'
import { Link } from 'react-router-dom'
import { Flex } from 'rebass'

const containerStyle = {
    fontFamily:`Roboto`,
    marginBottom:'50px'
}

const linkStyle = {
    textDecoration:'none',
    // color:'rgb(51, 51, 51)'
    color:'#fff'
}

const headingStyle = {
    margin:'5px 0',
    fontFamily:'Roboto Condensed'
}


const Tournament = (props) => {
    const closeDate = new Date(props.closeDate).toDateString()
    return(
        <div style={containerStyle}>
            <div>
                <h2 style={headingStyle}>{props.title}</h2>
                <strong>
                    <Link style={linkStyle} to={'/register/' + props.id}>
                        <strong><i>Click Here to Register</i></strong>
                    </Link>
                </strong>
                
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