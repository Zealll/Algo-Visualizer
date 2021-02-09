import React, { useState } from 'react'

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

    // console.log(props.mapCleanStatus)

    return (
        <header onClick={e => dropdown && setDropdown('')} className="App-header">
            <h1>Algorithm Visualizer</h1>
            <div onClick={!props.algoRunStatus && classToggler} className="custom-select-wrapper">
                <div className={`custom-select ${dropdown}`}>
                    <div className="custom-select__trigger"><span>{name ? name : 'Select an Algorithm'}</span>
                        <div className="arrow"></div>
                    </div>
                    <div className="custom-options">
                        {algorithms.map((eachAlgo, index) => (
                            <span onClick={e => {algoPicker(e, eachAlgo[1], eachAlgo[0]); props.firstAlgoRan && props.setReset(!props.reset); !props.mapCleanStatus && props.setMapCleanStatus(true)}} key={index} className={`custom-option ${name === eachAlgo[1] ? 'selected' : ''}`}>
                                {eachAlgo[1]}
                            </span>
                        ))}
                    </div>
                </div>
            </div> 
            <button disabled={chosenAlgo && props.mapCleanStatus && !props.algoRunStatus ? false : true} onClick={() => {props.setAlgoRunStatus(true); props.algoRunner(chosenAlgo); props.setMapCleanStatus(false); props.setFirstAlgoRan(true)}}>Start</button>
            <button disabled={props.algoRunStatus} onClick={() => {props.setReset(!props.reset); props.setMapCleanStatus(true)}}>Reset</button>
        </header>
    )
}




export default Header