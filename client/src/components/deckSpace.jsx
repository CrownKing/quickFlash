import React from 'react'
import '../components_css/deckSpace.css'
import deckPhoto from '../icons/deckBox.png'


const changeBaralhoNome = (novoBaralhoNome) =>{

}


function DeckSpace({baralhoNome,baralhoId}) {
  console.log(baralhoNome)
  console.log(baralhoId)
  return (
    <div className='deckDiv'>
    <div className='deckPhoto'>
      <div>
        <img src={deckPhoto} alt="Logo" className='deckLogo' />
      </div>
    </div>
    <div className='deckName'>
        <div> <span onChange={(e)=> changeBaralhoNome(e.target.value)}> {baralhoNome}</span></div>
      </div>
  </div>
  )
}

export default DeckSpace