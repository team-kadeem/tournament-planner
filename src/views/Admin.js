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
        this.getAllTournaments()
    }

    getAllTournaments = () => {
        const params = {
            method:'POST',
            body:JSON.stringify({key:'admin'}),
            headers:{
                "content-type":"application/json"
            }
        }

        fetch('/tournaments', params)
            .then(res => res.json())
            .then(data => this.createTournamentObject(data))
            .then(tournamentObject => this.populateAllTournaments(tournamentObject))
            .then(tournamentList => this.setState({...this.state, allTournaments:tournamentList}))
            .catch(err => console.log(`Error fetching tournaments: ${err}`))
    }

    createTournamentObject = (tournamentData) => {
        let tournamentObject = {}

        tournamentData.forEach(row => {
            if (row.title in tournamentObject ) {
                const name = row.first_name + ' ' + row.last_name
                tournamentObject[row.title] = {
                    ...tournamentObject[row.title],
                }
                tournamentObject[row.title][name] = row.usa_boxing_id
            }
            else{
                const name = row.first_name + row.last_name
                tournamentObject[row.title] = {}
                tournamentObject[row.title]['id'] = row.id
                tournamentObject[row.title]['bracketMade'] = row.bracket_made
                tournamentObject[row.title]['closeDate'] = row.registration_close
                tournamentObject[row.title][name] = row.usa_boxing_id
            }
                
        })
        return tournamentObject
    }

    populateAllTournaments = (tournamentObject) => {
        let allTournaments = []
        Object.keys(tournamentObject).forEach(tournamentName => {
            let tournament = {}
            tournament[tournamentName] = tournamentObject[tournamentName]
            allTournaments.push(tournament)
        })
        return allTournaments
    }


    modifyTournamentShowData = (tournamentData) => {
        tournamentData.forEach(tournament => tournament['showDetail'] = false)
        return tournamentData
    }


    createNewTournament = () => {
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

    hideTournament = tableId => {
        const table = document.getElementById(tableId)
        table.style="display:none"
    }

    generateBracket = (tournamentId) => {
        const bracketParams = {
            method:'POST',
            body:JSON.stringify({tournamentId:tournamentId}),
            headers:{
                "content-type":"application/json"
            }
        }
        fetch ('/generate', bracketParams)
            .then(res => res.text())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }

    refresh = () => {
        this.getAllTournaments()
    }

    render(){
        const allTournaments = this.state.allTournaments.map( (tournament, i) => {
            let title = Object.keys(tournament)[0]
            console.log(tournament)
            return <TournamentDetail
                        key={tournament[title] + i}
                        id={tournament[title]['id']}
                        bracketMade={tournament[title]['bracketMade']}
                        title={title}
                        registrants={tournament[title]}
                        toggleHandler={this.toggleTournamentDetail} 
                        generateHandler={this.generateBracket}
                        hideTournament={this.hideTournament}
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
                            refresh={this.refresh}
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
                                style={{...Styles.buttonStyle, backgroundColor:'blue', marginRight:'20px'}}
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