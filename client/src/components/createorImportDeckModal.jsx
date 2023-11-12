import React from 'react'
import '../components_css/createorImportDeckModal.css'

function CreateorImportDeckModal() {
    return (
        <div className='modalDiv2'>{/*Acabei de descobrir que as classNames tem comportamento global, entao pra nao ficar inventando nomes novos para cada uma das classes mesmo as que se repetem, eu vou colocar numero de acordo com a ordem de criação das divs, o modal de criar cartão veio antes desse*/}
            <div className='overlay2'></div>
            <div className='modalContent2'>
                <div className='closeDiv2'>
                    <span>X</span>
                </div>
                <div className='buttonsDiv2'>
                <div className='divCampoNovoImportar'>
                    <span >Criar novo Baralho</span>
                </div>
                <div className='divCampoNovoImportar'>
                    <div>
                        <span>Buscar um Baralho</span>
                    </div>

                </div>
                </div>
            </div>
        </div>
    )
}

export default CreateorImportDeckModal
