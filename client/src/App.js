import React, {useState, useEffect} from 'react';
import logo from './loginLogo.png';
import './App.css';
import {FontAwesomeIcon} from'@fortawesome/react-fontawesome'
import {faRightToBracket} from '@fortawesome/free-solid-svg-icons'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Axios  from "axios"

function App() {
   const [usuarioEmail, setusuarioEmail] = useState('')
   const [usuarioSenha, setusuarioSenha] = useState('')
   const [IfRedirect, setRedirect] = useState(false)
   const navigate = useNavigate();

   useEffect(()=>{
    Axios.get('http://localhost:3001/api/user/email').then((response)=>{
      console.log(response)
    })
   },[])


const verifyEmaileSenha = () => {
  Axios.get('http://localhost:3001/api/user/email').then((response)=>{
    const usuario = response.data.filter(x => x.email === usuarioEmail)
    if(usuario === null || usuario === undefined || usuario.length === 0){
      alert("Email ou senha inválidos")
    }
    if(usuario[0].senha !== usuarioSenha){
      alert("Email ou senha inválidos")
    }
    else if(usuario[0].senha === usuarioSenha){
      localStorage.setItem("loginData",JSON.stringify(usuario));
      setRedirect(true)
    }
    handleRedirect()
  })
 }

 const handleRedirect = () =>{
  if (IfRedirect){
    navigate('/home')
  }
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
        <button onClick={verifyEmaileSenha}>
        <FontAwesomeIcon icon = {faRightToBracket} size='2x'></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
}

export default App;
