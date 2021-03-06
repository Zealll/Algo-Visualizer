import React, {useState, useEffect} from 'react';
// import logo from './logo.svg';

import Node from './node/Node.js'
import Cell from './node/Cell.js'

// Components
import Header from './header/Header.js'
import Modal from './modal/Modal.js'

// **** Path Finding Algorithms ****
import { dijkstras } from './algorithms/Dijkstras.js'
import { aStar } from './algorithms/A_Star.js'
import { bi_aStar } from './algorithms/Bidirectional_A_Star'

function App() {
  const size = window.screen
  const [parArr, setParArr] = useState([])
  let rows = Math.floor((size.availHeight / 100 * 70) / 20)
  let columns = Math.floor((size.availWidth / 100 * 90) / 20)
  const [start, setStart] = useState({lon: Math.floor(rows / 2), lat: Math.floor(columns / 4)})
  const [end, setEnd] = useState({lon: Math.floor(rows / 2), lat: Math.floor(columns / 4) * 3})
  const [clicked, setClicked] = useState(false)
  const [destinationClicked, setDestinationClicked] = useState(false)
  const [normalNodeClicked, setNormalNodeClicked] = useState(false) 
  const [weight, setWeight] = useState(false)
  const [reset, setReset] = useState(false)
  const [algoRunStatus, setAlgoRunStatus] = useState(false)
  const [mapCleanStatus, setMapCleanStatus] = useState(true)
  const [auto_reset_after_algo_ran_enabled, set_auto_reset_after_algo_ran_enabled] = useState(false)
  const weightHandler = e => {
    // console.log(e.type)
    if (e.key === 'w' && e.type === 'keydown'){
      setWeight(true)
    } else {
      setWeight(false)
    }
  }


  useEffect(() => {
    parArr.map(eachArr => (
      eachArr.map(node => {
        node.distance = Infinity
        node.visited = false
        node.weight = 0
        node.h = 0
        node.f = 0
        node.prevNode = null
        node.isWall = false
        if ((node.lat !== start.lat || node.lon !== start.lon) && (node.lat !== end.lat || node.lon !== end.lon)){
          document.getElementById(`Row-${node.lon}-Col-${node.lat}`).className = `square`
        } else if (node.lat === start.lat && node.lon === start.lon) {
          document.getElementById(`Row-${node.lon}-Col-${node.lat}`).className = `square start`
        } else if (node.lat === end.lat && node.lon === end.lon) {
          document.getElementById(`Row-${node.lon}-Col-${node.lat}`).className = `square end`
        }
        
      })
    ))
    if (!auto_reset_after_algo_ran_enabled){
      console.log('Array Ran')
      setParArr([])
      for (let j = 0; j < rows; j++) {
        const box = []
    
        for (let i = 0; i < columns; i++) {
          const cell = new Cell(j, i, rows - 1, columns - 1)
    
          box.push(cell)
        }
        
        setParArr(parArr => [...parArr, box])
      }
    }
    

    window.addEventListener('keydown', e => weightHandler(e, 'down'))
    window.addEventListener('keyup', e => weightHandler(e, 'up'))
    window.addEventListener('click', e => {
      if (e.target.className === 'Modal-Container') {
        document.getElementsByClassName('Modal-Container')[0].className = 'Modal-Container none'
      }  
    })
    
    return () => {
      window.removeEventListener('keydown', (e) => weightHandler(e, 'down'))
      window.removeEventListener('keyup', (e) => weightHandler(e, 'up'))
      window.removeEventListener('click', e => {
        if (e.target.className === 'Modal-Container') {
          document.getElementsByClassName('Modal-Container')[0].className = 'Modal-Container none'
        }  
      })
    }
    
  }, [reset])

  const algoRunner = name => {
    if (name === 'astar') aStar(parArr, parArr[start.lon][start.lat], parArr[end.lon][end.lat], setAlgoRunStatus)
    if (name === 'dij') dijkstras(parArr, parArr[start.lon][start.lat], parArr[end.lon][end.lat], true, 'dijkstra', setAlgoRunStatus)
    if (name === 'bfs') dijkstras(parArr, parArr[start.lon][start.lat], parArr[end.lon][end.lat], false, 'breadth_first', setAlgoRunStatus)
    if (name === 'dfs') dijkstras(parArr, parArr[start.lon][start.lat], parArr[end.lon][end.lat], false, 'depth_first', setAlgoRunStatus)
    // if (name === 'bi_astar') bi_aStar(parArr, parArr[start.lon][start.lat], parArr[end.lon][end.lat])
    // setAlgoRunStatus(false)
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

  return (
    <div  className="App">

      <Header 
        algoRunner={algoRunner}
        reset={reset}
        setReset={setReset}
        algoRunStatus={algoRunStatus}
        setAlgoRunStatus={setAlgoRunStatus}
        mapCleanStatus={mapCleanStatus}
        setMapCleanStatus={setMapCleanStatus}
        auto_reset_after_algo_ran_enabled={auto_reset_after_algo_ran_enabled}
        set_auto_reset_after_algo_ran_enabled={set_auto_reset_after_algo_ran_enabled}
      />

      <Modal />

      <div className="maze">
        <div>
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
        </div>
      </div>
      
    </div>
  );
}
// https://dmitripavlutin.com/use-react-memo-wisely/
// https://staleclosures.dev/preventing-list-rerenders/
// https://dev.to/maikomiyazaki/completed-javascript-data-structure-course-and-here-is-what-i-learned-about-graph-dijkstra-algorithm-57n8
export default App;
