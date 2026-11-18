import React, { useState } from 'react';

export default function ServiceCard({ imagem, titulo, marcas, descricao, detalhes, aoAgendar }) {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="service-card">
      {/* Clicar na imagem abre ou fecha as informações */}
      <div className="service-image-wrapper" onClick={() => setAberto(!aberto)} title="Clique para ver detalhes">
        <img src={imagem} alt={titulo} />
        <span className="click-hint">
          {aberto ? 'Fechar informações' : 'Clique na foto para ver detalhes'}
        </span>
      </div>

      <div className="service-body">
        <div>
          <h3 className="service-title" onClick={() => setAberto(!aberto)}>
            {titulo}
          </h3>
          <p className="service-brands">{marcas}</p>

          {/* Informações ocultas que aparecem ao clicar na imagem */}
          {aberto && (
            <div className="service-details">
              <p>{descricao}</p>
              <ul>
                {detalhes.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button className="btn-card" onClick={aoAgendar}>
          Solicitar Orçamento
        </button>
      </div>
    </div>
  );
}