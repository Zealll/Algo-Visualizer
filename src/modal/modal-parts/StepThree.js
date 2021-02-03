import React from 'react'
import weightVideo from '../../resources/Weight_Video.gif'

const StepThree = () => {

    return (
        <div className='steps-container'>
            <h3>Step 3 (Optional)</h3>
            <img className='step-image' src={weightVideo} alt='GIF demonstration of creating Weighted Obstacles' />
            <h4>With <span>weighted</span> Algorithms you can create Weighted Obstacles</h4>
            <h4>In order to create <span>Weighted Obstacles</span> press <span>"W + Left Button of your Mouse"</span></h4>
        </div>
    )
}

export default StepThree