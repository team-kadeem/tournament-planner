import React from 'react'
import { Link } from 'react-router-dom'


export default class TournamentDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            start:0,
            end:10
        }
    }

    generateBracket = () => {
        this.props.generateHandler(this.props.id)
    }

    showMore = () => {
        let start = this.state.start + 10
        let end = this.state.end + 10

        if (start > Object.keys(this.props.registrants).length - 3) {
            start = 0
            end = 10
        }
        this.setState({start, end})
    }

    render(){
        const closeDate = new Date(this.props.closeDate).toDateString()
        const hideTournament = () => {
            const tableId = this.props.title + " " + this.props.id
            this.props.hideTournament(tableId)
        }

        const tableStyle = {
            width:'80%'
        }

        const listStyling = {
            listStyleType:'none',
        }
        const participants = Object.keys(this.props.registrants)
                                .slice(this.state.start, this.state.end)
                                .map(name => {
                                    const listItemStyling = {
                                        fontSize:'14px',
                                        marginBottom:'6px'
                                    }
                                            if (name === 'id' || name === 'bracketMade' || name === 'closeDate') {
                                            return 
                                            }
                                            return(
                                                    <li style={listItemStyling}>
                                                        {name}: {this.props.registrants[name]}
                                                    </li>
                                            )
                                    })
    return(
        <div style={{margin:'10px 0'}}>
        <table style={tableStyle}>
            <button onClick={hideTournament}>
                {this.props.buttonText ? <span>Show This Tournament</span> : <span>Hide This Tournament</span>}
            </button>
            <tbody id={this.props.title + " " + this.props.id}>
                <tr>
                    <th>
                        Open Until
                    </th>
                    <th>
                        Participants
                    </th>
                    <th>
                        Action
                    </th>
                </tr>
                <tr>
                    <th>
                        <span>{closeDate}</span>
                    </th>
                    <th>
                        <ul style={listStyling} key={this.props.title + ' participants'}>
                            {participants}
                        </ul>

                        <button onClick={this.showMore}> 
                            See More...
                        </button>
                    </th>
                    <th>
                        {this.props.bracketMade ? 
                             <Link to={'/bracket/' + this.props.id}>See Bracket</Link>:
                             <button onClick={this.generateBracket}>Generate Brackets</button>
                        }
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
)
    }
 
}
