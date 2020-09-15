import React, {useState} from 'react';
// import logo from './logo.svg';

import Node from './node/Node.js'

function App() {
  const size = window.screen
  let arr = []
  let parArr = []
  for (let i = 1; i <= (size.availWidth / 100 * 90) / 20; i++) {
    arr.push(i)
  }

  for (let j = 1; j <= (size.availHeight / 100 * 70) / 20; j++) {
    parArr.push(j)
  }

  console.log(parArr)
  return (
    <div className="App">
      <header className="App-header">
        {parArr.map(eachPar => (
          <div className='flex'>
            {arr.map(each => (
              <Node 
                lat={eachPar}
                lon={each}
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
