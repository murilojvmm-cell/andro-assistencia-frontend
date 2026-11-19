import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ServiceCard from './components/ServiceCard';
import mascoteSandro from './mascote-sandro.jpg';
import imgPurificador from './purificador.png';
import { ArrowRight, Star, CheckCircle2, Lock, RefreshCw, Trash2, Check, MessageCircle } from 'lucide-react';

const API_URL = 'https://sandro-backend-fbyv.onrender.com/api/agendamentos';
const SENHA_ADMIN = 'sandro2026';

export default function App() {
  const [paginaAtual, setPaginaAtual] = useState('home');

  // Estados do formulário do cliente
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    bairro: '',
    aparelho: 'Purificador',
    descricao: ''
  });
  const [outroAparelho, setOutroAparelho] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  // Estados do Painel do Sandro
  const [autenticado, setAutenticado] = useState(false);
  const [senhaDigitada, setSenhaDigitada] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregandoLista, setCarregandoLista] = useState(false);

  const lidarComAgendamento = (nomeAparelho) => {
    setFormData((prev) => ({ ...prev, aparelho: nomeAparelho }));
    setOutroAparelho('');
    setEnviado(false);
    setPaginaAtual('contato');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setEnviando(true);

    const payload = {
      ...formData,
      aparelho: formData.aparelho === 'Outro' ? outroAparelho : formData.aparelho
    };

    try {
      const response = await fetch(API_URL, {
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
    } finally {
      setEnviando(false);
    }
  };

  // Funções do Painel Administrativo
  const buscarAgendamentos = async () => {
    setCarregandoLista(true);
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const dados = await response.json();
        // Ordena do mais recente para o mais antigo
        setAgendamentos(dados.sort((a, b) => b.id - a.id));
      }
    } catch (err) {
      console.error('Erro ao buscar agendamentos:', err);
    } finally {
      setCarregandoLista(false);
    }
  };

  useEffect(() => {
    if (paginaAtual === 'painel' && autenticado) {
      buscarAgendamentos();
    }
  }, [paginaAtual, autenticado]);

  const handleLoginAdmin = (e) => {
    e.preventDefault();
    if (senhaDigitada === SENHA_ADMIN) {
      setAutenticado(true);
      setErroSenha('');
      setSenhaDigitada('');
    } else {
      setErroSenha('Senha incorreta.');
    }
  };

  const marcarConcluido = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}/concluir`, { method: 'PUT' });
      if (response.ok) {
        buscarAgendamentos();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const excluirAgendamento = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este agendamento?')) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setAgendamentos((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatarLinkWhatsApp = (telefone, nome, aparelho) => {
    const apenasNumeros = telefone.replace(/\D/g, '');
    const numeroComDDI = apenasNumeros.startsWith('55') ? apenasNumeros : `55${apenasNumeros}`;
    const texto = encodeURIComponent(`Olá ${nome}, aqui é o Sandro da Assistência Técnica! Recebi sua solicitação para o conserto do seu ${aparelho}.`);
    return `https://wa.me/${numeroComDDI}?text=${texto}`;
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

                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={enviando}
                    style={{ width: '100%', justifyContent: 'center', opacity: enviando ? 0.7 : 1 }}
                  >
                    {enviando ? 'Enviando solicitação...' : 'Enviar Solicitação'}
                  </button>
                </form>
              )}
            </div>
          </section>
        )}

        {/* PÁGINA 4: PAINEL DO TÉCNICO (RESTRITO) */}
        {paginaAtual === 'painel' && (
          <section className="section">
            <div className="section-header">
              <span>Área Restrita</span>
              <h2>Painel de Agendamentos</h2>
            </div>

            {!autenticado ? (
              <div className="contact-box" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <form onSubmit={handleLoginAdmin}>
                  <div className="form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Lock size={16} /> Senha de Acesso
                    </label>
                    <input
                      type="password"
                      required
                      className="form-control"
                      value={senhaDigitada}
                      onChange={(e) => setSenhaDigitada(e.target.value)}
                      placeholder="Digite a senha do técnico"
                    />
                  </div>
                  {erroSenha && <p className="alert-error">{erroSenha}</p>}
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Entrar no Painel
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <p>Total de chamados: <strong>{agendamentos.length}</strong></p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-secondary" onClick={buscarAgendamentos} disabled={carregandoLista}>
                      <RefreshCw size={16} /> {carregandoLista ? 'Carregando...' : 'Atualizar Lista'}
                    </button>
                    <button className="btn-secondary" onClick={() => setAutenticado(false)}>
                      Sair
                    </button>
                  </div>
                </div>

                {carregandoLista ? (
                  <p style={{ textAlign: 'center', padding: '2rem' }}>
                    Buscando agendamentos no servidor (pode levar até 40s se o servidor estiver despertando)...
                  </p>
                ) : agendamentos.length === 0 ? (
                  <p style={{ textAlign: 'center', padding: '2rem' }}>Nenhum agendamento registrado ainda.</p>
                ) : (
                  <div className="grid-3">
                    {agendamentos.map((item) => (
                      <div
                        key={item.id}
                        className="review-card"
                        style={{
                          borderLeft: item.status === 'Concluído' ? '4px solid #22c55e' : '4px solid #facc15',
                          opacity: item.status === 'Concluído' ? 0.8 : 1
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span className="badge-yellow" style={{ margin: 0 }}>{item.aparelho}</span>
                          <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: item.status === 'Concluído' ? '#22c55e' : '#eab308' }}>
                            {item.status || 'Pendente'}
                          </span>
                        </div>

                        <h3 style={{ margin: '0.5rem 0' }}>{item.nome}</h3>
                        <p style={{ fontSize: '0.9rem', margin: '0.25rem 0' }}><strong>Bairro:</strong> {item.bairro}</p>
                        <p style={{ fontSize: '0.9rem', margin: '0.25rem 0' }}><strong>Telefone:</strong> {item.telefone}</p>
                        <p style={{ margin: '0.75rem 0', fontStyle: 'italic' }}>"{item.descricao}"</p>

                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                          <a
                            href={formatarLinkWhatsApp(item.telefone, item.nome, item.aparelho)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            style={{ backgroundColor: '#22c55e', color: '#fff', textDecoration: 'none', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                          >
                            <MessageCircle size={16} /> WhatsApp
                          </a>

                          {item.status !== 'Concluído' && (
                            <button
                              onClick={() => marcarConcluido(item.id)}
                              className="btn-secondary"
                              style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                              title="Marcar como concluído"
                            >
                              <Check size={16} /> Concluir
                            </button>
                          )}

                          <button
                            onClick={() => excluirAgendamento(item.id)}
                            className="btn-secondary"
                            style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#ef4444' }}
                            title="Excluir agendamento"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />

      {/* Botão discreto para o Sandro acessar a área administrativa */}
      <div style={{ textAlign: 'center', padding: '0.75rem', fontSize: '0.8rem', opacity: 0.6 }}>
        <button
          onClick={() => setPaginaAtual('painel')}
          style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Área do Técnico
        </button>
      </div>
    </div>
  );
}