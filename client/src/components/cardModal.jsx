import React from 'react'
import '../components_css/cardModal.css'

function CardModal() {
  return (
    <div className='modalDiv'>
        <div className='overlay'></div>
        <div className='modalContent'>
            <div>
                <input></input>
            </div>
            <div>
                <input></input>
            </div>
            <div>
                <button></button>
                <button></button>
            </div>
        </div>
    </div>
  )
}

export default CardModal