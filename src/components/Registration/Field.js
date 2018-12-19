import React from 'react'
import { FaAsterisk } from 'react-icons/fa'


const Field = (props) => {

    const validateInput = (evt) => {
        console.log('validating input')
        props.onChange(evt)

        if (props.validation(evt.target.value)) { //valid input, update fields in parent
            console.log('inside first block')
            return props.updateErrors(evt.target.name, false)
        } else { //invalid input, update fields and errors in parent
            console.log('inside second block')
            return props.updateErrors(evt.target.name, true)

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
            ...props.customStyle
        }
    } else if (props.types === 'checkbox') {
        inputStyle = {
            
            // marginBottom:'10px'
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
        paddingLeft:'10px'
    }

    return(
        <div>
            <label style={labelStyle}>
                {props.label} {props.required ? <FaAsterisk style={asteriskStyle} /> : null}
                {props.errorPresent ? <span style={{color:'red'}}>Invalid Input</span> : null}
                <input
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