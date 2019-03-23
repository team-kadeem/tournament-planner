import React from 'react'
import Tree from '../components/Admin/Brackets/Tree'
export default class Brackets extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        console.log(this.props)
        return(
            <div>
                Bracket for {this.props.match.params.tournamentId}
                <Tree tournamentId={this.props.match.params.tournamentId} />
            </div>
        )
    }
}