import React, { useState } from "react";

function AlertaComDoisBotoes({ mensagem, acaoAoConfirmar }) {
  const [mostrarAlerta, setMostrarAlerta] = useState(true);

  const confirmarAcao = () => {
    acaoAoConfirmar(); // Executa a ação fornecida ao confirmar
    setMostrarAlerta(false); // Fecha o alerta
  };

  const fecharAlerta = () => {
    setMostrarAlerta(false); // Fecha o alerta
  };

  return (
    <>
      {mostrarAlerta && (
        <div className="alerta">
          <p>{mensagem}</p>
          <button onClick={confirmarAcao}>Sim</button>
          <button onClick={fecharAlerta}>Não</button>
        </div>
      )}
    </>
  );
}

function App() {
  const handleConfirmar = () => {
    console.log("Ação realizada ao pressionar 'Sim'");
    // Faça aqui o que você quer que aconteça quando o botão "Sim" for pressionado
  };

  return (
    <div className="App">
      <h1>Exemplo de Alerta com Dois Botões</h1>
      <AlertaComDoisBotoes
        mensagem="Você deseja confirmar a ação?"
        acaoAoConfirmar={handleConfirmar}
      />
    </div>
  );
}

export default App;
