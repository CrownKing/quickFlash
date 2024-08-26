import React, { useState } from "react";
import "../components_css/createorImportDeckModal.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function CreateorImportDeckModal({ fecha }) {
  const navigate = useNavigate();
  const [novoBaralho, setNovoBaralho] = useState(""); // Estado para armazenar o novo baralho

  const close = () => {
    fecha(); // Chama a função closeModal do componente pai
  };

  const redirect = (route) => {
    var data = localStorage.getItem("loginData");
    data = JSON.parse(data);
    if (route === "create") {
      const nomeBaralho = prompt("Digite o nome do novo baralho:"); // Exibir um alerta para incluir uma string
      if (nomeBaralho !== null) {
        Axios.post("http://localhost:3001/api/baralhos/criarBaralho", {
          baralhoNome: nomeBaralho,
          usuarioId: data[0].usuarioId,
        })
          .then((response) => {
            close();
          })
          .catch((error) => {
            console.error(
              "Erro ao fazer a solicitação para o servidor:",
              error
            );
          });
      }
      navigate("/home", {});
    }
    if (route === "import") {
      navigate("/compartilhar", {});
    }
  };

  return (
    <div className="modalDiv2">
      <div className="overlay2"></div>
      <div className="modalContent2">
        <div className="closeDiv2" onClick={() => close()}>
          <span>X</span>
        </div>
        <div className="buttonsDiv2">
          <div
            className="divCampoNovoImportar"
            onClick={() => redirect("create")}
          >
            <span>Criar novo Baralho</span>
          </div>
          <div
            className="divCampoNovoImportar"
            onClick={() => redirect("import")}
          >
            <div>
              <span>Buscar um Baralho</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateorImportDeckModal;
