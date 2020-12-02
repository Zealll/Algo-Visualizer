import React, { useState } from 'react'


const Node = props => {
    const [visited, setVisited] = useState(props.cell.visited)
    const [stateUpdate, setStateUpdate] = useState(false)
    
    // const [start, setStart] = useState(props.cell.lon === 13 && props.cell.lat === 20)
    // const [end, setEnd] = useState(props.cell.lon === 13 && props.cell.lat === 40)
    // const [distance, setDistance] = useState(start ? 0 : Infinity)

    // console.log(props.start)

    // console.log(lat)
    // console.log(props.grid)
    // const clickHandler = () => {
    //     // setVisited(props.cell.visit())
    //     console.log('INside',props.cell.lon, props.cell.lat)
    // }

    const startNodeClickHandler = () => {

    }

    

    // const stateUpdateF = (lon, lat) => {
    //     if (lon === props.cell.lon && lat === props.cell.lat) {
    //         setStateUpdate(!stateUpdate)
    //     }
    // }

    // console.log('hello')

    // console.log(start, lat, lon)
    return (
        <div 
          onMouseDown={() => props.setClicked(true)} 
          onMouseUp={() => {props.setClicked(false);props.setStart({lon: props.cell.lon, lat: props.cell.lat})}} 
          onMouseEnter={() => props.startHandler(props.cell.lon, props.cell.lat)} 
          onMouseLeave={() => props.test(props.cell.lon, props.cell.lat)}
        //   onClick={() => {clickHandler()}} 

          id={`Row-${props.cell.lon}-Col-${props.cell.lat}`} 
          className={visited ? `square visited ${props.start.lon === props.cell.lon & props.start.lat === props.cell.lat ? 'start' : ' '} ${props.end.lon === props.cell.lon & props.end.lat === props.cell.lat ? 'end' : ' '}` : `square ${props.start.lon === props.cell.lon & props.start.lat === props.cell.lat ? 'start' : ' '} ${props.end.lon === props.cell.lon & props.end.lat === props.cell.lat ? 'end' : ' '}`}>
        </div>
    )
}

export default Node