import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import '../components_css/header.css'
import {FontAwesomeIcon} from'@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {faCoins} from '@fortawesome/free-solid-svg-icons'

function Header() {
  const [userData, setUserdata] = useState([]);
  const location = useLocation();

  useEffect(() => {
    var data = JSON.parse(localStorage.getItem("loginData"))
    setUserdata(data[0])
    const rotaAtual = location.pathname;
    debugger
}, [])

  return (
    <div>
      <div className='allHeader'>
        <div className='returnDiv'>
        <FontAwesomeIcon icon = {faArrowLeft} size='2x'></FontAwesomeIcon>
        </div>
        <div className='deckIdDiv'>
            <span>ID:{userData.usuarioId}</span>
        </div>
        <div className='coinsDiv'>        
          <span>{userData.pontos} <FontAwesomeIcon icon = {faCoins} size='2x'></FontAwesomeIcon></span> 
        </div>
      </div>
    </div>
  )
}

export default Header