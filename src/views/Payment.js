import React from 'react'
import { Flex } from 'rebass'
import { createBrowserHistory } from 'history'
import { WhiteButton } from '../components/Shared/Buttons'



export default class Payment extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            url:null

        }
    }

    componentWillMount = () => {
        const history = createBrowserHistory()
        if (this.props.location.state) {
            fetch('/payment', {
                method:'POST',
                headers:{
                    'content-type':'application/json'
                }
            })
                .then(res => res.text())
                .then(url => this.setState({...this.state, url}))
        } else {
            history.push('/')
            history.go()
        }

    }

    render(){
        return(
                <Flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center">
                        <h2>
                            Click the button below to go to the payment page and complete your registration
                        </h2 >
                        <a href={this.state.url}>
                            <WhiteButton>
                                Complete Registration
                            </WhiteButton>
                        </a>
                </Flex>            

        )
    }
}