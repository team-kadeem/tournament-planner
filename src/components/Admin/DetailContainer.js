import React from 'react'
import { Flex } from 'rebass'

const containerStyle = {
    border:'1px solid #333d54',
    backgroundColor:'#333d54'
}
const DetailContainer = (props) => {
    return(
        <Flex
            style={containerStyle}
            alignItems='center'
            justifyContent='center'
            flexDirection='row'>
                {props.children}
        </Flex>
    )
}

export default DetailContainer;