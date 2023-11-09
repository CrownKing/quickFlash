import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import '../pages_css/flashcardPage.css'
import { useLocation } from "react-router-dom";
import NavBar from '../components/navBar'


function FlashCardPage() {
    const [cardAtual, setCardAtual] = useState({})
    const [showResposta, setResposta] = useState(false)
    const [index, setIndex] = useState(0)
    const location = useLocation();

    let allBaralho = location.state.baralho;
    let indexCardSelecionado = location.state.index

    useEffect(() => {
        setCardAtual(allBaralho[indexCardSelecionado])
        setIndex(indexCardSelecionado)
    }, [])

    const clickButtonResposta = () => {
        setResposta(true)
    }

    const changeFlashCardPlus = () => {
        if (index === allBaralho.length-1) {
            setIndex(0)
        }
        else {
            let aux = index + 1
            setIndex(aux)
        }
        setCardAtual(allBaralho[index])
        console.log(allBaralho[index])
        console.log(index)
    }

    const changeFlashCardMinus = () => {
        if (index === 0) {
           setIndex(allBaralho.length-1)
        }
        else {
            let aux = index - 1 
            setIndex(aux)
        }
        setCardAtual(allBaralho[index])
        console.log(allBaralho[index])
        console.log(index)
    }
    return (
        <div className='allflashCardDiv'>
            <div className='cardDiv'>
                <div onClick={changeFlashCardMinus}>
                    <FontAwesomeIcon icon={faChevronLeft} size='2x'></FontAwesomeIcon>
                </div>
                {!showResposta && <div className='textDiv'>
                    <span>
                        {cardAtual.pergunta}
                    </span>
                    <div className='divButton'>
                        <button onClick={clickButtonResposta}>Resposta</button>
                    </div>

                </div>}
                {showResposta && <div className='textDiv'>
                    <span>
                        {cardAtual.resposta}
                    </span>
                    <div className='divButton'>
                        <button></button>
                        <button></button>
                        <button></button>
                        <button></button>
                    </div>

                </div>}
                <div onClick={changeFlashCardPlus}>
                    <FontAwesomeIcon icon={faChevronRight} size='2x'></FontAwesomeIcon>
                </div>

            </div>
            <NavBar />
        </div>
    )
}

export default FlashCardPage