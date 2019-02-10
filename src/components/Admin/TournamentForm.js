import React from 'react'
import Styles from '../../themes/Styles'
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

    checkErrorStatus = () => {
        const errors = Object.keys(this.state.errors).filter(objectKey =>{
            // console.log(this.state.errors[objectKey] === true)
            // this.state.errors[objectKey]
            return this.state.errors[objectKey] === true
        })
        return errors
        // if (errors.length > 0)
        //     return this.setState({...this.state, errorPresent:true})
        // else {
        //     return this.setState({...this.state, errorPresent:false})
        // }
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
            .catch(err => console.log(`Error creating new tournament ${err}`))
    }

    validateInput = (evt) => {
        if (evt.target.name === 'title' || evt.target.name === 'address'){
            return !(evt.target.value.length === 0)

        }

        if (evt.target.name === 'eventDate' || evt.target.name === 'closeDate') {
            return validator.isAfter(evt.target.value)
        }

    }

    updateInput = (evt) => {
        let fields = Object.assign({}, this.state.fields)
        let errors = Object.assign({}, this.state.errors)
        fields[evt.target.name] = evt.target.value

        //FALSE = ERROR PRESENT
        if (this.validateInput(evt)){
            errors[evt.target.name] = false
        }
            

        else {
            errors[evt.target.name] = true
        }

        this.setState({...this.state, fields:fields, errors:errors}, this.toggleErrorPresent())


    }

    toggleErrorPresent = () => {
        if (this.checkErrorStatus().length > 0)
            return this.setState({errorPresent:true, ...this.state}, () => console.log('AFTER SETTING TATE'))
        else
            return this.setState({errorPresent:false, ...this.state}, () => console.log('AFTER SETTING STATE'))
        
    }



    render(){

        const inputStyle = {
            display:'block',
            marginBottom:'15px',
            height:'30px',
            width:'280px',
            fontSize:'16px',
            marginLeft:'10px',
            display:'block',
            textAlign:'center',
            margin:'15px auto'
        }

        const submitButton = {
            ...Styles.buttonStyle,
            backgroundColor:'#1659a1',
            display:'inline-block',
            marginRight:'5px'
        }

        const closeButton = {
            ...Styles.buttonStyle,
            display:'inline-block',
            backgroundColor:'red'
        }


        return(
            <div style={{marginBottom:'40px'}}>
                <form onSubmit={this.createNewTournament}>
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


                    <input
                        type="submit"
                        onSubmit={this.createNewTournament}
                        style={this.state.errorPresent ? {...submitButton, backgroundColor:'grey'} : {...submitButton}}
                        value="Create New Tournament"
                        disabled={this.state.errorPresent}
                    />

                    <button
                        onClick={this.props.closeForm}
                        style={closeButton}
                    >
                        Close Form
                    </button>
                </form>

            </div>
        )
    }
}

