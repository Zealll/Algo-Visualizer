import React, { useState, useEffect } from 'react'

const Header = props => {
    const [name, setName] = useState('')

    const selectHandler = e => {
        setName(e.target.value)
    }

    // console.log('header')

    return (
        <div>
            <select  onChange={selectHandler}>
                <option selected disabled hidden value='N/A'>Select an Algorithm</option>
                <option value='dijkstra'>Dijkstra</option>
                <option value='astar'>A*</option>
                <option value='bi_astar'>Bidirectional A*</option>
                <option value='breadth_first'>Breadth First</option>
                <option value='depth_first'>Depth First</option>
            </select>
            <button onClick={() => props.algoRunner(name)}>Start</button>
            <button onClick={() => {}}>reset</button>
        </div>
    )
}


export default Header