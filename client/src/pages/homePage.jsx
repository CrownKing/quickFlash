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

  const getUserData = async () => {
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
            } else {
              setShowCriaBaralho(true);
            }
          });
        } else {
          setBaralho(getBaralhosAux);
          if (getBaralhosAux.length >= 3) {
            setShowCriaBaralho(false);
          } else {
            setShowCriaBaralho(true);
          }
        }
        setTimeout(() => setLoad(false), 3000);
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
      {showLoad && (
        <BookLoader
          background={"linear-gradient(135deg, #6066FA, #4645F6)"}
          desktopSize={"100px"}
          mobileSize={"80px"}
          textColor={"#4645F6"}
        />
      )}
      {!showLoad && (
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
                <div
                  className="deckDiv"
                  onClick={() =>
                    selecionaBaralho(deck.baralhoId, deck.baralhoNome, deck)
                  }
                >
                  <div className="deckPhoto">
                    <div>
                      <img src={deckPhoto} alt="Logo" />
                    </div>
                  </div>
                  <div className="deckName">
                    <div>
                      <span>{deck.baralhoNome}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            {criaBralhoClickado && (
              <CreateorImportDeckModal fecha={closeModal} />
            )}
            <NavBar />
          </div>
        </>
      )}
    </div>
  );
}
export default HomePage;
