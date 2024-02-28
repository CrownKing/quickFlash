import React, { useEffect, useState } from "react";
import NavBar from "../components/navBar";
import Header from "../components/header";
import "../pages_css/buscarBaralho.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import deckPhoto from "../icons/deckBox.png";

function BuscarBaralho() {
  const navigate = useNavigate();
  const [baralhoId, setBaralhoId] = useState(0);
  const [baralhoRetornado, setBaralhoRetornado] = useState({});
  const [showBaralhoLista, setShowBaralhoLista] = useState(false);
  const [curtido, setCurtido] = useState(false);
  const [nenhumBaralhoEncontrado, setEncontro] = useState(false);

  const search = () => {
    var data = JSON.parse(localStorage.getItem("loginData"));
    Axios.post("http://localhost:3001/api/baralhos/curtidos/getBaralho", {
      baralhoId: baralhoId,
    }).then((response) => {
      if (response.data.length === 0) {
        setEncontro(true);
      } else {
        setEncontro(false);
        setBaralhoRetornado(response.data[0]);
        setShowBaralhoLista(true);
        Axios.post("http://localhost:3001/api/baralhos/getCurtido", {
          baralhoId: baralhoId,
          usuarioId: data[0].usuarioId,
        }).then((response) => {
          if (response.data.length > 0) {
            setCurtido(true);
          } else {
            setCurtido(false);
          }
        });
      }
    });
  };

  const like = () => {
    var auxiliarLikeButton = curtido;
    var data = JSON.parse(localStorage.getItem("loginData"));
    setCurtido(!curtido);
    auxiliarLikeButton = !auxiliarLikeButton;
    if (!auxiliarLikeButton) {
      Axios.post("http://localhost:3001/api/baralhos/deslikeBaralho", {
        baralhoId: baralhoId,
        usuarioId: data[0].usuarioId,
      }).then((response) => {
        navigate("/home", {});
      });
    } else {
      Axios.post("http://localhost:3001/api/baralhos/curtirBaralho", {
        baralhoId: baralhoId,
        usuarioId: data[0].usuarioId,
      }).then((response) => {
        alert(
          "Curtido com sucesso, você vai ser redirecionado para a tela de baralhos"
        );
        navigate("/home", {});
      });
    }
  };
  return (
    <div>
      <Header />
      <div className="allCompartDiv">
        <div className="inputDiv">
          <input
            type="number"
            className="input"
            onChange={(e) => setBaralhoId(e.target.value)}
          />
          <button onClick={search}>
            <FontAwesomeIcon icon={faMagnifyingGlass}> </FontAwesomeIcon>
          </button>
        </div>
        {showBaralhoLista && (
          <div className="deckDiv">
            <div className="deckPhoto">
              <div>
                <img src={deckPhoto} alt="Logo" className="deckLogo" />
              </div>
            </div>
            <div className="deckName">
              <div className="divBGNome">
                <span> {baralhoRetornado.baralhoNome}</span>
              </div>
              {!curtido && (
                <FontAwesomeIcon
                  icon={faHeart}
                  className="icone"
                  onClick={like}
                >
                  {" "}
                </FontAwesomeIcon>
              )}
              {curtido && (
                <FontAwesomeIcon
                  icon={faHeart}
                  className="icone"
                  onClick={like}
                  style={{ color: "#dc1818" }}
                >
                  {" "}
                </FontAwesomeIcon>
              )}
            </div>
          </div>
        )}
        {nenhumBaralhoEncontrado && (
          <div>
            <span> Não encontramos nenhum baralho com esse ID</span>
          </div>
        )}
      </div>
      <NavBar />
    </div>
  );
}

export default BuscarBaralho;
