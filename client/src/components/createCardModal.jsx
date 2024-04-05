import React, { useState } from "react";
import "../components_css/cardModal.css";
import Axios from "axios";
import DisciplinaModal from "./disciplinaModal";

function CreateCardModal({ baralhoId, fecha }) {
  // Usar destructuring para receber as props corretamente
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [disciplinaSelecionada, setDisciplina] = useState({});
  const [usuarioId, setUsuarioId] = useState(null);

  const salvarCartao = (clicked) => {
    var data = JSON.parse(localStorage.getItem("loginData"));
    var disciplinaId = disciplinaSelecionada.disciplinaId;
    setUsuarioId(data[0].usuarioId);
    if (resposta !== "" && pergunta !== "" && disciplinaSelecionada !== null) {
      Axios.post("http://localhost:3001/api/cards/criar", {
        pergunta: pergunta,
        resposta: resposta,
        baralhoId: baralhoId,
        disciplinaId: disciplinaId,
        usuarioId: data[0].usuarioId,
      }).then((response) => {
        var cartaoId = response.data.cardId;
        if (clicked === "avaliacao") {
          Axios.post(
            "http://localhost:3001/api/login/monitor/solicitaAvaliacao",
            {
              usuarioId: data[0].usuarioId,
              cardId: cartaoId,
              disciplinaId: disciplinaId,
            }
          ).then(() => {});
        }
      });
    } else {
      alert("Preencha com alguma pergunta/resposta");
    }
  };

  const recebeDisciplinaSelecionada = (disciplina) => {
    setDisciplina(disciplina);
  };

  const click = () => {
    fecha(); // Chama a função closeModal do componente pai
  };

  const enviaParaAv = () => {};

  return (
    <div className="modalDiv">
      <div className="overlay"></div>
      <div className="modalContent">
        <div className="divCampoPerguntaResposta">
          <div className="closeDiv">
            <span onClick={click}>X</span>
          </div>
          <span>Pergunta</span>
          <input
            onChange={(e) => {
              setPergunta(e.target.value);
            }}
          ></input>
        </div>
        <div className="divCampoPerguntaResposta">
          <span>Resposta</span>
          <input
            onChange={(e) => {
              setResposta(e.target.value);
            }}
          ></input>
        </div>
        {
          <DisciplinaModal
            enviaParaAv={() => {}}
            onDisciplinaSelecionada={recebeDisciplinaSelecionada}
          />
        }
        <div className="buttonsDiv">
          <button onClick={() => salvarCartao("OK")}> OK </button>
          <button onClick={() => salvarCartao("avaliacao")}>
            Enviar para avaliação
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCardModal;
