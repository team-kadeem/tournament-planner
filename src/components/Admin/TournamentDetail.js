import React from 'react'


const TournamentDetail = (props) => {
    console.log(props)

    const generateBracket = () => {
        props.generateHandler(props.id)
    }

   const participants = Object.keys(props.registrants).map((name, i) => {
       const listItemStyling = {
           marginBottom:'4px',
           fontSize:'14px'
       }
            if (name === 'id' || i > [props.showCount]) {
                console.log(i)
               return 
            }
            return(
                <ul key={props.title + ' participants'}>
                    <li style={listItemStyling}>
                        {name}: {props.registrants[name]}
                    </li>
                </ul>
            )
    })

    const Generate = () => {
        return(
            <div>
                <button onClick={generateBracket}>Generate Brackets</button>
            </div>
        )
    }

    const showMore = () => {
        props.showMore(Object.keys(props.egistrants).length - 1)
    }
   
    return(
        <div style={{marginBottom:'10px'}}>
            <table>
                <tbody>
                    <tr>
                        <th>
                            Open Until
                        </th>
                        <th>
                            Participants
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                    <tr>
                        <th>

                        </th>
                        <th>
                            {participants}
                            <button onClick={showMore}>
                                View More
                            </button>
                        </th>
                        <th>
                            <Generate/>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TournamentDetail;