
import React from 'react';
import { PhoneCall } from 'lucide-react';

export default function Navbar({ paginaAtual, setPaginaAtual }) {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="brand" onClick={() => setPaginaAtual('home')}>
          <h1>SANDRO <span>ASSISTÊNCIA</span></h1>
          <p>Atendimento Residencial em Indaiatuba-SP</p>
        </div>

        <nav className="nav-links">
          <button
            className={`nav-btn ${paginaAtual === 'home' ? 'active' : ''}`}
            onClick={() => setPaginaAtual('home')}
          >
            Início
          </button>
          <button
            className={`nav-btn ${paginaAtual === 'servicos' ? 'active' : ''}`}
            onClick={() => setPaginaAtual('servicos')}
          >
            Nossos Serviços
          </button>
          <button
            className={`nav-btn ${paginaAtual === 'contato' ? 'active' : ''}`}
            onClick={() => setPaginaAtual('contato')}
          >
            Contato & Agendamento
          </button>
        </nav>

        <a
          href="https://wa.me/5519999999999"
          target="_blank"
          rel="noreferrer"
          className="btn-whatsapp"
        >
          <PhoneCall size={16} />
          WhatsApp
        </a>
      </div>
    </header>
  );
}