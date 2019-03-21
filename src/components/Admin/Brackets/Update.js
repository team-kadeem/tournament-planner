import React from 'react'

export default class Update extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            highlighted:false
        }
    }

    declareWinner = (e) => {
        //REPLACE 1 WITH THE ACTUAL TOURNAMENT NUMBER
        this.props.declareWinner(this.props.fighter, this.props.bracketNumber, 1)
    }
    render(){
        const updateBox = {
            border:'1px solid grey',
            position:'absolute',
            left:'185px',
            bottom:'2px',
            width:'120px',
            height:'25px',
            cursor:'pointer',
        }

        const highlightedUpdateBox = {
            ...updateBox,
            backgroundColor:'#3345FF',
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
