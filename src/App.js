import React, {useState, useEffect} from 'react';
// import logo from './logo.svg';

import Node from './node/Node.js'
import Cell from './node/Cell.js'

import Header from './header/Header.js'

// **** Path Finding Algorithms ****
import { dijkstras } from './algorithms/Dijkstras.js'
import { aStar } from './algorithms/A_Star.js'

import { depthFirst } from './maze/depthFirst'


function App() {
  const size = window.screen
  const [parArr, setParArr] = useState([])
  let rows = Math.floor((size.availHeight / 100 * 70) / 20)
  let columns = Math.floor((size.availWidth / 100 * 90) / 20)
  const [start, setStart] = useState({lon: 13, lat: 20})
  const [end, setEnd] = useState({lon: 13, lat: 40})
  const [clicked, setClicked] = useState(false)
 
  useEffect(() => {
    // parArr = []
    for (let j = 0; j < rows; j++) {
      const box = []
  
      for (let i = 0; i < columns; i++) {
        const cell = new Cell(j, i, rows - 1, columns - 1)
  
        box.push(cell)
      }
      // console.log(Math.floor((size.availHeight / 100 * 70) / 20))
      
      setParArr(parArr => [...parArr, box])
    }
    
  }, [])
  // parArr[13][30].isWall = true
  // parArr[14][30].isWall = true
  // parArr[12][30].isWall = true
  // parArr[14][20].isWall = true
  // parArr[14][21].weight = 5
  // for (let i = 0; i < parArr.length; i++) {
  //   if (i > 5) {

  //     parArr[i][22].isWall = true
  //   }
  // }

  const algoRunner = name => {
    if (name === 'astar') aStar(parArr, parArr[start.lon][start.lat], parArr[end.lon][end.lat])
    if (name === 'dijkstra') dijkstras(parArr, parArr[start.lon][start.lat], parArr[end.lon][end.lat])
  }

  let prevLocation = start
  const startHandler = (e, lon, lat) => {
    e.preventDefault();

    if (clicked) {
      if(lon !== end.lon || lat !== end.lat) {

        if (prevLocation) document.getElementById(`Row-${prevLocation.lon}-Col-${prevLocation.lat}`).className = `square`
        
        document.getElementById(`Row-${lon}-Col-${lat}`).className = `${document.getElementById(`Row-${lon}-Col-${lat}`).className} visited start`
        prevLocation = {lon, lat}
      } else {
        document.getElementById(`Row-${prevLocation.lon}-Col-${prevLocation.lat}`).className = `${document.getElementById(`Row-${prevLocation.lon}-Col-${prevLocation.lat}`).className} visited start`
        setStart(prevLocation)
      }
    }
  }

  const test = (e, lon, lat) => {
    e.preventDefault();
    
    if (clicked) {
      if(lon !== end.lon || lat !== end.lat) {
        document.getElementById(`Row-${lon}-Col-${lat}`).className = 'square'
      }
    }
}
  

  // setTimeout(() => {
  //   // dijkstras(parArr, parArr[start.lon][start.lat], parArr[end.lon][end.lat])
  //   // aStar(parArr, parArr[start.lon][start.lat], parArr[end.lon][end.lat])
  //   depthFirst(parArr)

  // }, 1000)

  return (
    <div className="App">
      
        <Header algoRunner={algoRunner}/>
      <header className="App-header">
        {parArr.map((eachPar, rowIdx) => (
          <div key={`Row-${rowIdx}`} className='flex'>
            {eachPar.map((each, colIdx) => (
              <Node 
                key={`Column-${colIdx}`}
                cell={each}
                grid={parArr}
                start={start}
                end={end}
                startHandler={startHandler}
                setClicked={setClicked}
                test={test}
                setStart={setStart}
                clicked={clicked}
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
