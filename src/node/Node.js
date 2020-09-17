import React, { useState } from 'react'


const Node = props => {
    const [visited, setVisited] = useState(false)
    // Longitude up => down
    // Latitude  left => right
    const [coor, setCoor] = useState(props.coor)
    
    const [start, setStart] = useState(coor === 1930)
    const [end, setEnd] = useState(coor === 1980)
    const [distance, setDistance] = useState(start ? 0 : Infinity)

    

    // console.log(lat)
    // console.log('hello')
    // console.log(start, lat, lon)
    return (
        <div onClick={() => {setVisited(!visited)}} className={visited ? `square visited ${start ? 'start' : ' '} ${end ? 'end' : ' '}` : `square ${start} ${start ? 'start' : ' '} ${end ? 'end' : ' '}`}>
        </div>
    )
}

export default Node