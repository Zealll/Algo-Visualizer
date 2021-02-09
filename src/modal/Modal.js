import React, { useState } from 'react'
import StepOne from './modal-parts/StepOne.js'
import StepThree from './modal-parts/StepThree.js'
import StepFour from './modal-parts/StepFour.js'
import StepFive from './modal-parts/StepFive.js'
import StepTwo from './modal-parts/StepTwo.js'

const Modal = props => {
    const [display, setDisplay] = useState(JSON.parse(!localStorage.getItem('modal-state-disabled')))
    const [page, setPage] = useState(1)
    const safePageSetter = (e, dir) => {
        e.preventDefault()

        if (dir === 'prev' && page > 1) {
            setPage(page - 1)
        } else if (dir === 'next' && page < 5) {
            setPage(page + 1)
        }
    }
    return (
        <div className={`Modal-Container${!display ? ' none' : ''}`}>
            <div className='modal'>
                <div className='modal-top-section'>
                    <h1>Welcome to Algorithm Visualizer!</h1>
                </div>
                {page === 1 && <StepOne />}
                {page === 2 && <StepTwo />}
                {page === 3 && <StepThree />}
                {page === 4 && <StepFour />}
                {page === 5 && <StepFive />}
                <div className='modal-nav-buttons'>
                    <button onClick={() => {localStorage.setItem('modal-state-disabled', 'true'); setDisplay(false)}}>Don't Show Again</button>
                    <div>
                        <button onClick={(e) => safePageSetter(e, 'prev')} disabled={page === 1 ? true :  false}>Previous</button>
                        {page === 5 ? <button onClick={() => setDisplay(false)}>Close</button> : <button onClick={(e) => safePageSetter(e, 'next')}>Next</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal