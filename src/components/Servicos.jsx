import React from 'react';
import ServiceCard from './ServiceCard';

export default function Servicos({ setPaginaAtual, setAparelhoSelecionado }) {
  
  // Função para ir direto para o formulário selecionando o aparelho escolhido
  const lidarComAgendamento = (nomeAparelho) => {
    setAparelhoSelecionado(nomeAparelho);
    setPaginaAtual('contato');
  };

  return (
    <div className="py-20 max-w-6xl mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-blue-600 font-bold uppercase text-sm tracking-wider">Especialidades Técnicas</span>
        <h2 className="text-4xl font-extrabold mt-2 text-gray-900">Nossos Serviços em Indaiatuba-SP</h2>
        <p className="text-gray-600 mt-3 text-lg">Clique nos cards abaixo para ver os detalhes completos de cada atendimento residencial.</p>
      </div>

      {/* Grid espaçoso com os Cards */}
      <div className="grid md:grid-cols-2 gap-10">
        
        <ServiceCard 
          icone="💧"
          titulo="Purificadores de Água"
          marcas="Marcas: Electrolux • Consul"
          descricao="Soluções completas para problemas de vazamento interno, água sem filtragem adequada, cheiro ou fluxo fraco."
          detalhes={[
            "Higienização completa e troca de elementos filtrantes originais",
            "Verificação do sistema elétrico e botões de acionamento",
            "Atendimento rápido diretamente na sua residência"
          ]}
          aoAgendar={() => lidarComAgendamento('Purificador')}
        />

        <ServiceCard 
          icone="🧺"
          titulo="Lava e Seca & Lavadoras"
          marcas="Marcas: Brastemp • Consul • Electrolux • LG • Samsung"
          descricao="Especialista em máquinas que não ligam, não centrifugam, apresentam vazamentos ou barulhos anormais."
          detalhes={[
            "Diagnóstico preciso de placas eletrônicas e motores",
            "Troca de retentores, rolamentos e mangueiras danificadas",
            "Regulagem do sistema de secagem térmica"
          ]}
          aoAgendar={() => lidarComAgendamento('Lava e Seca')}
        />

        <ServiceCard 
          icone="🍽️"
          titulo="Lava-Louças"
          marcas="Marcas: Brastemp • Consul • Electrolux • LG"
          descricao="Deixe sua lava-louças funcionando perfeitamente de novo. Resolvemos falhas de escoamento e aquecimento."
          detalhes={[
            "Limpeza e desobstrução de filtros e tubulações internas",
            "Verificação de válvulas de entrada de água",
            "Garantia formal em todas as peças substituídas"
          ]}
          aoAgendar={() => lidarComAgendamento('Lava-Louças')}
        />

        <ServiceCard 
          icone="☀️"
          titulo="Secadoras de Roupas"
          marcas="Marcas: Brastemp • Consul • Electrolux"
          descricao="Sua secadora não aquece ou demora muito? Realizamos a manutenção com total segurança e agilidade."
          detalhes={[
            "Substituição de resistências e sensores térmicos",
            "Troca de correias gastas ou partidas",
            "Teste completo de ciclo antes da entrega"
          ]}
          aoAgendar={() => lidarComAgendamento('Secadora')}
        />

      </div>
    </div>
  );
}