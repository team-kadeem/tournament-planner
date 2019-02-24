import React from 'react'
import Tournament from '../components/Home/Tournament'
import Gloves from '../images/gloves.svg'
import Styles from '../themes/Styles'

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
            .catch(error => console.log('Error fetching tournaments ' + error))
    }

    setAvailableTournaments = (tournamentObjects) => {
        let tournaments = []
        const keys = Object.keys(tournamentObjects)
        keys.forEach(key => tournaments.push(tournamentObjects[key]))
        this.setState({tournaments})
    }

    render(){

        const availableTournaments = this.state.tournaments.map(tournament => {
            return(
                <Tournament 
                    title={tournament.title}
                    closeDate={tournament.registration_close}
                    id={tournament.id}
                />
            )
        })

        return(
            <div>
                <div style={Styles.imageContainer}>
                    <img 
                        src={Gloves} 
                        style={Styles.primaryImageStyle}
                    />
                </div>
                <div style={Styles.detailContainer}>
                    Available Tournaments
                    {availableTournaments}
                </div>

            </div>
        )
    }
}