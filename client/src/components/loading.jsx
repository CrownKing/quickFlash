import React from 'react';
import '../components_css/loading.css'

const Loading = () => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Carregando...</p>
    </div>
  );
};

export default Loading;
