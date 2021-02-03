import React from 'react'
import algo from '../../resources/Algo.PNG'
const StepOne  = () => {
    return (
        <div className='steps-container'>
            <h3>Step 1</h3>
            <img className='step-image' src={algo} alt='List of Algorthms to choose from' />
            <h4>Pick your desired Algorithm.</h4>
        </div>
    )
}

export default StepOne