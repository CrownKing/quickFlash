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
  const [searchTerm, setSearchTerm] = useState(0);
  const [listAllBaralhos, setlistAllBaralhos] = useState([]);
  const [listBaralhosRetornados, setlistBaralhosRetornados] = useState([]);
  const [showBaralhoLista, setShowBaralhoLista] = useState(true);
  const [curtido, setCurtido] = useState(false);
  const [nenhumBaralhoEncontrado, setEncontro] = useState(false);

  const search = () => {
    debugger;
    const baralhoIds = listBaralhosRetornados.map(
      (baralho) => baralho.baralhoId
    );
    var data = JSON.parse(localStorage.getItem("loginData"));
    Axios.post("http://localhost:3001/api/baralhos/curtidos/getBaralho", {
      baralhoId: searchTerm,
    }).then((response) => {
      if (response.data.length === 0) {
        setEncontro(true);
      } else {
        setEncontro(false);
        const baralhos = response.data.map((baralho) => ({
          ...baralho, //set5tando uma variavel curtido no baralho apenas para exibir o coração cheio ou nao no front
          curtido: false,
        }));

        setShowBaralhoLista(true);
        Axios.post("http://localhost:3001/api/baralhos/getCurtido", {
          baralhoIds: baralhoIds,
          usuarioId: data[0].usuarioId,
        }).then((response) => {
          if (response.data.length > 0) {
            const baralhosCurtidosIds = response.data.map(
              (curtido) => curtido.baralhoId
            );
            const baralhosAtualizados = baralhos.map((baralho) => ({
              ...baralho,
              curtido: baralhosCurtidosIds.includes(baralho.baralhoId),
            }));
            setlistBaralhosRetornados(baralhosAtualizados);
          } else {
            setlistBaralhosRetornados(baralhos);
          }
        });
      }
    });
  };

  const like = (index) => {
    let baralhoId = listBaralhosRetornados[index].baralhoId;
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
  useEffect(() => {
    Axios.get("http://localhost:3001/api/baralhos/getBaralhos").then(
      (response) => {
        const baralhos = response.data.map((baralho) => ({
          ...baralho, //set5tando uma variavel curtido no baralho apenas para exibir o coração cheio ou nao no front
          curtido: false,
        }));
        setlistBaralhosRetornados(baralhos);
        setlistAllBaralhos(baralhos);
      }
    );
  }, []);
  return (
    <div>
      <Header />
      <div className="allCompartDiv">
        <div className="inputDiv">
          <input
            className="input"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={search}>
            <FontAwesomeIcon icon={faMagnifyingGlass}> </FontAwesomeIcon>
          </button>
        </div>
        {nenhumBaralhoEncontrado && (
          <div>
            <span> Não encontramos nenhum baralho com esse ID</span>
          </div>
        )}
        {listBaralhosRetornados.map((baralho, index) => (
          <div key={index} className="deckDiv">
            {" "}
            {/* Move a div de deckDiv para dentro do map */}
            <div className="deckPhoto">
              <div>
                <img src={deckPhoto} alt="Logo" className="deckLogo" />
              </div>
            </div>
            <div className="deckName">
              <div className="divBGNome">
                <span>{baralho.baralhoNome}</span>
              </div>
              {!baralho.curtido && (
                <FontAwesomeIcon
                  icon={faHeart}
                  className="icone"
                  onClick={() => like(index)} // Correção aqui
                />
              )}
              {baralho.curtido && (
                <FontAwesomeIcon
                  icon={faHeart}
                  className="icone"
                  onClick={() => like(index)} // Correção aqui
                  style={{ color: "#dc1818" }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <NavBar />
    </div>
  );
}

export default BuscarBaralho;
