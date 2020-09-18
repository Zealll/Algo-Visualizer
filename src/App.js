import React, {useState} from 'react';
// import logo from './logo.svg';

import Node from './node/Node.js'

import {dijkstras} from './algorithms/Dijkstras.js'

function App() {
  const size = window.screen
  let parArr = []
 
  for (let j = 1; j <= (size.availHeight / 100 * 70) / 20; j++) {
    const box = []

    for (let i = 1; i <= (size.availWidth / 100 * 90) / 20; i++) {
      box.push(Number(`${j}${i}`))
    }

    parArr.push(box)
  }

  dijkstras(parArr)

  // const maap = new Map()
  // console.log(parArr.maap())
  

  

  // console.log(parArr)
  return (
    <div className="App">
      <header className="App-header">
        {parArr.map((eachPar, index) => (
          <div className='flex'>
            {eachPar.map(each => (
              <Node 
                lon={index + 1}
                lat={each}
                coor={each}
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
