import React from 'react'
import { Box } from 'rebass'

const detailStyle = {
    border:'1 px solid black',
    height:'25%',
    width:'27vw'
}

const insideStyle = {
    borderTop:'1px solid black'
}

const Detail = (props) => {
    return(
        <Box style={detailStyle}>
            <Box style={insideStyle}>
                {props.children}
            </Box>
        </Box>
    )
}

export default Detail;