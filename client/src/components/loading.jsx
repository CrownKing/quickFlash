import React from "react";
import "../components_css/loading.css";
import { BookLoader } from "react-awesome-loaders";

const Loading = () => {
  return (
    <div className="loading">
      <BookLoader
        background={"linear-gradient(135deg, #8AC26D, #8AC26D)"}
        desktopSize={"100px"}
        mobileSize={"80px"}
        textColor={"#8AC26D"}
      />
    </div>
  );
};

export default Loading;
