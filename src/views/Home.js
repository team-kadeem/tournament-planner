import React from 'react'
import Tournament from '../components/Home/Tournament'
import Gloves from '../images/gloves.svg'
import { Flex } from 'rebass'

export default class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tournaments:[],
        }
    }

    componentWillMount(){
        const params = {
            method:'GET',
            headers:{
                'content-type':'application/json'
            }
        }
        fetch('/home', params)
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
            <Flex
                justifyContent='center'
                alignItems='center'
                flexDirection='column'>
                <div style={{height:'25%', width:'50%'}}>
                    <img alt="logo" height='100%' width='100%' src={Gloves} />
                </div>
                
                <div>
                    <h2 style={{textAlign:'center'}}>Available Tournaments</h2>
                    {availableTournaments}
                </div>

            </Flex>
        )
    }
}