import React from 'react'
import './Styles/Tree.css'

const containerStyle = {
    // display:'inline-block'
}

const nameContainerStyleLeft = {
    // display:'inline-block',
    // position:'relative',
    // right:'40px',
    // width:'60px'
}

const nameContainerStyleRight = {
    // ...nameContainerStyleLeft,
    // left:'40px'
}

const bracketStyle = {
    borderTop:'1px solid black',
    borderRight:'1px solid black',
    borderBottom:'1px solid black',
    width:'120px',
    height:'40px',
    // marginBottom:'10px'
    // display:'inline-block'
}

const containerStyle = {
    margin:'10px 0'
}

const bracketStyleRound = {
    
}

const Bracket = (props) => {
    return(
        <div style={containerStyle}>
            {props.fighter1}
            <div style={bracketStyle}/>
            {props.fighter2}
        </div>
    )
}

export default Bracket