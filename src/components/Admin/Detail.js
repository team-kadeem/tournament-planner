import React from 'react'
import { Box, Flex } from 'rebass'

const detailStyle = {
    height:'25%',
    width:'27vw',
    marginBottom:'20px'
}

const insideStyle = {
    textAlign:'center'
}

const Detail = (props) => {
    return(
        <Flex
            style={detailStyle}
            justifyContent="center"
            alignItems="center">
            <Box style={insideStyle}>
                {props.children}
            </Box>
        </Flex>
    )
}

export default Detail;