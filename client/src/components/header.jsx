import React from 'react'
import '../components_css/header.css'
import {FontAwesomeIcon} from'@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {faCoins} from '@fortawesome/free-solid-svg-icons'

function Header() {
  return (
    <div>
      <div className='allHeader'>
        <div className='returnDiv'>
        <FontAwesomeIcon icon = {faArrowLeft} size='2x'></FontAwesomeIcon>
        </div>
        <div className='deckIdDiv'>
            <span>ID:5</span>
        </div>
        <div className='coinsDiv'>        
          <span>500 <FontAwesomeIcon icon = {faCoins} size='2x'></FontAwesomeIcon></span> 
        </div>
      </div>
    </div>
  )
}

export default Header