import React, { useState } from 'react'
import '../components_css/cardModal.css'
import Axios from 'axios'

function CardModal(baralhoId) {
    const [pergunta, setPergunta] = useState('')
    const [resposta, setResposta] = useState('')
    const [disciplinaId, setDisciplina] = useState('4')
    
    const salvarCartao =() =>{
        Axios.post('http://localhost:3001/api/cards/criar', {pergunta:pergunta, resposta:resposta, baralhoId: baralhoId.baralhoId, disciplinaId:disciplinaId }).then(() => {
        })
    }
    

    return (
        <div className='modalDiv'>
            <div className='overlay'></div>
            <div className='modalContent'>
                <div className='divCampoPerguntaResposta'>
                    <div className='closeDiv'>
                        <span>X</span>
                    </div>
                    <span >Pergunta</span>
                    <input onChange={(e)=>{setPergunta(e.target.value)}}></input>
                </div>
                <div className='divCampoPerguntaResposta'>
                    <span>Resposta</span>
                    <input onChange={(e)=>{setResposta(e.target.value)}}></input>
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