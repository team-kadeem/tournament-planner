import React from 'react'
import TournamentDetail from '../components/Admin/TournamentDetail'
import TournamentForm from '../components/Admin/TournamentForm'
import Belt from '../images/championbelt.svg'
import ImageDisplay from '../components/Shared/ImageDisplay'
import { Flex } from 'rebass'
import { RedButton, BlueButton } from '../components/Shared/Buttons'
import { Redirect } from 'react-router-dom'

export default class Admin extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            authenticated:'',
            showTournamentForm:false,
            showAllTournaments:false,
            allTournaments:[],
        }
    }
    componentWillMount = () => {
        fetch('/admin', {
            method:'POST',
            headers:{
                "content-type":"application/json"
            }
        })
            .then(res => res.text())
            .then(authenticated => this.setState({...this.state, authenticated}))
    }

    componentDidMount = () => this.getAllTournaments()

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


    modifyTournamentShowData = tournamentData => tournamentData.forEach(tournament => tournament['showDetail'] = false)


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
            if (tournament.title === targetName) tournament.showDetail = !tournament.showDetail
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

    refresh = () => this.getAllTournaments()
    

    render(){
        const allTournaments = this.state.allTournaments.map( (tournament, i) => {
            let title = Object.keys(tournament)[0]
            return <TournamentDetail
                        key={tournament[title] + i}
                        id={tournament[title]['id']}
                        closeDate={tournament[title]['closeDate']}
                        bracketMade={tournament[title]['bracketMade']}
                        title={title}
                        registrants={tournament[title]}
                        toggleHandler={this.toggleTournamentDetail} 
                        generateHandler={this.generateBracket}
                        hideTournament={this.hideTournament}
                    />
        })
        if (this.state.authenticated === '') {
            return(
                <div>
                    Loading...
                </div>
            )
        } else {
            if (this.state.authenticated === 'Invalid') {
                return(
                    <Redirect to="/login" />
                )
            } else {
                return(
                    <div>
                        <ImageDisplay backgroundImage={Belt}/>
                              <Flex
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center">
                                <h2>Hello Admin.</h2>  
                                <p>What would you like to do?</p>
                                {this.state.showTournamentForm ? 
                                    <TournamentForm 
                                        newId={this.state.allTournaments.length + 1}
                                        closeForm={this.createNewTournament}
                                        refresh={this.refresh}
                                    /> :
                                    <RedButton buttonHandler={this.createNewTournament}>
                                        Create New Tournament
                                    </RedButton>
                                }  
                                <br/>
                                {this.state.showAllTournaments ? 
                                    <div>
                                        { allTournaments }
                                            <BlueButton buttonHandler={this.viewTournaments}>
                                                Hide Tournaments
                                            </BlueButton>
                                    </div> : 
                                    <BlueButton buttonHandler={this.viewTournaments} >
                                        View All Tournaments
                                    </BlueButton>
                                }
                            </Flex>
                     </div>
                )      
            }
                 
        }

    }
}

{/* <Flex 
alignItems='center'
justifyContent='center'>
<img alt="logo" height="20%" width="50%" src={Belt} />
</Flex>

<Flex
flexDirection="column"
alignItems="center"
justifyContent="center">
<h2>Hello Admin.</h2>  
<p>What would you like to do?</p>
{this.state.showTournamentForm ? 
    <TournamentForm 
        newId={this.state.allTournaments.length + 1}
        closeForm={this.createNewTournament}
        refresh={this.refresh}
    /> :
    <RedButton buttonHandler={this.createNewTournament}>
        Create New Tournament
    </RedButton>
}  
<br/>
{this.state.showAllTournaments ? 
    <div>
        { allTournaments }
            <BlueButton buttonHandler={this.viewTournaments}>
                Hide Tournaments
            </BlueButton>
    </div> : 
    <BlueButton buttonHandler={this.viewTournaments} >
        View All Tournaments
    </BlueButton>
}
</Flex> */}