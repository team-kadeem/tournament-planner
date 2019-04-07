import React from 'react'
import {
    Box,
    Flex
} from 'rebass'

const DetailContainer = (props) => {
    return(
        <Flex
            alignItems='center'
            justifyContent='center'
            flexDirection='row'>
            {props.children}
        </Flex>
    )
}

export default DetailContainer;