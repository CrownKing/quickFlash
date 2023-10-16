import React from 'react'
import '../pages_css/cardsPage.css'
import NavBar from '../components/navBar'
import DeckSpace from '../components/deckSpace'
import cardIcon from '../icons/cardsIconTransparente.png'

function CardsPage() {
  return (
    <div className='allCardDiv'>
    <DeckSpace/>
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