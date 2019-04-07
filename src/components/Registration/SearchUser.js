import React from 'react'
import { Button } from 'rebass'
import './Styles/SearchUser.css'

const SearchUser = (props) => {

    const inputStyle = {
        width:'25%',
        height:'40px',
        fontSize:'14px',
        marginBottom:'10px'
    }

    const buttonStyle = {
        cursor:'pointer',
        backgroundColor:'#d8d8d8',
        outline:'0'
    }

    const submitButton = {
        border:'0',
        cursor:'pointer',
        outline:'0',
        backgroundColor:'rgba(255,255,255,0)',
        color:'#fff',
        fontWeight:'bold',
        fontSize:'16px'
    }

    return(
        <div style={{height:'100vh'}}>
            <form className="search-container" onSubmit={props.submissionHandler}>
                <label style={{marginBottom:'10px'}}>
                    Enter Your USA Boxing ID
                </label>
                <input
                    style={inputStyle}
                    name="usaBoxingId"
                    onChange={props.updateHandler} 
                    type="text"
                    placeholder="USA Boxing ID:" 
                />
                <Button style={buttonStyle}>
                    <input style={submitButton} type="submit" value="Search" />
                </Button>
            </form>
        </div>
    )
}

export default SearchUser;