import React from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'

const Container = styled(Flex)({
    width:'100vw',
    height:'100vh'
})

Container.defaultProps = {
    justifyContent:'center',
    alignItems:'center',
}

const Center = (props) => {
    Container.defaultProps.flexDirection = props.direction

    return(
        <Container>
            {props.children}
        </Container>
    )
}

export default Center;