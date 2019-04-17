import React from 'react'
import Auth from '../components/Auth/Auth'

export default class Login extends React.Component {
    componentWillMount = () => {
        const auth = new Auth()
        auth.login();
      }
    
      render(){
        return(
          <div/>
        )
      }
}