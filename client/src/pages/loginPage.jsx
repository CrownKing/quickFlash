import React, {useState, useEffect} from 'react';
import '../pages_css/loginPage.css'
import logo from '../loginLogo.png';
import {FontAwesomeIcon} from'@fortawesome/react-fontawesome'
import {faRightToBracket} from '@fortawesome/free-solid-svg-icons'

import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="App">
    <div className='logo'>
    <img src={logo} alt="Logo" />;
    </div>
    <div className='inputs'>
      <div className='input1'>
        <input id="inputId" placeholder='Email . . .' name="emailField"
        ></input>
      </div>
      <div className='input2'>
        <input id="inputId" placeholder=' Senha . . .' name="senhaField" type='password'
        ></input>
              <div className='create'>
      <span>Criar uma conta</span>
    </div>
      </div>
      
    </div>
    <div className='buttonDiv'>
      <button >
  <Link to="/home"><FontAwesomeIcon icon = {faRightToBracket} size='2x'></FontAwesomeIcon></Link>
      </button>
    </div>
  </div>
  )
}

export default LoginPage