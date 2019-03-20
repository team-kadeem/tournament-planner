import React from 'react'

export default class Update extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            highlighted:false
        }
    }
    render(){
        console.log(this.props)
        const updateBox = {
            border:'1px solid grey',
            // position:'absolute',
            // left:`${this.props.x}px`,
            // top:`${this.props.y}px`
        }

        const highlightedUpdateBox = {
            ...updateBox,
            backgroundColor:'blue'
        }

        return (
            <div style={this.state.highlighted ? highlightedUpdateBox : updateBox}>
                Declare Winner
            </div>
        )
    }
}
