// src/GridProdutos.js
import React from 'react';
import Produto from './Produto';

const GridProdutos = () => {
  return (
    <div className="grid-produtos">
      {Produto.map(produto => (
        <Produto
          key={produto.id}
          nome={produto.nome}
          preco={produto.preco}
          imagem={produto.imagem}
        />
      ))}
    </div>
  );
};

export default GridProdutos;
