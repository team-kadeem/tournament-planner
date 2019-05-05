import React from 'react'
import { Flex } from 'rebass'
import { WhiteButton } from '../components/Shared/Buttons'

export default class Payment extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            url:null

        }
    }

    componentWillMount = () => {
        fetch('/payment', {
            method:'POST',
            headers:{
                'content-type':'application/json'
            }
        })
            .then(res => res.text())
            .then(url => this.setState({...this.state, url}))
    }

    render(){
        return(
            <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center">
                    Click the button below to go to the payment page and complete your registration
                    <a href={this.state.url}>
                        <WhiteButton>
                            Complete Registration
                        </WhiteButton>
                    </a>
            </Flex>
        )
    }
}