import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../pages_css/flashcardPage.css";
import { useLocation } from "react-router-dom";
import NavBar from "../components/navBar";
import Axios from "axios";
import Header from "../components/header";

function FlashCardPage() {
  const [cardAtual, setCardAtual] = useState({});
  const [showResposta, setResposta] = useState(false);
  const [index, setIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  let allBaralho = location.state.baralho;
  let indexCardSelecionado = location.state.index;

  useEffect(() => {
    setCardAtual(allBaralho[indexCardSelecionado]);
    setIndex(indexCardSelecionado);
  }, []);

  const clickButtonResposta = () => {
    setResposta(true);
  };
  const clickButtonAvaliarResposta = (resposta) => {
    var data = JSON.parse(localStorage.getItem("loginData"));
    var usuarioId = data[0].usuarioId;
    var dataResposta = new Date();
    var cardId = allBaralho[index].cardId;
    Axios.post("http://localhost:3001/api/flashcard/respondeCard", {
      resposta,
      usuarioId,
      cardId,
      dataResposta,
    }).then((response) => {
      changeFlashCardPlus();
    });
    setResposta(false);
  };

  const changeFlashCardPlus = () => {
    if (index === allBaralho.length - 1) {
      alert("Você finalizou todos os seus cartões!!!! Vá descansar um pouco.");
      navigate("/home", {});
    } else {
      let aux = index + 1;
      setIndex(aux);
    }
    setCardAtual(allBaralho[index]);
    console.log(allBaralho[index]);
    console.log(index);
  };

  const changeFlashCardMinus = () => {
    if (index === 0) {
      setIndex(allBaralho.length - 1);
    } else {
      let aux = index - 1;
      setIndex(aux);
    }
    setCardAtual(allBaralho[index]);
  };
  return (
    <>
      <Header />
      <div className="allflashCardDiv">
        <div className="cardDiv">
          <div className="errorDiv">
            <span style={{ fontWeight: 600 }}>Encontrou algum erro?</span>
            <div className="divButton">
              <span className="errorButton">Enviar para avaliação</span>
            </div>
          </div>
          <div className="cardContent">
            <div onClick={changeFlashCardMinus} className="iconDiv">
              <FontAwesomeIcon icon={faChevronLeft} size="2x"></FontAwesomeIcon>
            </div>
            {!showResposta && (
              <div className="flashCardTextDiv">
                <span>{cardAtual.pergunta}</span>
                <div className="divButton">
                  <button onClick={clickButtonResposta}>Resposta</button>
                </div>
              </div>
            )}
            {showResposta && (
              <div className="flashCardTextDiv">
                <span>{cardAtual.resposta}</span>
                <div className="divButton">
                  <button
                    onClick={(e) => clickButtonAvaliarResposta(e.target.id)}
                    id="1"
                  >
                    1
                  </button>
                  <button
                    onClick={(e) => clickButtonAvaliarResposta(e.target.id)}
                    id="2"
                  >
                    2
                  </button>
                  <button
                    onClick={(e) => clickButtonAvaliarResposta(e.target.id)}
                    id="3"
                  >
                    3
                  </button>
                  <button
                    onClick={(e) => clickButtonAvaliarResposta(e.target.id)}
                    id="4"
                  >
                    4
                  </button>
                </div>
              </div>
            )}
            <div onClick={changeFlashCardPlus} className="iconDiv">
              <FontAwesomeIcon
                icon={faChevronRight}
                size="2x"
              ></FontAwesomeIcon>
            </div>
          </div>
        </div>
        <NavBar />
      </div>
    </>
  );
}

export default FlashCardPage;
