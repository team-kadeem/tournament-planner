import React from 'react'
import Update from './Brackets/Update'
import './Styles/Tree.css'

export default class Bracket extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            updateFighter1:false,
            updateFighter2:false
        }
    }

    showUpdateBox = (e) => {
        console.log(e.target)
        console.log(e.target.id)
        let updateFighter1, updateFighter2
        if (e.target.id === updateFighter1) {
            updateFighter1 = true
            updateFighter2 = false
        } 
        if (e.target.id === updateFighter2) {
            updateFighter1 = false
            updateFighter2 = true
        }
        let state = Object.assign({}, this.state)
        state['updateFighter1'] = updateFighter1
        state['updateFighter2'] = updateFighter2
        return this.setState(state)
    }

    render(){
        const bracketStyle = {
            border:'1px solid black',
            marginBottom:'1px',
            width:'180px',
            height:'30px',
            textAlign:'center'
        }
        
        const containerStyle = {
            margin:'10px 0'
        }
        
        const fighterNames = {
            cursor:'pointer'
        }
        return(
            <div style={containerStyle}>
            <div style={bracketStyle} onClick={this.showUpdateBox}>
                <span id="updateFighter1" style={fighterNames}>{this.props.fighter1}</span>
                {this.state.updateFighter1 ? <p>hi</p> : null}
            </div>
            <div style={bracketStyle} onClick={this.showUpdateBox}>>
                <span id="updateFighter2" style={fighterNames}>{this.props.fighter2}</span>
                {this.state.updateFighter2 ? <p>fdjhsjef</p>: null}
            </div>
        </div>
        )
    }
}
