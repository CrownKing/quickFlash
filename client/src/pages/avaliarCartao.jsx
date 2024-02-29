import React, { useState } from "react";
import "../pages_css/avaliarCartao.css";
import Axios from "axios";
import NavBar from "../components/navBar";
import Header from "../components/header";

function AvaliarCartaoPage() {
  const [texto1, setTexto1] = useState("");
  const [texto2, setTexto2] = useState("");
  const [inputTexto, setInputTexto] = useState("");

  const handleClickBotao1 = () => {
    // Lógica para o primeiro botão
  };

  const handleClickBotao2 = () => {
    // Lógica para o segundo botão
  };

  const handleClickBotao3 = () => {
    // Lógica para o terceiro botão
  };

  return (
    <>
      <Header />
      <div className="avaliaCardDiv">
        <div className="textoDiv">
          <h3>Pergunta</h3>
          <span>O que é a internet?</span>
          <h3>Resposta</h3>
          <span>O que é a internet?</span>
        </div>
        <div className="botoesDiv">
          <span>Avalie esse cartão</span>
          <buttons className="buttonsComponent">
            <button className="buttonTag" onClick={handleClickBotao1}>
              Bom
            </button>
            <button className="buttonTag" onClick={handleClickBotao2}>
              Ruim
            </button>
          </buttons>
        </div>
        <div className="textoDiv2">
          <span>
            Caso tenha achado ruim e quiser fornecer um feedback,preencha o
            campo abaixo
          </span>
        </div>
        <div className="inputComponent">
          <input
            className="inputTag"
            type="text"
            value={inputTexto}
            onChange={(e) => setInputTexto(e.target.value)}
          />
          <button className="buttonSend" onClick={handleClickBotao3}>
            Enviar
          </button>
        </div>
      </div>
      <NavBar />
    </>
  );
}

export default AvaliarCartaoPage;
