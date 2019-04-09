import React from 'react'
import Tree from '../components/Admin/Brackets/Tree'

export default class Brackets extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tournamentName:'Loading...'
        }
    }

    componentWillMount = () => {
        console.log(this.props)
        fetch('/tournament_name', {
            method:'POST',
            body:JSON.stringify({tournamentId:this.props.match.params.tournamentId}),
            headers:{
                "content-type":"application/json"
            }
        })
            .then(res => res.text())
            .then(tournamentName => this.setState({tournamentName}))
            .catch(e => `error getting name ${e}`)
    }


    render(){
        const containerStyle = {
            margin:'30px 0'
        }

        const headingStyle = {
            textAlign:'center'
        }

        return(
            <div style={containerStyle}>
                {this.props.location.state ? <p>ADMIN VIEW</p> : <p>REGULAR VIEW</p>}
                <h1 style={headingStyle}>{this.state.tournamentName}</h1>
                <Tree
                    authenticated={this.props.location.state || false}
                    tournamentId={this.props.match.params.tournamentId} />
            </div>
        )
    }
}