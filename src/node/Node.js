import React, { useState } from 'react'


const Node = props => {
    const [visited, setVisited] = useState(false)
    const [lat, setLat] = useState(props.lat)
    const [lon, setLon] = useState(props.lon)

    // console.log(lat)
    // console.log('hello')
    return (
        <div onClick={() => setVisited(!visited)} className={visited ? 'square visited' : 'square'}>

        </div>
    )
}

export default Node