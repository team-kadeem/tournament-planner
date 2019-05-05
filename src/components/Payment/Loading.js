import React from 'react'
import './Payment.css'

const progressBar = {
    height:'100px',
    width:'100px',
    borderRadius:'50%',
    borderLeft:'5px solid #fff'
}
const Loading = (props) => {
    return(
        <div className="loading" style={progressBar}>

        </div>
    )
}

export default Loading;