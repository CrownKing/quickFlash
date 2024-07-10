import React, { useState, useEffect } from "react";
import "../pages_css/homePage.css";
import NavBar from "../components/navBar.jsx";
import deckPhoto from "../icons/deckBox.png";
import addBaralho from "../icons/addBaralho.png";
import Header from "../components/header.jsx";
import CreateorImportDeckModal from "../components/createorImportDeckModal.jsx";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { BookLoader } from "react-awesome-loaders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";

function HomePage() {
  const [listaBaralhos, setBaralho] = useState([]);
  const [showCriaBaralho, setShowCriaBaralho] = useState(true);
  const [userData, setUserData] = useState({});
  const [criaBralhoClickado, setCriaBaralhoClickado] = useState(false);
  const [showLoad, setLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, []);

  const closeModal = () => {
    setCriaBaralhoClickado(false);
  };
  const dislike = (baralhoId, criadorId) => {
    var data = localStorage.getItem("loginData");
    data = JSON.parse(data);
    if (criadorId != data[0].usuarioId) {
      Axios.post("http://localhost:3001/api/baralhos/deslikeBaralho", {
        usuarioId: data[0].usuarioId,
        baralhoId: baralhoId,
      }).then((response) => {});
    } else {
      Axios.delete(
        `http://localhost:3001/api/baralhos/deleteBaralho/${baralhoId}`,
        {}
      ).then((response) => {});
    }
  };

  const getUserData = async () => {
    setLoad(true);
    var data = localStorage.getItem("loginData");
    data = JSON.parse(data);
    await setUserData(data[0]);
    Axios.post("http://localhost:3001/api/baralhos", {
      criadorId: data[0].usuarioId,
    }).then((response) => {
      let getBaralhosAux = [];
      getBaralhosAux = response.data;
      Axios.post("http://localhost:3001/api/baralhos/curtidos", {
        usuarioId: data[0].usuarioId,
      }).then((response) => {
        var idsCurtidos = [];
        if (response.data.length !== 0) {
          for (let i = 0; i < response.data.length; i++) {
            idsCurtidos.push(response.data[i].baralhoId);
          }
          Axios.post(
            "http://localhost:3001/api/baralhos/buscarBaralhoCompartilhado",
            { baralhosId: idsCurtidos }
          ).then((response) => {
            response.data.map((x) => getBaralhosAux.push(x));
            setBaralho(getBaralhosAux);
            let qntBaralho = getBaralhosAux.length;
            if (qntBaralho >= 3) {
              setShowCriaBaralho(false);
              setTimeout(() => setLoad(false), 1000);
            } else {
              setShowCriaBaralho(true);
              setTimeout(() => setLoad(false), 1000);
            }
          });
        } else {
          setBaralho(getBaralhosAux);
          if (getBaralhosAux.length >= 3) {
            setShowCriaBaralho(false);
            setTimeout(() => setLoad(false), 1000);
          } else {
            setShowCriaBaralho(true);
            setTimeout(() => setLoad(false), 1000);
          }
        }
      });
    });
  };
  const criaBaralho = async () => {
    setCriaBaralhoClickado(true);
  };

  const selecionaBaralho = (idBaralho, baralhoNome, deck) => {
    localStorage.setItem("deck", JSON.stringify(deck));
    navigate("/cartoes", {
      state: {
        baralhoNome: baralhoNome,
      },
    });
    localStorage.setItem("baralhoId", JSON.stringify(idBaralho));
  };
  return (
    <div>
      <div
        className="overlay"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semi-transparente para escurecer a tela
          display: showLoad ? "flex" : "none", // Mostra o overlay apenas se showLoad for true
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000, // Z-index alto para garantir que cubra outros elementos
        }}
      >
        {/* Componente de loader */}
        {showLoad && (
          <BookLoader
            background={"linear-gradient(135deg, #557942, #8AC26D)"}
            desktopSize={"30px"}
            mobileSize={"80px"}
            textColor={"#8AC26D"}
          />
        )}
      </div>
      <>
        <Header />
        <div className="App">
          {showCriaBaralho && (
            <div className="deckDiv" onClick={criaBaralho}>
              <div className="deckPhoto">
                <div>
                  <img src={addBaralho} alt="Logo" />
                </div>
              </div>
              <div className="deckName">
                <div>
                  <span>Criar novo Baralho</span>
                </div>
              </div>
            </div>
          )}
          {listaBaralhos.map((deck) => {
            return (
              <div className="deckDiv">
                <div
                  className="deckPhoto"
                  onClick={() =>
                    selecionaBaralho(deck.baralhoId, deck.baralhoNome, deck)
                  }
                >
                  <div>
                    <img src={deckPhoto} alt="Logo" />
                  </div>
                </div>
                <div
                  className="deckName"
                  onClick={() =>
                    selecionaBaralho(deck.baralhoId, deck.baralhoNome, deck)
                  }
                >
                  <div>
                    <span>{deck.baralhoNome}</span>
                  </div>
                  <div
                    style={{
                      width: "10%",
                      marginLeft: "16px",
                    }}
                  >
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faHeartCrack}
                        style={{
                          color: "#dc1818",
                          backgroundColor: "transparent",
                        }}
                        onClick={() => dislike(deck.baralhoId, deck.criadorId)} // Correção aqui
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {criaBralhoClickado && <CreateorImportDeckModal fecha={closeModal} />}
          <NavBar />
        </div>
      </>
    </div>
  );
}
export default HomePage;
