import React, {useState, useEffect} from 'react';
// import logo from './logo.svg';

import Node from './node/Node.js'
import Cell from './node/Cell.js'

import {dijkstras} from './algorithms/Dijkstras.js'
import { array } from 'prop-types';


function App() {
  const size = window.screen
  // let parArr = []
  const [parArr, setParArr] = useState([])
  let rows = Math.floor((size.availHeight / 100 * 70) / 20)
  let columns = Math.floor((size.availWidth / 100 * 90) / 20)
  const [start, setStart] = useState({lon: 13, lat: 20})
  const [end, setEnd] = useState({lon: 13, lat: 40})
 

  useEffect(() => {
    const arr = []
    for (let j = 0; j < rows; j++) {
      const box = []
  
      for (let i = 0; i < columns; i++) {
        const cell = new Cell(j, i, rows - 1, columns - 1)
  
        box.push(cell)
      }
      // console.log(Math.floor((size.availHeight / 100 * 70) / 20))
      
      setParArr(parArr => [...parArr, box])
    }
  },[])
  

  // const toggle = (lon, lat) => {
  //   console.log(lon, lat)
  //   return [lon, lat]
  // }

  setTimeout(() => {
    dijkstras(parArr, parArr[13][20], parArr[13][40], setParArr)
  }, 5000)

  
  // console.log(parArr)

  // dijkstras(parArr)

  // const cell = new Cell(26, 67, parArr.length - 1, parArr[0].length - 1)

  // cell.coor()



  // const maap = new Map()
  // console.log(parArr.maap())
  

  

  // console.log(parArr)
  return (
    <div className="App">
      <header className="App-header">
        {parArr.map((eachPar, index) => (
          <div key={`Row-${index}`} className='flex'>
            {eachPar.map((each, index) => (
              <Node 
                key={`Column-${index}`}
                cell={each}
                grid={parArr}
                start={start}
                end={end}
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
