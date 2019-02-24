import React from 'react'

const SearchUser = (props) => {
    return(
        <div>
            <form onSubmit={props.submissionHandler}>
                <label>
                    Enter Your USA Boxing ID
                </label>
                <input
                    name="usaBoxingId"
                    onChange={props.updateHandler} 
                    type="text"
                    placeholder="USA Boxing ID:" 
                />
                    
                <input type="submit" value="Search"/>
            </form>
        </div>
    )
}

export default SearchUser;