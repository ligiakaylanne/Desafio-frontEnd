// src/Produto.js
import React from 'react';

const Produto = ({ nome, preco, imagem }) => {
  return (
    <div className="produto">
      <img src={imagem} alt={nome} />
      <h3>{nome}</h3>
      <p>R$ {preco.toFixed(2)}</p>
    </div>
  );
};

export default Produto;
