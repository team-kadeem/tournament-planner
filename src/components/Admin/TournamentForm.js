import React from 'react'

export default class TournamentForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            fields:{
                title:'',
                closeDate:null,
                key:'new',
                count:this.props.newId
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
            .catch(err => console.log(`Error creating new tournament ${err}`))
    }

    updateInput = (evt) => {
        let fields = Object.assign({}, this.state.fields)
        fields[evt.target.name] = evt.target.value
        this.setState({fields})
    }

    render(){

        const inputStyle = {
            display:'block',
            marginBottom:'15px',
            height:'30px',
            width:'280px',
            fontSize:'16px',
            marginLeft:'10px'
        }

        const submitButton = {
            padding:'10px 0 10px 0',
            backgroundColor:'#1659a1',
            color:'white',
            fontSize:'16px',
            height:'50px',
            cursor:'pointer'
        }

        const closeButton = {
            backgroundColor:'red',
            fontSize:'16px',
            outline:'0',
            color:'white',
            cursor:'pointer'
        }

        return(
            <div>
                <form onSubmit={this.createNewTournament}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        style={inputStyle}
                        onChange={this.updateInput}
                    />

                    <input
                        type="date"
                        name="closeDate"
                        style={inputStyle}
                        onChange={this.updateInput}
                    />

                    <input
                        type="submit"
                        onSubmit={this.createNewTournament}
                        style={{...inputStyle, ...submitButton}}
                        value="Create New Tournament"
                    />
                </form>
                <button
                    onClick={this.props.closeForm}
                    style={closeButton}
                >
                    Close Form
                </button>
            </div>
        )
    }
}

