import React, { useState, useEffect } from 'react'
import '../pages_css/homePage.css'
import NavBar from '../components/navBar.jsx';
import deckPhoto from '../icons/deckBox.png'
import addBaralho from '../icons/addBaralho.png'
import Header from '../components/header.jsx';
import CreateorImportDeckModal from '../components/createorImportDeckModal.jsx';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'


function HomePage() {
  const [listaBaralhos, setBaralho] = useState([])
  const [showCriaBaralho, setShowCriaBaralho] = useState(true)
  const [userData, setUserData] = useState({})
  const [criaBralhoClickado, setCriaBaralhoClickado] = useState(false)
  const navigate = useNavigate();


  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    var data = localStorage.getItem("loginData")
    data = JSON.parse(data)
    await setUserData(data[0])
    console.log(data[0])
    Axios.post('http://localhost:3001/api/baralhos', { criadorId: data[0].usuarioId }).then((response) => {
      let qntBaralho = response.data.length
      setBaralho(response.data)
      if (qntBaralho === 3) {
        setShowCriaBaralho(false)
      }
    })
  }

  const criaBaralho = async () => {
    setCriaBaralhoClickado(true)
  }

  const selecionaBaralho = (idBaralho, baralhoNome) => {
    navigate('/cartoes', {
      state: {
        baralhoNome: baralhoNome,
      }
    })
    localStorage.setItem("baralhoId", JSON.stringify(idBaralho));
  }
  return (
    <div>
      <Header />
      <div className="App" onClick={criaBaralho}>
        {showCriaBaralho && <div className='deckDiv'>
          <div className='deckPhoto'>
            <div>
              <img src={addBaralho} alt="Logo" />
            </div>
          </div>
          <div className='deckName'>
            <div>
              <span>Criar novo Baralho</span>
            </div>
          </div>
        </div>
        }
        {listaBaralhos.map((deck) => {
          return (
            <div className='deckDiv' onClick={() => selecionaBaralho(deck.baralhoId, deck.baralhoNome)}>
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
        {criaBralhoClickado && <CreateorImportDeckModal />}
        <NavBar />
      </div>
    </div>
  )
}
export default HomePage