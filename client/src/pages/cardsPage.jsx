import React, { useState, useEffect } from 'react'
import '../pages_css/cardsPage.css'
import NavBar from '../components/navBar'
import DeckSpace from '../components/deckSpace'
import cardIcon from '../icons/cardsIconTransparente.png'
import Axios from 'axios'
import { useLocation } from "react-router-dom";

function CardsPage() {
  const [baralhoId, setBaralhoId] = useState('')
  const [cardsBaralho, setBaralho] = useState([])
  const location = useLocation();

// get userId
  let baralhoNome = location.state.baralhoNome;

  useEffect(()=>{
    var baralhoId = localStorage.getItem('baralhoId')
     Axios.post('http://localhost:3001/api/cards',{baralhoId: baralhoId}).then((response)=>{
      setBaralho(response.data)
    })
   },[])
  
   console.log(cardsBaralho)

  return (
    <div className='allCardDiv'>
    <DeckSpace baralhoNome={baralhoNome}/>
    <div className='cardsDiv'>
        <div className='cardsDivContent'>
        <div>
        <img src={cardIcon} alt="Logo" />
        <span>O que é a internet?</span>
        </div>
        <div>
        <img src={cardIcon} alt="Logo" />
        <span>O que é a internet?</span>
        </div>        <div>
        <img src={cardIcon} alt="Logo" />
        <span>O que é a internet?</span>
        </div>        <div>
        <img src={cardIcon} alt="Logo" />
        <span>O que é a internet?</span>
        </div>        <div>
        <img src={cardIcon} alt="Logo" />
        <span>O que é a internet?</span>
        </div>        <div>
        <img src={cardIcon} alt="Logo" />
        <span>O que é a internet?</span>
        </div>        <div>
        <img src={cardIcon} alt="Logo" />
        <span>O que é a internet?</span>
        </div>        <div>
        <img src={cardIcon} alt="Logo" />
        <span>O que é a internet?</span>
        </div>        <div>
        <img src={cardIcon} alt="Logo" />
        <span>O que é a internet?</span>
        </div>        <div>
        <img src={cardIcon} alt="Logo" />
        <span>O que é a internet?</span>
        </div>
        </div>
    </div>
    <NavBar/>
    </div>
  )
}

export default CardsPage