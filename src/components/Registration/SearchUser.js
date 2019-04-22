import React from 'react'
import { WhiteButton } from '../Shared/Buttons'
import './Styles/SearchUser.css'

const SearchUser = (props) => {

    const inputStyle = {
        width:'25%',
        height:'40px',
        fontSize:'14px',
        marginBottom:'10px'
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
                <WhiteButton>
                    Search
                    <input style={{display:'none'}} type="submit" value="Search" />
                </WhiteButton>
            </form>
        </div>
    )
}

export default SearchUser;