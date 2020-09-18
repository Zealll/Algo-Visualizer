import React, {useState} from 'react';
// import logo from './logo.svg';

import Node from './node/Node.js'
import Cell from './node/Cell.js'

import {dijkstras} from './algorithms/Dijkstras.js'


function App() {
  const size = window.screen
  let parArr = []
  let rows = Math.floor((size.availHeight / 100 * 70) / 20)
  let columns = Math.floor((size.availWidth / 100 * 90) / 20)
 
  for (let j = 0; j < rows; j++) {
    const box = []

    for (let i = 0; i < columns; i++) {
      const cell = new Cell(j, i, rows - 1, columns - 1)

      box.push(cell)
    }
    // console.log(Math.floor((size.availHeight / 100 * 70) / 20))
    
    parArr.push(box)
  }

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

export default App;
