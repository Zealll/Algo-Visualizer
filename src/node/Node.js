import React, { useState } from 'react'


const Node = props => {
    const [visited, setVisited] = useState(props.cell.visited)

    const clickHandler = () => {
        // setVisited(props.cell.visit())
    }

    const startNodeClickHandler = e => {
        e.preventDefault();
        if (props.cell.lon === props.start.lon && props.cell.lat === props.start.lat){
            props.setClicked(true)
        }
    }
    const locationSetter = e => {
        e.preventDefault()
        if (props.end.lon !== props.cell.lon || props.end.lat !== props.cell.lat){
            props.setStart({lon: props.cell.lon, lat: props.cell.lat})
        }
    }
   

    return (
        <div 
          draggable={false}
          onMouseDown={(e) => startNodeClickHandler(e)} 
          onMouseUp={(e) => {props.setClicked(false); props.clicked && locationSetter(e)}} 
          onMouseEnter={(e) => props.startHandler(e, props.cell.lon, props.cell.lat)} 
          onMouseLeave={(e) => props.test(e, props.cell.lon, props.cell.lat)}
          onClick={() => {clickHandler()}} 

          id={`Row-${props.cell.lon}-Col-${props.cell.lat}`} 
          className={visited ? `square visited ${props.start.lon === props.cell.lon & props.start.lat === props.cell.lat ? 'start' : ' '} ${props.end.lon === props.cell.lon & props.end.lat === props.cell.lat ? 'end' : ' '}` : `square ${props.start.lon === props.cell.lon & props.start.lat === props.cell.lat ? 'start' : ' '} ${props.end.lon === props.cell.lon & props.end.lat === props.cell.lat ? 'end' : ' '} ${props.cell.isWall ? 'wall' : ''}`}>
        </div>
    )
}

export default Node