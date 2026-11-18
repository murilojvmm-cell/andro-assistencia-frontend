import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <strong>Sandro Assistência Técnica — Indaiatuba-SP</strong>
        <p>Reparos rápidos, honestos e com garantia direto na sua casa.</p>
        <p className="copyright">
          © {new Date().getFullYear()} Sandro Assistência Técnica. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}