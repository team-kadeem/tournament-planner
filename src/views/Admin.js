import React from 'react'
import TournamentDetail from '../components/Admin/TournamentDetail'
import TournamentForm from '../components/Admin/TournamentForm'
import Belt from '../images/championbelt.svg'
import Styles from '../themes/Styles'

export default class Admin extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showTournamentForm:false,
            showAllTournaments:false,
            allTournaments:[],
        }
    }

    componentDidMount(){
        const params = {
            method:'POST',
            body:JSON.stringify({key:'admin'}),
            headers:{
                "content-type":"application/json"
            }
        }

        fetch('/tournaments', params)
            .then(res => res.json())
            .then(data => this.modifyTournamentData(data))
            .then(tournaments => this.setState({...this.state, allTournaments:tournaments}))
            .catch(err => console.log(`Error fetching tournaments: ${err}`))
    }

    modifyTournamentData = (tournamentData) => {
        tournamentData.forEach(tournament => tournament['showDetail'] = false)
        return tournamentData
    }

    createNewTournament = () => {
        console.log('creating new tournament')
        this.setState(previousState => {
            return {
                ...this.state, showTournamentForm:!this.state.showTournamentForm
            }
        })
    }

    toggleTournamentDetail = (targetName) => {
        let allTournaments = [...this.state.allTournaments]
        allTournaments.forEach(tournament => {
            if (tournament.title == targetName) tournament.showDetail = !tournament.showDetail
        })

        this.setState({...this.state, allTournaments:allTournaments})

    }

    viewTournaments = () => {
        console.log('getting all tournaments')
        this.setState(previousState => {
            return {
                ...this.state, showAllTournaments: !previousState.showAllTournaments
            }
        })
    }

    generateBracket = (tournamentId) => {
        console.log('Generating bracket for tournament: ' + tournamentId)
    }

    render(){

        const allTournaments = this.state.allTournaments.map( tournament => {
            return <TournamentDetail 
                        {...tournament} 
                        toggleHandler={this.toggleTournamentDetail} 
                        generateHandler={this.generateBracket}
                    />
        })

        return(
            <div>
                <div style={Styles.imageContainer}>
                    <img 
                        src={Belt} 
                        style={Styles.primaryImageStyle}
                    />
                </div>

                <div style={Styles.detailContainer}>
                    <p>Hello Admin.  What would you like to do?</p>
                    <br/>
                    {this.state.showTournamentForm ? 
                        <TournamentForm 
                            newId={this.state.allTournaments.length + 1}
                            closeForm={this.createNewTournament}
                        /> :
                        <button 
                            style={{...Styles.buttonStyle, marginRight:'20px', backgroundColor:'red'}}
                            onClick={this.createNewTournament}
                        >
                            Create New Tournament
                        </button>
                    }

                    {
                        this.state.showAllTournaments ? 
                            <div>
                                { allTournaments }
                                    <button 
                                        style={{...Styles.buttonStyle, backgroundColor:'blue'}}
                                        onClick={this.viewTournaments}
                                    >
                                        Hide Tournaments
                                    </button>
                            </div> : 
                            <button 
                                style={{...Styles.buttonStyle, backgroundColor:'blue'}}
                                onClick={this.viewTournaments}
                            >
                                View All Tournaments
                            </button>
                        
                    } 
                </div>

            </div>
        )
    }
}