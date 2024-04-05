import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../components_css/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function Header({ onCartoesAvaliarChange }) {
  const [userData, setUserdata] = useState([]);
  const [cartoesAvaliar, setCartoesParaAvaliar] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const redirect = (route) => {
    if (route === "avaliar") {
      navigate("/avaliar", {});
    }
    if (route === "import") {
      navigate("/compartilhar", {});
    }
  };

  useEffect(() => {
    var data = JSON.parse(localStorage.getItem("loginData"));
    setUserdata(data[0]);
    const rotaAtual = location.pathname;

    const fetchData = () => {
      var data = JSON.parse(localStorage.getItem("loginData"));
      if (data[0].monitor === 1) {
        Axios.get(
          `http://localhost:3001/api/login/monitor/getCardsSolicitados/${data[0].usuarioId}`
        )
          .then((response) => {
            setCartoesParaAvaliar(response.data.length);
            onCartoesAvaliarChange(response.data);
          })
          .catch((error) => {
            console.error(
              "Erro ao fazer a solicitação para o servidor:",
              error
            );
          });
      }
    };

    const intervalId = setInterval(fetchData, 4000);

    return () => clearInterval(intervalId);
  }, [location.pathname]);

  const pageNavigator = () => {
    const paginaAtual = location.pathname;

    switch (paginaAtual) {
      case "/home":
        alert("Email ou senha inválidos");
        navigate("/", {});
        break;
      case "/cartoes":
        navigate("/home", {});
        break;
      case "/avaliar":
        navigate("/home", {});
        break;
      case "/flashcard":
        var deck = JSON.parse(localStorage.getItem("deck"));
        navigate("/cartoes", {
          state: {
            baralhoNome: deck.baralhoNome,
          },
        });
        break;
      case "/compartilhar":
        navigate("/home", {});
        break;
      default:
        console.log("URL desconhecido");
        break;
    }

    // Exemplo de uso em algum evento de clique, por exemplo:
    // <button onClick={analisarUrlParaRetorno}>Voltar</button>
  };

  return (
    <div>
      <div className="allHeader">
        <div className="returnDiv" onClick={() => pageNavigator()}>
          <FontAwesomeIcon icon={faArrowLeft} size="2x"></FontAwesomeIcon>
        </div>
        <div className="deckIdDiv">
          <span>ID:{userData.usuarioId}</span>
        </div>
        <div className="coinsDiv" onClick={() => redirect("avaliar")}>
          <span>
            {cartoesAvaliar > 0 && (
              <div className="notificacao">
                <span className="qntCartoes">{cartoesAvaliar}</span>{" "}
              </div>
            )}
            <FontAwesomeIcon icon={faBell} size="2x"></FontAwesomeIcon>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
