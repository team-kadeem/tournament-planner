import React from 'react'
import { FaAsterisk } from 'react-icons/fa'


const Field = (props) => {

    const validateInput = (evt) => {
        if (props.required) {
            if (props.validation(evt.target.value)) props.onChange(evt, false) //valid input
            if (!props.validation(evt.target.value)) props.onChange(evt, true) //invalid input  
        }
        else{
            props.onChange(evt,false)
        }

    }


    let inputStyle = null;
    if (props.type === 'text') {
        inputStyle = {
            height:'30px',
            width:'250px',
            display:'block',
            fontSize:'16px',
            paddingLeft:'10px',
            marginLeft:'10px',
            ...props.customStyle
        }
    } else if (props.types === 'checkbox') {
        inputStyle = {

        }
    } else {
        inputStyle = {
            // marginBottom:'10px'
        }
    }

    const asteriskStyle = {
        color:'red',
        fontSize:'8px',
        position:'relative',
        bottom:'5px',
        right:'5px'
    }

    const labelStyle = {
        paddingLeft:'20px'
    }

    return(
        <div>
            <label style={labelStyle}>
                {props.label} {(props.required && props.type !== 'checkbox') ? <FaAsterisk style={asteriskStyle} /> : null}
                {props.errorPresent ? <span style={{color:'red'}}>Invalid Input</span> : null}
                <input
                    disabled={props.disabled}
                    type={props.type}
                    value={props.value}
                    name={props.name}
                    style={inputStyle}
                    onChange={validateInput}
                    checked={props.checked}
                />
            </label>
        </div>
    )
}

export default Field;