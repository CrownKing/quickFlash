import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../components_css/disciplinaModal.css";
import DropdownAutocomplete from "./dropdown";

function DisciplinaModal({ fecha, onDisciplinaSelecionada }) {
  const [listaDeDiciplinas, setDiciplinas] = useState({});
  const [disciplina, setDisciplina] = useState({});

  useEffect(() => {
    Axios.get("http://localhost:3001/api/disciplinas").then((response) => {
      setDiciplinas(response.data);
      console.log(response.data);
    });
  }, []);
  const click = () => {
    fecha(); // Chama a função closeModal do componente pai
  };

  const disciplinaSelecionada = (disciplina) => {
    setDisciplina(disciplina);
    onDisciplinaSelecionada(disciplina); // Chamando a função fornecida pelo pai
  };

  return (
    <div className="teste">
      <div>
        <span>Selecione a disciplina do card para avaliação</span>
      </div>
      <DropdownAutocomplete
        className="dropdown"
        options={listaDeDiciplinas}
        labelField="nomeDisciplina"
        getOptionLabel={(option) => option.nomeDisciplina || ""} // Certifique-se de que option.nomeDisciplina não seja undefined
        onChange={disciplinaSelecionada}
      />
    </div>
  );
}

export default DisciplinaModal;
