import React, { useState, useEffect } from 'react';
import './styles.css'; // Importa o arquivo de estilo CSS

const App = () => {
  const [produtos, setProdutos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=${page}&rows=6&sortBy=id&orderBy=DESC`);
        if (!response.ok) {
          throw new Error('Falha ao carregar os dados');
        }
        const data = await response.json();
        setProdutos(data.products);

        // Atualiza o estado de hasNextPage e hasPrevPage
        setHasNextPage(data.products.length === 6);
        setHasPrevPage(page > 1);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchData();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div>
      {/* Cabeçalho */}
      <header className="header">
        <div className="logo">MKS Sistemas</div>
        <div className="carrinho">
          <i className="fa fa-shopping-cart"></i> {/* Ícone do carrinho */}
        </div>
      </header>

      {/* Produtos */}
      <div className="produtos-container">
        {produtos.map((produto, index) => (
          <div key={produto.id} className={`product${index % 3 === 2 ? ' last-in-row' : ''}`}>
            <h2>{produto.name}</h2>
            <div className="descricao">
              <p>{produto.description.slice(0, 50)}...</p> {/* Exibe apenas os primeiros 50 caracteres da descrição */}
              <div className="valor">Preço: R$ {produto.price}</div>
            </div>
            <img src={produto.photo} alt={produto.name} />
            <button className="comprar-button">Comprar</button> {/* Botão Comprar após a imagem */}
          </div>
        ))}
      </div>

      {/* Paginação */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={!hasPrevPage}>Anterior</button>
        <span>Página {page}</span>
        <button onClick={handleNextPage} disabled={!hasNextPage}>Próxima</button>
      </div>

      {/* Rodapé */}
      <footer className="footer">
        © 2024 MKS Sistemas. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default App;
