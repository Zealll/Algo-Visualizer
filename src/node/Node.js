import React, { useState } from 'react'


const Node = props => {
    const [visited, setVisited] = useState(props.cell.visited)
    const [wall, setWall] = useState(props.cell.isWall)
    const [hasWeight, setHasWeight] = useState(props.cell.weight > 0 ? true : false)

    const clickHandler = () => {
        // setVisited(props.cell.visit())
    }

    const nodeClickHandler = e => {
        e.preventDefault();
        // Deals with first click of the mouse
        if (props.cell.lon === props.start.lon && props.cell.lat === props.start.lat){
            // Start Node Handler
            props.setClicked(true)
        } else if (props.cell.lon === props.end.lon && props.cell.lat === props.end.lat) {
            // End Node Handler
            props.setDestinationClicked(true)
        } else if (props.weight) {
            // Weight Node Handler
            props.setNormalNodeClicked(true)
            if (props.cell.weight === 0) {
                props.cell.setWeight()
                setHasWeight(true)
            } 
        } else {
            // Wall Node Handler
            props.setNormalNodeClicked(true)
            setWall(!wall)
            props.cell.isWall = !props.cell.isWall
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

    const obstacleHandler = e => {
        e.preventDefault()
        if (props.weight && props.normalNodeClicked) {
            if (props.cell.weight === 0) {
                props.cell.setWeight()
                setHasWeight(true)
            } 
        } else if (props.normalNodeClicked) {
            setWall(!wall)
            props.cell.isWall = !props.cell.isWall
        }
        
    }

    return (
        <div
          onMouseDown={(e) => nodeClickHandler(e)} 
          onMouseUp={(e) => {
              props.setClicked(false); 
              props.setDestinationClicked(false); 
              props.setNormalNodeClicked(false); 
              locationSetter(e)
            //   props.clicked !== props.destinationClicked && locationSetter(e)
            }
          } 
          onMouseEnter={(e) => {props.nodeDragHandler(e, props.cell.lon, props.cell.lat); obstacleHandler(e)}} 
          onMouseLeave={(e) => props.prevNodeDragHandler(e, props.cell.lon, props.cell.lat)}
          onClick={() => {clickHandler()}} 

          id={`Row-${props.cell.lon}-Col-${props.cell.lat}`} 
          className={visited ? `square visited ${props.start.lon === props.cell.lon & props.start.lat === props.cell.lat ? 'start' : ' '} ${props.end.lon === props.cell.lon & props.end.lat === props.cell.lat ? 'end' : ' '}` : `square ${props.start.lon === props.cell.lon & props.start.lat === props.cell.lat ? 'start' : ' '} ${props.end.lon === props.cell.lon & props.end.lat === props.cell.lat ? 'end' : ' '} ${wall ? 'wall' : ''} ${hasWeight ? 'weighted' : ''}`}>
        </div>
    )
}

export default Node