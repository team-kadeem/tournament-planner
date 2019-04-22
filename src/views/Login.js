import React from 'react'
import styled from 'styled-components'
import { Flex } from 'rebass'
import { WhiteButton } from '../components/Shared/Buttons'
import { Redirect } from 'react-router-dom'

const Container = styled(Flex)({
    width:'100vw',
    height:'100vh'
})

Container.defaultProps = {
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column'
}

const inputStyle = {
    width:'25%',
    height:'40px',
    fontSize:'14px',
    marginBottom:'10px'
}


export default class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            input:'',
            validation:'',
            feedback: ''
        }
    }

    handleValidation = validationStatus => {
        if (validationStatus === 'Good')
            this.setState({...this.state, validation:'Good'})
        else 
            this.setState({...this.state, feedback: 'Invalid'})
    }
    
    submitPassword = e => {
        e.preventDefault()
        fetch('/login', {
            method:'POST',
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(this.state)
        })
            .then(res => res.text())
            // .then(data => console.log(data))
            .then(validation => this.handleValidation(validation))
            .catch(err => `Err with submission ${err}`)
    }

    updatePassword = e => {
        const state = {...this.state}
        state['input'] = e.target.value
        this.setState(state)
    }

    render(){
        if (this.state.validation === 'Good') {
            return(
                <Redirect to="/admin" />
            )
        } else {
            return(
                <div>
                    {this.state.feedback}
                    <form onSubmit={this.submitPassword}>
                        <Container
                            justifyContent="center"
                            alignItems="center">
                                <input
                                    style={inputStyle}
                                    type="password"
                                    onChange={this.updatePassword}/>
                                <WhiteButton>
                                    Go
                                    <input
                                        style={{display:'none'}}
                                        type="submit"
                                        value="Go"/>    
                                </WhiteButton>
                        </Container>
                    </form>
                </div>
            )
        }
    }
}