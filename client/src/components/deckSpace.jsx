import React from 'react'
import '../components_css/deckSpace.css'
import deckPhoto from '../icons/deckBox.png'


function DeckSpace() {
  return (
    <div className='deckDiv'>
    <div className='deckPhoto'>
      <div>
        <img src={deckPhoto} alt="Logo" className='deckLogo' />
      </div>
    </div>
    <div className='deckName'>
        <div><span> Prova 1 de Gradi</span></div>
      </div>
  </div>
  )
}

export default DeckSpace