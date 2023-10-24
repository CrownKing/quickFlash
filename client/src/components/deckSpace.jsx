import React from 'react'
import '../components_css/deckSpace.css'
import deckPhoto from '../icons/deckBox.png'


function DeckSpace({baralhoNome}) {
  return (
    <div className='deckDiv'>
    <div className='deckPhoto'>
      <div>
        <img src={deckPhoto} alt="Logo" className='deckLogo' />
      </div>
    </div>
    <div className='deckName'>
        <div><span> {baralhoNome}</span></div>
      </div>
  </div>
  )
}

export default DeckSpace