import React from 'react'
import '../components_css/navBar.css'
import {FontAwesomeIcon} from'@fortawesome/react-fontawesome'
import {faCircleUser} from '@fortawesome/free-solid-svg-icons'
import {faCoins} from '@fortawesome/free-solid-svg-icons'
import cards from '../icons/cards.png';

function NavBar() {
  return (
    <div className='navBackGround'>
        <div>
        <FontAwesomeIcon icon = {faCircleUser} size='2x'></FontAwesomeIcon>
        </div>
        <div>
            <img src={cards} alt="Logo" className='card' />
        </div>
        <div>
        <FontAwesomeIcon icon = {faCoins} size='2x'></FontAwesomeIcon>
        </div>
    </div>
  )
}

export default NavBar