import React from 'react'
import { Flex } from 'rebass'
import { createBrowserHistory } from 'history'
import { WhiteButton } from '../components/Shared/Buttons'
import Center from '../components/Shared/CenterContainer'


export default class Payment extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            url:this.props.location.state.checkoutUrl

        }
    }

    render(){
        return(
            <Center>
                <Flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center">
                        <h3>
                            Click the button below to go to the payment page and complete your registration
                        </h3 >
                        <a href={this.state.url}>
                            <WhiteButton>
                                Complete Registration
                            </WhiteButton>
                        </a>
                </Flex>    
            </Center>
        

        )
    }
}