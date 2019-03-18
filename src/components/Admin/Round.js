import React from 'react'
import './Styles/Tree.css'


const Round = (props) => {
    return(
        <div className="round">
            {props.children}
        </div>
    )
}

export default Round