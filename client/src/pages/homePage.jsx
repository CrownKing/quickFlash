import React, {useState, useEffect} from 'react'
import '../pages_css/homePage.css'
import NavBar from '../components/navBar.jsx';
import deckPhoto from '../icons/deckBox.png'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'


function HomePage() {
  const [criadorId, setCriadorId] = useState(1)
  const [listaBaralhos, setBaralho] = useState([])
  const navigate = useNavigate();


  useEffect(()=>{
    Axios.post('http://localhost:3001/api/baralhos',{criadorId: 1}).then((response)=>{
      console.log(response.data)
      setBaralho(response.data)
    })
  },[])
  const selecionaBaralho = (idBaralho, idCriador) =>{
    navigate('/cartoes')
    console.log(idBaralho)
    console.log(idCriador)
  }
  return (
    <div className="App">

      {listaBaralhos.map((deck)=>{
        return (
          <div className='deckDiv' onClick={()=>selecionaBaralho(deck.baralhoId, deck.criadorId)}>
          <div className='deckPhoto'>
            <div>
              <img src={deckPhoto} alt="Logo" />
            </div>
          </div>
          <div className='deckName'>
              <div>
              <span>{deck.baralhoNome}</span>
               </div>
            </div>
        </div>
        )
      })}
      <NavBar/>
    </div>
  )
}

export default HomePage