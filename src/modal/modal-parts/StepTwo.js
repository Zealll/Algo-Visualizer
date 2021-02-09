import React from 'react'
import pointMoveVideo from '../../resources/Point_Move_Video.gif'

const StepTwo = () => {
    return (
        <div className='steps-container'>
            <h3>Step 2 (Optional)</h3>
            <img className='step-image' autoPlay src={pointMoveVideo} alt='GIF demonstration of creating walls' />
            <h4><span>Green Node</span> is your Starting point.</h4>
            <h4><span>Light Spy Blue Node</span> is your Destination point.</h4>
            <h4>You can click with your <span>Left Mouse Button</span> on either of the two, and change their locations.</h4>
        </div>
    )
}

export default StepTwo