import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ServiceCard from './components/ServiceCard';
import mascoteSandro from './mascote-sandro.jpg';
import imgPurificador from './purificador.png';
import { ArrowRight, Star, CheckCircle2 } from 'lucide-react';


export default function App() {
  const [paginaAtual, setPaginaAtual] = useState('home');

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    bairro: '',
    aparelho: 'Purificador',
    descricao: ''
  });
  const [outroAparelho, setOutroAparelho] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState('');

  const lidarComAgendamento = (nomeAparelho) => {
    setFormData((prev) => ({ ...prev, aparelho: nomeAparelho }));
    setOutroAparelho('');
    setEnviado(false);
    setPaginaAtual('contato');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    // Se o cliente escolheu "Outro", envia o texto que ele digitou para o backend
    const payload = {
      ...formData,
      aparelho: formData.aparelho === 'Outro' ? outroAparelho : formData.aparelho
    };

    try {
      const response = await fetch('http://localhost:8080/api/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setEnviado(true);
        setFormData({ nome: '', telefone: '', bairro: '', aparelho: 'Purificador', descricao: '' });
        setOutroAparelho('');
      } else {
        setErro('Erro ao salvar no sistema. Verifique se o backend em Java está rodando.');
      }
    } catch (err) {
      console.error(err);
      setErro('Não foi possível conectar ao servidor backend.');
    }
  };

  return (
    <div className="app-container">
      <Navbar paginaAtual={paginaAtual} setPaginaAtual={setPaginaAtual} />

      <main>
        {/* PÁGINA 1: INÍCIO */}
        {paginaAtual === 'home' && (
          <div>
            <section className="hero">
              <div className="hero-grid">
                <div>
                  <span className="badge-yellow">Exclusivo em Indaiatuba-SP</span>
                  <h2>
                    Conserto de Eletrodomésticos com <span>Total Confiança</span>.
                  </h2>
                  <p>
                    Especialista em Purificadores de Água, Lava e Seca, Lava-Louças e Secadoras. Atendimento técnico honesto, rápido e direto na sua casa.
                  </p>
                  <div className="hero-buttons">
                    <button className="btn-primary" onClick={() => setPaginaAtual('contato')}>
                      Agendar Visita <ArrowRight size={18} />
                    </button>
                    <button className="btn-secondary" onClick={() => setPaginaAtual('servicos')}>
                      Ver Aparelhos Atendidos
                    </button>
                  </div>

                  <div className="hero-guarantees">
                    <span><CheckCircle2 color="#facc15" size={18} /> Peças Originais</span>
                    <span><CheckCircle2 color="#facc15" size={18} /> Garantia Formal</span>
                    <span><CheckCircle2 color="#facc15" size={18} /> Visita Rápida</span>
                  </div>
                </div>

                {/* Mascote do Sandro importado diretamente */}
                <div className="mascote-box">
                  <img
                    src={mascoteSandro}
                    alt="Mascote Sandro Assistência Técnica"
                    className="mascote-img"
                  />
                </div>
              </div>
            </section>

            <section className="section">
              <div className="section-header">
                <span>Avaliações Reais</span>
                <h2>O que dizem nossos clientes</h2>
              </div>

              <div className="grid-3">
                <div className="review-card">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#facc15" />)}
                  </div>
                  <p>"Além de excelente profissional é uma ótima pessoa! Ético, de confiança, e que realmente está preocupado em resolver o problema."</p>
                  <span className="review-author">— Cristian D Pimenta</span>
                </div>

                <div className="review-card">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#facc15" />)}
                  </div>
                  <p>"Excelente profissional! Vai direto no problema. Além de competente e justo no serviço não inventa problema que não tem."</p>
                  <span className="review-author">— Filipe</span>
                </div>

                <div className="review-card">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#facc15" />)}
                  </div>
                  <p>"Extremamente educado, se preocupou em resolver o problema procurando os melhores preços para as peças. Recomendo!"</p>
                  <span className="review-author">— Glaucio C. Pereira</span>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* PÁGINA 2: NOSSOS SERVIÇOS */}
        {paginaAtual === 'servicos' && (
          <section className="section">
            <div className="section-header">
              <span>Especialidades Técnicas</span>
              <h2>Aparelhos Atendidos</h2>
              <p>Clique diretamente na foto de cada aparelho para visualizar os detalhes do conserto.</p>
            </div>

            <div className="grid-services">
              <ServiceCard
                imagem={imgPurificador}
                titulo="Purificadores de Água"
                marcas="Electrolux • Consul"
                descricao="Soluções para vazamentos internos, água sem filtragem adequada ou fluxo fraco."
                detalhes={[
                  "Troca de elementos filtrantes originais",
                  "Higienização e reparo elétrico",
                  "Atendimento rápido na residência"
                ]}
                aoAgendar={() => lidarComAgendamento('Purificador')}
              />

              <ServiceCard
                imagem="https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=500&q=80"
                titulo="Lava e Seca"
                marcas="Brastemp • Consul • Electrolux • LG • Samsung"
                descricao="Conserto de máquinas que não ligam, não centrifugam, vazam água ou fazem barulho."
                detalhes={[
                  "Diagnóstico de placas e motores",
                  "Troca de rolamentos e retentores",
                  "Regulagem do sistema de secagem"
                ]}
                aoAgendar={() => lidarComAgendamento('Lava e Seca')}
              />

              <ServiceCard
                imagem="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=500&q=80"
                titulo="Lava-Louças"
                marcas="Brastemp • Consul • Electrolux • LG"
                descricao="Reparo completo para falhas de escoamento, aquecimento e ciclos travados."
                detalhes={[
                  "Desobstrução de filtros e tubulações",
                  "Verificação de válvulas de água",
                  "Garantia formal nas peças"
                ]}
                aoAgendar={() => lidarComAgendamento('Lava-Louças')}
              />

              <ServiceCard
                imagem="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=500&q=80"
                titulo="Secadoras de Roupas"
                marcas="Brastemp • Consul • Electrolux"
                descricao="Manutenção preventiva e corretiva para secadoras que não aquecem."
                detalhes={[
                  "Troca de resistências e sensores",
                  "Substituição de correias",
                  "Teste completo de ciclo"
                ]}
                aoAgendar={() => lidarComAgendamento('Secadora')}
              />
            </div>
          </section>
        )}

        {/* PÁGINA 3: CONTATO */}
        {paginaAtual === 'contato' && (
          <section className="section">
            <div className="section-header">
              <span>Agendamento Rápido</span>
              <h2>Solicitar Orçamento</h2>
              <p>Preencha os dados abaixo para registrar seu chamado no sistema.</p>
            </div>

            <div className="contact-box">
              {enviado ? (
                <div className="alert-success">
                  <p>Solicitação enviada com sucesso! Seus dados foram salvos e o Sandro entrará em contato em breve.</p>
                  <button
                    className="btn-secondary"
                    style={{ marginTop: '1rem' }}
                    onClick={() => setEnviado(false)}
                  >
                    Fazer novo agendamento
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Seu Nome</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      placeholder="Ex: Ana Maria"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Telefone / WhatsApp</label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        value={formData.telefone}
                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        placeholder="(19) 99999-9999"
                      />
                    </div>
                    <div className="form-group">
                      <label>Bairro em Indaiatuba</label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        value={formData.bairro}
                        onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                        placeholder="Ex: Itaici, Centro"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Aparelho com Defeito</label>
                    <select
                      className="form-control"
                      value={formData.aparelho}
                      onChange={(e) => setFormData({ ...formData, aparelho: e.target.value })}
                    >
                      <option value="Purificador">Purificador de Água</option>
                      <option value="Lava e Seca">Lava e Seca / Máquina de Lavar</option>
                      <option value="Lava-Louças">Lava-Louças</option>
                      <option value="Secadora">Secadora de Roupas</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>

                  {/* Campo condicional que abre apenas quando "Outro" é selecionado */}
                  {formData.aparelho === 'Outro' && (
                    <div className="form-group" style={{ animation: 'fadeIn 0.25s ease-in-out' }}>
                      <label>Qual é o aparelho?</label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        value={outroAparelho}
                        onChange={(e) => setOutroAparelho(e.target.value)}
                        placeholder="Ex: Geladeira, Micro-ondas, Tanquinho..."
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label>Descrição Breve do Problema</label>
                    <textarea
                      rows="3"
                      required
                      className="form-control"
                      value={formData.descricao}
                      onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                      placeholder="Ex: A máquina não está centrifugando..."
                    ></textarea>
                  </div>

                  {erro && <p className="alert-error">{erro}</p>}

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Enviar Solicitação
                  </button>
                </form>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}