import React from 'react'
import wallVideo from '../../resources/Walls_Video.gif'

const StepThree = () => {
    return (
        <div className='steps-container'>
            <h3>Step 3 (Optional)</h3>
            <img className='step-image' autoPlay src={wallVideo} alt='GIF demonstration of creating walls' />
            <h4>Click your <span>left mouse button</span> to turn a single Cell into a wall.</h4>
            <h4>Click your <span>left mouse button</span> and drag it to turn several Cells into walls.</h4>
        </div>
    )
}

export default StepThree