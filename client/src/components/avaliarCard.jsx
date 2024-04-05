import React, { useState } from "react";
import "../components_css/avaliarCard.css";
import Axios from "axios";

function AvaliarCardModal({ card }) {
  const [avaliacao, setAvl] = useState("Nenhuma avaliacao foi feita");

  const setAvaliacao = (nota) => {
    Axios.post("http://localhost:3001/api/cards/setAvaliacao", {
      cardId: card.cardId,
      avaliacao: avaliacao,
      nota: nota,
    }).then((response) => {});
  };
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
              <input
                type="text"
                className="avaliacao"
                id=""
                onChange={(e) => {
                  setAvl(e.target.value);
                }}
              />
            </div>
            <div className="divButtons">
              <buttons className="buttonsComp">
                <button className="button" onClick={() => setAvaliacao(1)}>
                  Bom
                </button>
                <button className="button" onClick={() => setAvaliacao(0)}>
                  Ruim
                </button>
              </buttons>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AvaliarCardModal;
