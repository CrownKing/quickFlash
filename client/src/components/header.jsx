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
  const [showAlert, setShowAlert] = useState(false); // Estado para controlar a exibição do alerta
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
      } else {
        Axios.get(
          `http://localhost:3001/api/login/monitor/getCardsSolicitados/Aluno/${data[0].usuarioId}`
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

    // Chamada inicial
    fetchData();

    // Intervalo de 5 segundos
    const intervalId = setInterval(fetchData, 5000);

    // Limpeza do intervalo ao desmontar o componente
    return () => clearInterval(intervalId);
  }, [location.pathname, onCartoesAvaliarChange]);

  const pageNavigator = () => {
    const paginaAtual = location.pathname;

    switch (paginaAtual) {
      case "/home":
        setShowAlert(true); // Exibindo o alerta
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
  };

  // Função para navegar após clicar no botão "sim" do alerta
  const handleAlertConfirm = () => {
    navigate("/", {}); // Navegar de volta para a página inicial
    setShowAlert(false); // Esconder o alerta
  };
  const handleAlertNegate = () => {
    setShowAlert(false); // Esconder o alerta
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
      {/* Alerta */}
      {showAlert && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Tem certeza que deseja retornar ao login?</p>
            <button onClick={handleAlertConfirm}>Sim</button>
            <button onClick={handleAlertNegate}>Não</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
