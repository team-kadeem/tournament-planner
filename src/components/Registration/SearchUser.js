import React from 'react'
import './Styles/SearchUser.css'

const SearchUser = (props) => {

    const inputStyle = {
        width:'25%',
        height:'40px',
        fontSize:'14px',
        marginBottom:'10px'
    }
    
    const submitButton = {
        height:'45px',
        backgroundColor:'#8EA6A9',
        color:'#FFF',
        fontSize:'14px',
        borderRadius:'10px',
        width:'15%',
        outline:'0',
        cursor:'pointer',
        fontWeight:'700'

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
                    
                <input style={submitButton} type="submit" value="Search"/>
            </form>
        </div>
    )
}

export default SearchUser;