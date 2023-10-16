import React, { useState } from 'react'
import '../pages_css/newAccountPage.css'
import novaConta from '../icons/novaConta.png'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from'@fortawesome/react-fontawesome'
import {faRightToBracket} from '@fortawesome/free-solid-svg-icons'
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import Axios  from "axios"


function NewAccountPage() {
  const [usuarioEmail, setusuarioEmail] = useState('')
  const [usuarioSenha, setusuarioSenha] = useState('')
  const [usuarioNome, setusuarioNome] = useState('')
  const [usuarioConfirmaSenha, setusuarioConfirmaSenha] = useState('')
  
const createCadastro = () => {
if(usuarioSenha === usuarioConfirmaSenha){
 Axios.post('http://localhost:3001/user', {usuarioNome: usuarioNome, usuarioEmail: usuarioEmail , usuarioSenha: usuarioSenha}).then(()=>{
   alert('deu bom')
 })
}
else
  alert('A senhas não são compativeis')
}
  return (
    <div className='contaPage'>
        <div className='logo'>
            <img src={novaConta} alt="Logo" />;
        </div>
        <div className='inputsDiv'>
            <input placeholder='Nome . . .' id='inputCriarConta' type='text' name='usuarioNome' onChange={(e)=>{setusuarioNome(e.target.value)}}></input>
            <input placeholder='E-Mail . . .' id='inputCriarConta' type='text' name='usuarioEmail' onChange={(e)=>{setusuarioEmail(e.target.value)}}></input>
            <input placeholder='Senha . . .' id='inputCriarConta' type='password' name='usuarioSenha' onChange={(e)=>{setusuarioSenha(e.target.value)}}></input>
            <input placeholder='Confirmar senha . . .' id='inputCriarConta' type='password' name='usuarioConfirmaSenha' onChange={(e)=>{setusuarioConfirmaSenha(e.target.value)}}></input>
        </div>
        <div className='buttons'>
            <button>
            <Link to="/">
            <FontAwesomeIcon icon = {faXmark} size='2x'></FontAwesomeIcon>
            </Link>
            </button>
            <button onClick={createCadastro}>
            <Link to=""></Link>
            <FontAwesomeIcon icon = {faRightToBracket} size='2x'></FontAwesomeIcon>
            </button>
        </div>
    </div>
  )
}

export default NewAccountPage