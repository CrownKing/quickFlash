import React, {useState, useEffect} from 'react'
import '../pages_css/homePage.css'
import NavBar from '../components/navBar.jsx';
import deckPhoto from '../icons/deckBox.png'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'

import CardsPage from './cardsPage';

function HomePage() {
  const [listaBaralhos, setBaralho] = useState([])
  const [userData, setUserData] = useState({})
  const navigate = useNavigate();


  useEffect(()=>{
    getUserData()
  },[])

   const getUserData = async () =>{
    var data = localStorage.getItem("loginData")
    data = JSON.parse(data)
    await setUserData(data[0])
    console.log(data[0])
    Axios.post('http://localhost:3001/api/baralhos',{criadorId: data[0].usuarioId}).then((response)=>{
    setBaralho(response.data)
    })
  }

  const selecionaBaralho = (idBaralho, baralhoNome) =>{
    navigate('/cartoes',{
      state:{
      baralhoNome:baralhoNome,
      }
    })
    localStorage.setItem("baralhoId",JSON.stringify(idBaralho));
  }
  return (
    <div className="App">

      {listaBaralhos.map((deck)=>{
        return (
          <div className='deckDiv' onClick={()=>selecionaBaralho(deck.baralhoId, deck.baralhoNome)}>
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