import React from 'react'
import searchVideo from '../../resources/Search_Video.gif'
const StepFive = () => {

    return (
        <div className='steps-container'>
            <h3>Step 5</h3>
            <img className='step-image' autoPlay src={searchVideo} alt='GIF demonstration of finding Shortest Path' />
            <h4>Once you have selected your desired <span>Algorithm</span>, you can press <span>START</span> Button.</h4>
            <h4>This will demonstrate how the specified Algorithm traverses the map to find the <span>Shortest Path</span>.</h4>
        </div>
    )
}

export default StepFive