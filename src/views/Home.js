import React from 'react'
import Tournament from '../components/Home/Tournament'

export default class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tournaments:[],
        }
    }

    componentWillMount(){
        const params = {
            method:'POST',
            headers:{
                'content-type':'application/json'
            }
        }
        fetch('/tournaments', params)
            .then(res => res.json())
            .then(data => this.setAvailableTournaments(data))
    }

    setAvailableTournaments = (tournamentObjects) => {
        let tournaments = []
        console.log(tournamentObjects)
        const keys = Object.keys(tournamentObjects)
        console.log(keys)
        keys.forEach(key => tournaments.push(tournamentObjects[key]))
        this.setState({tournaments})
    }

    render(){
        const availableTournaments = this.state.tournaments.map(tournament => {
            return(
                <Tournament 
                    title={tournament.title}
                    closeDate={tournament.close_date}
                    id={tournament.id}
                />
            )
        })

        return(
            <div>
                Available Tournaments
                {availableTournaments}
            </div>
        )
    }
}