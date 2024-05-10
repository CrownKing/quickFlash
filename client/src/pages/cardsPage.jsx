import React, { useState, useEffect } from "react";
import "../pages_css/cardsPage.css";
import CreateCardModal from "../components/createCardModal";
import NavBar from "../components/navBar";
import DeckSpace from "../components/deckSpace";
import cardIcon from "../icons/cardsIconTransparente.png";
import FlashCardPage from "./flashCardPage";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useLocation } from "react-router-dom";

function CardsPage() {
  const [cardsBaralho, setBaralho] = useState([]);
  const [baralhoId, setBaralhoId] = useState("");
  const [podeCriarCartao, setCriacao] = useState(false);
  const [showModalCriar, showModal] = useState(false);
  const [redirectToFlashcard, setRedirect] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // get userId
  let baralhoNome = location.state.baralhoNome;

  useEffect(() => {
    var data = JSON.parse(localStorage.getItem("loginData"));
    var baralhoId = localStorage.getItem("baralhoId");
    var deck = JSON.parse(localStorage.getItem("deck"));
    setBaralhoId(baralhoId);
    var cards;
    Axios.post("http://localhost:3001/api/cards", {
      baralhoId: baralhoId,
      usuarioId: data[0].usuarioId,
    }).then((response) => {
      setBaralho(response.data);
      cards = response.data;
      if (cards.length < 15 && data[0].usuarioId === deck.criadorId) { //Apenas o criador do baralho pode criar cartões, e so da pra criar um cartão baralhos que tem menos de 15 cartões
        setCriacao(true);
      }
    });
  }, []);

  const criaCartao = () => {
    showModal(true);
  };

  const redirect = (index) => {
    navigate("/flashcard", {
      state: {
        baralho: cardsBaralho,
        index: index,
      },
    });
  };
  const closeModal = () => {
    showModal(false);
  };

  return (
    <div className="allCardDiv">
      <Header />
      <DeckSpace baralhoNome={baralhoNome} baralhoId={baralhoId} />
      <div className="cardsDiv">
        {cardsBaralho.map((card, index) => {
          return (
            <div className="cardsDivContent">
              <div className="imageDiv" onClick={() => redirect(index)}>
                <img src={cardIcon} alt="Logo" />
              </div>
              <div className="textDiv" onClick={() => redirect(index)}>
                <span className="text-with-line-break">{card.pergunta}</span>
              </div>
            </div>
          );
        })}
        {podeCriarCartao && (
          <div className="cardsDivContent" onClick={criaCartao}>
            <div className="imageDiv">
              <img src={cardIcon} alt="Logo" />
            </div>
            <div className="textDiv">
              <span className="text-with-line-break">Criar um cartão</span>
            </div>
          </div>
        )}
        {showModalCriar && (
          <CreateCardModal baralhoId={baralhoId} fecha={closeModal} />
        )}
      </div>
      <NavBar />
    </div>
  );
}

export default CardsPage;
