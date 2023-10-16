import React from 'react'
import '../pages_css/homePage.css'
import NavBar from '../components/navBar.jsx';
import deckPhoto from '../icons/deckBox.png'
import { Link } from 'react-router-dom';


function HomePage() {
  return (
    <div className="App">
      <div className='deckDiv'>
        <div className='deckPhoto'>
          <div>
            <img src={deckPhoto} alt="Logo" />
          </div>
        </div>
        <div className='deckName'>
            <div>
            <Link to="/cartoes">
            <span> Prova 1 de Gradi</span>
            </Link>
             </div>
          </div>
      </div>
      <NavBar/>
    </div>
  )
}

export default HomePage