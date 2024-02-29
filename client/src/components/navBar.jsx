import React from "react";
import "../components_css/navBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import cards from "../icons/cards.png";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navBackGround">
      <div>
        <Link to="/perfil">
          <FontAwesomeIcon icon={faCircleUser} size="2x"></FontAwesomeIcon>
        </Link>
      </div>
      <div>
        <Link to="/home">
          <img src={cards} alt="Logo" className="card" />
        </Link>
      </div>
      <div>
        <Link to="/points">
          <FontAwesomeIcon icon={faCoins} size="2x"></FontAwesomeIcon>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
