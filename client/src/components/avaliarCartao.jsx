import React, { useState } from "react";
import "../components_css/avaliarCartao.css";
import Axios from "axios";

function AvaliarCartaoModal() {
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
    <div className="novoComponente">
      <div className="textoDiv">{texto1}</div>
      <div className="botoesDiv">
        <button onClick={handleClickBotao1}>Botão 1</button>
        <button onClick={handleClickBotao2}>Botão 2</button>
      </div>
      <div className="textoDiv">{texto2}</div>
      <div className="inputDiv">
        <input
          type="text"
          value={inputTexto}
          onChange={(e) => setInputTexto(e.target.value)}
        />
        <button onClick={handleClickBotao3}>Botão 3</button>
      </div>
    </div>
  );
}

export default AvaliarCartaoModal;
