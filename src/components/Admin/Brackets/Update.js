import React from 'react'

export default class Update extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            highlighted:false
        }
    }

    declareWinner = (e) => {
        this.props.declareWinner(
            this.props.fighter,
            this.props.otherFighter, 
            this.props.bracketNumber, 
            this.props.tournamentId, 
            this.props.roundNumber,
            this.props.division
            )
    }
    render(){
        const updateBox = {
            border:'1px solid black',
            position:'absolute',
            left:'185px',
            bottom:'2px',
            width:'120px',
            height:'25px',
            cursor:'pointer',
            padding:'1px 10px',
            fontWeight:'700'
        }

        const highlightedUpdateBox = {
            ...updateBox,
            backgroundColor:'#333d54',
            color:'white'
        }

        return (
            <div 
                style={this.props.highlighted ? highlightedUpdateBox : updateBox}
                onMouseEnter={this.props.highlight}
                onMouseLeave={this.props.highlight}
                onClick={this.declareWinner}
            >
                Declare Winner
            </div>
        )
    }
}
