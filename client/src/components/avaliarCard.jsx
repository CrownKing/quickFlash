import React from "react";
import "../components_css/avaliarCard.css";

function AvaliarCardModal({ card }) {
  console.log(card);
  return (
    <>
      <div className="modal-overlay"></div>
      <div className="avaliar-card-modal">
        {/* Conteúdo do modal aqui */}
        {card && (
          <div className="modal-content">
            <div className="info">
              <h3>{card.pergunta}</h3>
            </div>
            <div className="innerBar"></div>
            <div className="info">
              <h4>{card.resposta}</h4>
            </div>
            <div className="avaliacaoDiv">
              <h2>
                <span className="legenda">Avalie esse card</span>
              </h2>
              <input type="text" className="avaliacao" id="" />
            </div>
            <div className="divButtons">
              <buttons className="buttonsComp">
                <button className="button">Bom</button>
                <button className="button">Ruim</button>
              </buttons>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AvaliarCardModal;
