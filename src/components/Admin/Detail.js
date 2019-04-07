import React from 'react'
import { Box } from 'rebass'

const detailStyle = {
    height:'25%',
    width:'27vw',
    marginBottom:'20px'
}

const insideStyle = {
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