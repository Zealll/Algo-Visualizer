import React, { useState, useEffect } from 'react'

const Header = props => {
    const [dropdown, setDropdown] = useState('')
    const [name, setName] = useState('')
    const [chosenAlgo, setChosenAlgo] = useState('')

    const classToggler = e => {
        e.preventDefault()
        if (dropdown === 'open') {
            setDropdown('')
        } else {
            setDropdown('open')
        }
    }

    const algoPicker = (event, nameParam, chosenParam) => {
        event.preventDefault(); 
        setName(nameParam);
        setChosenAlgo(chosenParam)
    }

    const algorithms = [
        ['dij', 'Dijkstra'],
        ['astar', 'A*'],
        ['bfs', 'Breadth First'],
        ['dfs', 'Depth First']
    ]

    // console.log('header')

    return (
        <header onClick={e => dropdown && setDropdown('')} className="App-header">
            <h1>Algorithm Visualizer</h1>
           <div onClick={classToggler} class="custom-select-wrapper">
                <div class={`custom-select ${dropdown}`}>
                    <div class="custom-select__trigger"><span>{name ? name : 'Select an Algorithm'}</span>
                        <div class="arrow"></div>
                    </div>
                    <div class="custom-options">
                        {algorithms.map(eachAlgo => (
                            <span onClick={e => algoPicker(e, eachAlgo[1], eachAlgo[0])} class={`custom-option ${name === eachAlgo[1] ? 'selected' : ''}`}>
                                {eachAlgo[1]}
                            </span>
                        ))}
                    </div>
                </div>
            </div> 
            <button disabled={chosenAlgo ? false : true} onClick={() => props.algoRunner(chosenAlgo)}>Start</button>
            <button onClick={() => {}}>reset</button>
        </header>
    )
}




export default Header

// {/* <div className='selection-holder'>
//                 <select  onChange={selectHandler}>
//                     <option selected disabled hidden value='N/A'>Select an Algorithm</option>
//                     <option value='dijkstra'>Dijkstra</option>
//                     <option value='astar'>A*</option>
//                     {/* <option value='bi_astar'>Bidirectional A*</option> */}
            //         <option value='breadth_first'>Breadth First</option>
            //         <option value='depth_first'>Depth First</option>
            //     </select>
            //     <button onClick={() => props.algoRunner(name)}>Start</button>
            //     <button onClick={() => {}}>reset</button>
            // </div> */}