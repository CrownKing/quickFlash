import React, { useState } from "react";
import "../pages_css/avaliarCartao.css";
import Axios from "axios";
import NavBar from "../components/navBar";
import Header from "../components/header";

function ListAvaliarCartaoPage() {
  const [listaCartoesParaAv, setCartoesAvaliar] = useState([]);

  const handleClickBotao1 = () => {
    // Lógica para o primeiro botão
  };

  const handleClickBotao2 = () => {
    // Lógica para o segundo botão
  };

  const handleCartoesAvaliarChange = (value) => {
    debugger;
    if (listaCartoesParaAv.length != value.length) {
      setCartoesAvaliar(value);
    }
    // avaliacao: "";
    // avaliadorId: 1;
    // cardId: 51;
    // usuarioId: 1;
  };

  return (
    <>
      <Header onCartoesAvaliarChange={handleCartoesAvaliarChange} />
      <div className="avaliaCardDiv">
        {listaCartoesParaAv.map((cartao) => (
          <div className="cartaoASerAvaliado">
            <div className="direita">
              <span> Aqui vem a pergunta do card</span>
            </div>
            <div className="esquerda">
              <span> Aqui vem o nome de quem mandou</span>
              <span> Status da duvida, se foi respondida ou n</span>
            </div>
          </div>
        ))}
        {/* <div className="textoDiv">
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
        </div> */}
      </div>
      <NavBar />
    </>
  );
}

export default ListAvaliarCartaoPage;
