import React from 'react'
import { WhiteButton, RedButton } from '../Shared/Buttons'
import validator from 'validator'

export default class TournamentForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            errorPresent:true,
            fields:{
                title:'',
                eventDate:null,
                closeDate:null,
                address:null,
                key:'new',
            },
            errors:{
                title:true,
                closeDate:true,
                eventDate:true,
                address:true
            }
        }
    }

    createNewTournament = (evt) => {
        evt.preventDefault()
        const params = {
            method:'POST',
            body:JSON.stringify(this.state.fields),
            headers:{
                "content-type":"application/json"
            }
        }
        fetch('/tournaments', params)
            .then(res => res.json())
            .then(data => console.log(data))
            .then(this.props.closeForm())
            .then(this.props.refresh())
            .catch(err => console.log(`Error creating new tournament ${err}`))
    }

    validInput = (evt) => {
        if (evt.target.name === 'title' || evt.target.name === 'address')
            return evt.target.value.length > 0

        if (evt.target.name === 'eventDate' || evt.target.name === 'closeDate')
            return validator.isAfter(evt.target.value)
    }

    updateInput = (evt) => {
        let fields = Object.assign({}, this.state.fields)
        let errors = Object.assign({}, this.state.errors)
        fields[evt.target.name] = evt.target.value

        if (this.validInput(evt))
            errors[evt.target.name] = false
        else 
            errors[evt.target.name] = true
        
        this.setState({...this.state, fields:fields, errors:errors}, () => this.toggleErrorPresent())
    }

    checkErrorStatus = () => {
        const errors = Object.keys(this.state.errors)
                        .filter(objectKey => this.state.errors[objectKey] === true)
        return errors
    }

    toggleErrorPresent = () => {
        if (this.checkErrorStatus().length > 0)
            return this.setState({...this.state, errorPresent:true})
        else
            return this.setState({...this.state, errorPresent:false })
    }

    render(){
        const inputStyle = {
            display:'block',
            marginBottom:'15px',
            height:'30px',
            width:'280px',
            fontSize:'16px',
            marginLeft:'10px',
            textAlign:'center',
            margin:'15px auto'
        }

        const inputButton = {
            display:'none'
        }

        return(
            <div style={{marginBottom:'40px'}}>
                <form
                    style={{textAlign:'center'}}
                    onSubmit={this.createNewTournament}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        style={inputStyle}
                        onChange={this.updateInput}
                    />

                    <label>
                        Tournament Date (MM/DD/YYYY HH:MM AM/PM)
                        <input
                            type="text"
                            name="eventDate"
                            placeholder="mm/dd/yyyy hh:mm AM/PM"
                            style={inputStyle}
                            onChange={this.updateInput}
                        />
                    </label>

                    <label>
                        Tournament Location
                        <input
                            type="text"
                            placeholder="Address"
                            name="address"
                            style={inputStyle}
                            onChange={this.updateInput}
                        />
                    </label>


                    <label>
                        Registration Close Date (MM/DD/YYYY HH:MM AM/PM)
                        <input
                            type="text"
                            placeholder="(MM/DD/YYYY HH:MM AM/PM)"
                            name="closeDate"
                            style={inputStyle}
                            onChange={this.updateInput}
                        />
                    </label>

                        <WhiteButton custom={{marginRight:'10px'}}>
                            <input
                                type="submit"
                                style={inputButton}
                                onSubmit={this.createNewTournament}
                                value=""
                                disabled={this.state.errorPresent}
                            />
                            Create New Tournament
                        </WhiteButton>


                    <RedButton buttonHandler={this.props.closeForm}>
                        Close Form
                    </RedButton>
                </form>

            </div>
        )
    }
}

