import React from 'react'
import styled from 'styled-components'
import { Box, Flex } from 'rebass'
import {
    BlueButton
} from '../components/Shared/Buttons'

const Container = styled(Flex)({
    width:'100vw',
    height:'100vh'
})

Container.defaultProps = {
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column'
}


export default class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            input:''
        }
    }

    submitPassword = e => {

    }

    updatePassword = e => {

    }

    render(){

        return(
            <form onSubmit={this.submitPassword}>
                <Container
                    justifyContent="center"
                    alignItems="center">
                        <input
                            type="password"
                            onChange={this.updatePassword}/>
                        
                        <input
                            type="submit"
                            value="Go"/>                
                </Container>

            </form>
        )
    }
}