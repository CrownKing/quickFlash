import React, {useState, useEffect} from 'react';
import logo from './loginLogo.png';
import './App.css';
import {FontAwesomeIcon} from'@fortawesome/react-fontawesome'
import {faRightToBracket} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import Axios  from "axios"

function App() {
   const [usuarioEmail, setusuarioEmail] = useState('')
   const [usuarioSenha, setusuarioSenha] = useState('')

   useEffect(()=>{
    Axios.get('http://localhost:3001/api/user/email').then((response)=>{
      console.log(response)
    })
   },[])

const createCadastro = () => {
  Axios.post('http://localhost:3001/user', {usuarioNome:'John Jhon', usuarioEmail: usuarioEmail , usuarioSenha: usuarioSenha}).then(()=>{
    alert('deu bom')
  })
 }
  return (
    <div className="App">
      <div className='logo'>
      <img src={logo} alt="Logo" />
      </div>
      <div className='inputs'>
        <div className='input1'>
          <input id="inputId" placeholder='Email . . .' name="usuarioEmail" onChange={(e)=>{setusuarioEmail(e.target.value)}}
          ></input>
        </div>
        <div className='input2'>
          <input id="inputId" type='password' placeholder=' Senha . . .' name="usuarioSenha" onChange={(e)=> setusuarioSenha(e.target.value)}
          ></input>
                <div className='create'>
        <span>
        <Link to="/novaConta">Criar uma conta</Link></span>
      </div>
        </div>
        
      </div>
      <div className='buttonDiv'>
        <button>
        <Link to="/home"><FontAwesomeIcon icon = {faRightToBracket} size='2x'></FontAwesomeIcon></Link>
        </button>
      </div>
    </div>
  );
}

export default App;
