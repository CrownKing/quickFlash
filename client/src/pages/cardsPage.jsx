import React, { useState, useEffect } from 'react'
import '../pages_css/cardsPage.css'
import CardModal from '../components/cardModal'
import NavBar from '../components/navBar'
import DeckSpace from '../components/deckSpace'
import cardIcon from '../icons/cardsIconTransparente.png'
import Axios from 'axios'
import { useLocation } from "react-router-dom";

function CardsPage() {
  const [cardsBaralho, setBaralho] = useState([])
  const [baralhoId, setBaralhoId] = useState('')
  const [podeCriarCartao, setCriacao] = useState(false)
  const [showModalCriar, showModal] = useState(false)
  const location = useLocation();

  // get userId
  let baralhoNome = location.state.baralhoNome;

  useEffect(() => {
    var baralhoId = localStorage.getItem('baralhoId')
    setBaralhoId(baralhoId)
    var cards
    Axios.post('http://localhost:3001/api/cards', { baralhoId: baralhoId }).then((response) => {
    setBaralho(response.data)
      cards = response.data
      if (cards.length < 15) {
        setCriacao(true)
      }
    })
  }, [])

  const criaCartao = () => {
    showModal(true)
  }

  const closeModal = () =>{
    debugger
    showModal(false)

  }

  return (
    <div className='allCardDiv'>
      <DeckSpace baralhoNome={baralhoNome} />
      <div className='cardsDiv'>
        {cardsBaralho.map((card) => {
          return (
            <div className='cardsDivContent'>
              <div className='imageDiv'>
                <img src={cardIcon} alt="Logo" />
              </div>
              <div className='textDiv'>
                <span className="text-with-line-break">{card.pergunta}</span>
              </div>

            </div>
          )
        })}
        {podeCriarCartao &&
          <div className='cardsDivContent' onClick={criaCartao}>
            <div className='imageDiv'>
              <img src={cardIcon} alt="Logo" />
            </div>
            <div className='textDiv'>
              <span className="text-with-line-break">Criar um cartão</span>
            </div>
          </div>}
        {showModalCriar && <CardModal baralhoId={baralhoId} fecha={closeModal} />}
      </div>
      <NavBar />
    </div>
  )
}

export default CardsPage