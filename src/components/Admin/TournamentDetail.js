import React from 'react'
import DetailContainer from './DetailContainer'
import Detail from './Detail'
import { Link } from 'react-router-dom'
import { WhiteButton } from '../Shared/Buttons'



export default class TournamentDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            start:0,
            end:10
        }
    }

    generateBracket = () => this.props.generateHandler(this.props.id)
    
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

        const bracketLink = {
            textDecoration:'none',
            color:'rgb(51,51,51)'
        }

        const listStyling = {
            textAlign:'center',
            height:'220px'
        }

        const listItemStyling = {
            listStyleType:'none',
            fontSize:'14px',
            marginBottom:'6px',
            textAlign:'center'
        }
        const participants = Object.keys(this.props.registrants)
                                .filter(item => item !== 'id' && item !== 'bracketMade' && item !== 'closeDate')
                                .slice(this.state.start, this.state.end)
                                .map(name => {
                                        return(
                                            <li style={listItemStyling}>
                                                {name}: {this.props.registrants[name]}
                                            </li>
                                        )
                                        })
    return(
        <div style={{margin:'50px 0'}}>
            <DetailContainer>
                <Detail>
                    Open Until: <br/>
                    <span>{closeDate}</span>
                </Detail>

                <Detail>
                    Registrants
                    <ul style={listStyling} key={this.props.title + ' participants'}>
                        {participants}
                    </ul>
                    <WhiteButton buttonHandler={this.showMore}> 
                        Show More 
                    </WhiteButton>
                </Detail>
                
                <Detail>
                    {this.props.bracketMade ?
                    <WhiteButton>
                        <Link 
                            style={bracketLink} 
                            to={{
                                pathname:'/bracket/' + this.props.id,
                                state: {authenticated:true}
                                }}>
                            See Bracket
                        </Link>
                    </WhiteButton> 
                    :
                    <WhiteButton buttonHandler={this.generateBracket}>
                            Generate Brackets
                    </WhiteButton>
                    }
                </Detail>
            </DetailContainer>
        </div>
    )
        }
    
    }
