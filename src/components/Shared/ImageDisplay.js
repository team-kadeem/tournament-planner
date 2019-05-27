import React from 'react'

const ImageDisplay = (props) => {
    const backgroundStyle = {
        height:'50vh',
        width:'100vw',
        backgroundImage:`url(${props.backgroundImage})`,
        backgroundSize:'150% 150%',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat'
    }

    return(
        <div style={backgroundStyle}/>
    )
}

export default ImageDisplay