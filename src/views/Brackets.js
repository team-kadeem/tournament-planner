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
                <h1 style={headingStyle}>{this.state.tournamentName}</h1>
                <Tree tournamentId={this.props.match.params.tournamentId} />
            </div>
        )
    }
}