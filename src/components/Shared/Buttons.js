import React from 'react'
import { Button } from 'rebass'
import theme from '../../theme'

//consider how to handle buttons when form submission is invalid
const sharedStyles = {
    padding:'10px 20px',
    color:'#fff',
    cursor:'pointer',
    borderRadius:'8px',
    outline:'0'
}
const blueButtonStyle = {
    ...sharedStyles,
    backgroundColor:theme.secondaryBlue,
    border:`1px solid ${theme.secondaryBlue}`
}

const whiteButtonsStyle = {
    ...sharedStyles,
    backgroundColor:'#fff',
    color:`${theme.black}`,
    border:'1px solid #fff'
}

const redButtonStyle = {
    ...sharedStyles,
    backgroundColor:theme.primaryRed
}


export const BlueButton = (props) => {
    return(
        <Button
            name={props.name}
            onClick={props.buttonHandler}
            style={{...blueButtonStyle, ...props.custom}}
            >
            {props.children}
        </Button>
    )
}


export const WhiteButton = (props) => {
    return(
        <Button
            name={props.name}
            onClick={props.buttonHandler}
            style={{...whiteButtonsStyle, ...props.custom}}>
            {props.children}
        </Button>
    )
}

export const RedButton = (props) => {
    return(
        <Button
            name={props.name}
            onClick={props.buttonHandler}
            style={{...redButtonStyle, ...props.custom}}>
            {props.children}
        </Button>
    )
}

