import React, { useState, useEffect } from "react";
import "../pages_css/avaliarCartao.css";
import Axios from "axios";
import NavBar from "../components/navBar";
import Header from "../components/header";
import AvaliarCardModal from "../components/avaliarCard";

function ListAvaliarCartaoPage() {
  const [listaSolicitacoes, setSolicitacoes] = useState([]);
  const [listaCartoesParaAvaliar, setAvaliacoes] = useState([]);
  const [showModalCard, setShowModalCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    if (listaSolicitacoes.length > 0) {
      const cardIdsArray = listaSolicitacoes.map((x) => x.cardId);
      Axios.post(
        "http://localhost:3001/api/cards/selecionaCardsParaAvaliacao",
        { cardIdsArray: cardIdsArray }
      ).then((response) => {
        setAvaliacoes(response.data);
      });
    }
  }, [listaSolicitacoes]);

  const handleCartoesAvaliarChange = (value) => {
    if (listaSolicitacoes.length !== value.length) {
      setSolicitacoes(value);
    }
  };
  const sendCard = (index) => {
    setShowModalCard(true);
    setSelectedCard(listaCartoesParaAvaliar[index]);
  };
  return (
    <>
      <Header onCartoesAvaliarChange={handleCartoesAvaliarChange} />
      <div className="avaliaCardDiv">
        {listaCartoesParaAvaliar.map((cartao, index) => (
          <div className="cartaoASerAvaliado" onClick={() => sendCard(index)}>
            <div className="esquerda">
              <span> {cartao.pergunta}</span>
            </div>
            <div className="direita">
              <span className="status"> Pendente</span>
            </div>
          </div>
        ))}
        {showModalCard && <AvaliarCardModal card={selectedCard} />}
      </div>
      <NavBar />
    </>
  );
}

export default ListAvaliarCartaoPage;
