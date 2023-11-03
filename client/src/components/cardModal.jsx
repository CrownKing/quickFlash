import React, { useState } from 'react'
import '../components_css/cardModal.css'
import Axios from 'axios'

function CardModal({ baralhoId, fecha }) { // Usar destructuring para receber as props corretamente
    const [pergunta, setPergunta] = useState('')
    const [resposta, setResposta] = useState('')
    const [disciplinaId, setDisciplina] = useState('4')
    
    const salvarCartao = () => {
        Axios.post('http://localhost:3001/api/cards/criar', { pergunta, resposta, baralhoId, disciplinaId }).then(() => {
        })
    }

    const click = () => {
        fecha(); // Chama a função closeModal do componente pai
    }

    return (
        <div className='modalDiv'>
            <div className='overlay'></div>
            <div className='modalContent'>
                <div className='divCampoPerguntaResposta'>
                    <div className='closeDiv' onClick={click}>
                        <span>X</span>
                    </div>
                    <span >Pergunta</span>
                    <input onChange={(e) => { setPergunta(e.target.value) }}></input>
                </div>
                <div className='divCampoPerguntaResposta'>
                    <span>Resposta</span>
                    <input onChange={(e) => { setResposta(e.target.value) }}></input>
                </div>
                <div className='buttonsDiv'>
                    <button onClick={salvarCartao}> OK </button>
                    <button> Enviar para avaliação</button>
                </div>
            </div>
        </div>
    )
}

export default CardModal
