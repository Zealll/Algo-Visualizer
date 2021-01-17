import React, {useState, useEffect} from 'react';
// import logo from './logo.svg';

import Node from './node/Node.js'
import Cell from './node/Cell.js'

import Header from './header/Header.js'

// **** Path Finding Algorithms ****
import { dijkstras } from './algorithms/Dijkstras.js'
import { aStar } from './algorithms/A_Star.js'
import { bi_aStar } from './algorithms/Bidirectional_A_Star'

function App() {
  const size = window.screen
  const [parArr, setParArr] = useState([])
  let rows = Math.floor((size.availHeight / 100 * 70) / 20)
  let columns = Math.floor((size.availWidth / 100 * 90) / 20)
  const [start, setStart] = useState({lon: 13, lat: 20})
  const [end, setEnd] = useState({lon: 13, lat: 40})
  const [clicked, setClicked] = useState(false)
  const [destinationClicked, setDestinationClicked] = useState(false)
  const [normalNodeClicked, setNormalNodeClicked] = useState(false) 
  const [weight, setWeight] = useState(false)
  const weightHandler = (e, action) => {
    // console.log(e.type)
    if (e.key === 'w' && e.type === 'keydown'){
      setWeight(true)
    } else {
      setWeight(false)
    }
  }
  useEffect(() => {
    for (let j = 0; j < rows; j++) {
      const box = []
  
      for (let i = 0; i < columns; i++) {
        const cell = new Cell(j, i, rows - 1, columns - 1)
  
        box.push(cell)
      }
      
      setParArr(parArr => [...parArr, box])
    }

    window.addEventListener('keydown', (e) => weightHandler(e, 'down'))
    window.addEventListener('keyup', (e) => weightHandler(e, 'up'))
    return () => {
      window.addEventListener('keydown', (e) => weightHandler(e, 'down'))
      window.addEventListener('keyup', (e) => weightHandler(e, 'up'))
    }
    
  }, [])

  const algoRunner = name => {
    if (name === 'astar') aStar(parArr, parArr[start.lon][start.lat], parArr[end.lon][end.lat])
    if (name === 'dijkstra') dijkstras(parArr, parArr[start.lon][start.lat], parArr[end.lon][end.lat], true, 'dijkstra')
    if (name === 'breadth_first') dijkstras(parArr, parArr[start.lon][start.lat], parArr[end.lon][end.lat], false, 'breadth_first')
    if (name === 'depth_first') dijkstras(parArr, parArr[start.lon][start.lat], parArr[end.lon][end.lat], false, 'depth_first')
    // if (name === 'bi_astar') bi_aStar(parArr, parArr[start.lon][start.lat], parArr[end.lon][end.lat])
  }

  let prevStartLocation = start
  let prevEndLocation = end
  const nodeDragHandler = (e, lon, lat) => {
    e.preventDefault();

    if (clicked) {
      if(lon !== end.lon || lat !== end.lat) {
        document.getElementById(`Row-${prevStartLocation.lon}-Col-${prevStartLocation.lat}`).className = `square`
        
        document.getElementById(`Row-${lon}-Col-${lat}`).className = `${document.getElementById(`Row-${lon}-Col-${lat}`).className} visited start`
        prevStartLocation = {lon, lat}
      } else {
        document.getElementById(`Row-${prevStartLocation.lon}-Col-${prevStartLocation.lat}`).className = `${document.getElementById(`Row-${prevStartLocation.lon}-Col-${prevStartLocation.lat}`).className} visited start`
        setStart(prevStartLocation)
      }
    } else if (destinationClicked) {
      if (lon !== start.lon || lat !== start.lat) {
        document.getElementById(`Row-${prevEndLocation.lon}-Col-${prevEndLocation.lat}`).className = `square`

        document.getElementById(`Row-${lon}-Col-${lat}`).className = `${document.getElementById(`Row-${lon}-Col-${lat}`).className} visited end`
        prevEndLocation = {lon, lat}
      } else {
        document.getElementById(`Row-${prevEndLocation.lon}-Col-${prevEndLocation.lat}`).className = `${document.getElementById(`Row-${prevEndLocation.lon}-Col-${prevEndLocation.lat}`).className} visited end`
        setEnd(prevEndLocation)
      }
    }
  }

  const prevNodeDragHandler = (e, lon, lat) => {
    e.preventDefault();
    
    if (clicked) {
      if(lon !== end.lon || lat !== end.lat) {
        document.getElementById(`Row-${lon}-Col-${lat}`).className = 'square'
      }
    } else if (destinationClicked) {
      if(lon !== start.lon || lat !== start.lat) {
        document.getElementById(`Row-${lon}-Col-${lat}`).className = 'square'
      }
    }
}

  // setTimeout(() => {
  //   // dijkstras(parArr, parArr[start.lon][start.lat], parArr[end.lon][end.lat])
  //   // aStar(parArr, parArr[start.lon][start.lat], parArr[end.lon][end.lat])
  //   depthFirst(parArr)

  // }, 1000)
  // console.log(destinationClicked)

  
  console.log(weight)
  return (
    <div  className="App">
      
      <Header algoRunner={algoRunner}/>
      <header tabIndex={0} onKeyDown={weightHandler} className="App-header">
        {parArr.map((eachPar, rowIdx) => (
          <div key={`Row-${rowIdx}`} className='flex'>
            {eachPar.map((each, colIdx) => (
              <Node 
                key={`Column-${colIdx}`}
                cell={each}
                grid={parArr}
                start={start}
                end={end}
                nodeDragHandler={nodeDragHandler}
                prevNodeDragHandler={prevNodeDragHandler}
                setStart={setStart}
                setEnd={setEnd}
                clicked={clicked}
                setClicked={setClicked}
                destinationClicked={destinationClicked}
                setDestinationClicked={setDestinationClicked}
                normalNodeClicked={normalNodeClicked}
                setNormalNodeClicked={setNormalNodeClicked}
                weight={weight}
              />
            ))}
          </div>
        ))}
      </header>
      <div>

      </div>
    </div>
  );
}
// https://dmitripavlutin.com/use-react-memo-wisely/
// https://staleclosures.dev/preventing-list-rerenders/
// https://dev.to/maikomiyazaki/completed-javascript-data-structure-course-and-here-is-what-i-learned-about-graph-dijkstra-algorithm-57n8
export default App;
