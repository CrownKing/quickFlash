import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../components_css/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Header() {
  const [userData, setUserdata] = useState([]);
  const location = useLocation();

  const redirect = (route) => {
    if (route === "avaliar") {
      navigate("/avaliar", {});
    }
    if (route === "import") {
      navigate("/compartilhar", {});
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    var data = JSON.parse(localStorage.getItem("loginData"));
    setUserdata(data[0]);
    const rotaAtual = location.pathname;
  }, []);

  return (
    <div>
      <div className="allHeader">
        <div className="returnDiv">
          <FontAwesomeIcon icon={faArrowLeft} size="2x"></FontAwesomeIcon>
        </div>
        <div className="deckIdDiv">
          <span>ID:{userData.usuarioId}</span>
        </div>
        <div className="coinsDiv" onClick={() => redirect("avaliar")}>
          <span>
            <FontAwesomeIcon icon={faBell} size="2x"></FontAwesomeIcon>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
