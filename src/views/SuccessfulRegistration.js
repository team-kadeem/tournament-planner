import React from 'react'
import { Flex, Box } from 'rebass'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled(Flex)({
    height:'100vh',
    width:'100vw'
})

Container.defaultProps = {
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
}


export default class SuccessfulRegistration extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentWillMount = () => {
        const searchParam = this.props.location.search.split('=')
        console.log(searchParam)
        const checkoutId = searchParam[1].split('&')[0]
        const transactionId = searchParam[2]

        fetch('/payment', {
            method:'POST',
            body:JSON.stringify({
                checkoutId,
                transactionId
            }),
            headers:{
                "content-type":"application/json"
            }
        })
            .then(res => res.text())

    }

    render(){
        const linkStyle = {
            color:'#fff',
            display:'inline'
        }

        const textStyle = {
            fontSize:'18px'
        }

        return (
            <div>
                <Container>
                    <h3 style={textStyle}>
                        Successful Registration!
                    </h3>

                    <h3 style={textStyle}>
                        Click <Link style={linkStyle} to="/">here</Link> to go back
                    </h3>
                </Container>

            </div>
        )
    }
}