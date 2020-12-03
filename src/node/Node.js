import React, { useState } from 'react'


const Node = props => {
    const [visited, setVisited] = useState(props.cell.visited)

    const clickHandler = () => {
        // setVisited(props.cell.visit())
    }

    const nodeClickHandler = e => {
        e.preventDefault();
        if (props.cell.lon === props.start.lon && props.cell.lat === props.start.lat){
            props.setClicked(true)
        } else if (props.cell.lon === props.end.lon && props.cell.lat === props.end.lat) {
            props.setDestinationClicked(true)
        }
    }

    const locationSetter = e => {
        e.preventDefault()
        if (props.clicked) {
            if (props.end.lon !== props.cell.lon || props.end.lat !== props.cell.lat){
                props.setStart({lon: props.cell.lon, lat: props.cell.lat})
            }
        } else if (props.destinationClicked) {
            if (props.start.lon !== props.cell.lon || props.start.lat !== props.cell.lat) {
                props.setEnd({lon: props.cell.lon, lat: props.cell.lat})
            }
        }
        
    }

    return (
        <div
          onMouseDown={(e) => nodeClickHandler(e)} 
          onMouseUp={(e) => {props.setClicked(false); props.setDestinationClicked(false); props.clicked !== props.destinationClicked && locationSetter(e)}} 
          onMouseEnter={(e) => props.nodeDragHandler(e, props.cell.lon, props.cell.lat)} 
          onMouseLeave={(e) => props.prevNodeDragHandler(e, props.cell.lon, props.cell.lat)}
          onClick={() => {clickHandler()}} 

          id={`Row-${props.cell.lon}-Col-${props.cell.lat}`} 
          className={visited ? `square visited ${props.start.lon === props.cell.lon & props.start.lat === props.cell.lat ? 'start' : ' '} ${props.end.lon === props.cell.lon & props.end.lat === props.cell.lat ? 'end' : ' '}` : `square ${props.start.lon === props.cell.lon & props.start.lat === props.cell.lat ? 'start' : ' '} ${props.end.lon === props.cell.lon & props.end.lat === props.cell.lat ? 'end' : ' '} ${props.cell.isWall ? 'wall' : ''}`}>
        </div>
    )
}

export default Node