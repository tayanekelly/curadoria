// Database e Estado Global
const STATE = {
  currentTab: 'tools',
  savedIds: new Set(JSON.parse(localStorage.getItem('sintaxia_saved') || '[]')),
  
  categories: [
    { id: 'compras_publicas', name: 'Compras Públicas & Licitações', icon: 'fa-file-signature', tag: '#ComprasPúblicas' },
    { id: 'minutas_contratos', name: 'Minutas & Redação de Contratos', icon: 'fa-file-contract', tag: '#MinutasEContratos' },
    { id: 'resumo_processos', name: 'Análise & Resumo de Processos', icon: 'fa-folder-open', tag: '#ResumoDeProcessos' },
    { id: 'transcricao_atas', name: 'Transcrição & Atas Reunião', icon: 'fa-headset', tag: '#TranscriçãoDeAtas' },
    { id: 'pesquisa_precedentes', name: 'Pesquisa & Precedentes', icon: 'fa-magnifying-glass-location', tag: '#PesquisaEPrecedentes' },
    { id: 'linguagem_simples', name: 'Linguagem Simples & Atendimento', icon: 'fa-comments', tag: '#LinguagemSimples' }
  ],

 tools: [
    // --- RESUMO & ANÁLISE DE PROCESSOS ---
    {
      id: 't1',
      name: 'NotebookLM',
      category: 'resumo_processos',
      pricing: 'Gratuito',
      compliance: ['LGPD Ready', 'Leitura de PDFs Longos'],
      desc: 'Ferramenta da Google ideal para ler centenas de páginas de cadernos processuais e criar resumos fundamentados sem alucinações.',
      url: 'https://notebooklm.google.com',
      badge: 'Destaque Setor Público'
    },

    // --- PESQUISA & PRECEDENTES ---
    {
      id: 't2',
      name: 'Casetext (CoCounsel)',
      category: 'pesquisa_precedentes',
      pricing: 'Pago',
      compliance: ['Segurança Jurídica'],
      desc: 'Assistente jurídico treinado para pesquisa jurisprudencial rápida, revisão de documentos e análise de riscos.',
      url: 'https://casetext.com',
      badge: 'Popular Jurídico'
    },
    {
      id: 't4',
      name: 'Jusbrasil IA',
      category: 'pesquisa_precedentes',
      pricing: 'Freemium',
      compliance: ['Tribunais Brasileiros'],
      desc: 'Busca inteligente integrada à maior base de julgados, doutrinas e Diários Oficiais do Brasil.',
      url: 'https://jusbrasil.com.br'
    },

    // --- COMPRAS PÚBLICAS & LICITAÇÕES ---
    {
      id: 't3',
      name: 'Claude 3.5 Sonnet',
      category: 'compras_publicas',
      pricing: 'Freemium',
      compliance: ['Lei 14.133/2021', 'Análise de Tabelas'],
      desc: 'Destaca-se na redação de Estudos Técnicos Preliminares (ETP) e Termos de Referência (TR) pela alta precisão em linguagem formal.',
      url: 'https://claude.ai',
      badge: 'Recomendado'
    },

    // -------------------------------------------------------------
    // NOVAS FERRAMENTAS: MINUTAS & REDAÇÃO DE CONTRATOS
    // -------------------------------------------------------------
    {
      id: 't5',
      name: 'Spellbook',
      category: 'minutas_contratos',
      pricing: 'Pago',
      compliance: ['Integração com MS Word', 'Análise de Riscos'],
      desc: 'Funciona diretamente dentro do Microsoft Word para sugerir cláusulas, identificar riscos e redigir minutas contratuais em segundos.',
      url: 'https://www.spellbook.legal',
      badge: 'Essencial para Word'
    },
    {
      id: 't6',
      name: 'Harvey AI',
      category: 'minutas_contratos',
      pricing: 'Pago',
      compliance: ['Privacidade Corporativa', 'Modelos Avançados'],
      desc: 'IA jurídica de nível empresarial especializada em análise complexa de contratos, Due Diligence e elaboração de teses e minutas.',
      url: 'https://www.harvey.ai'
    },
    {
      id: 't7',
      name: 'LegalRobot',
      category: 'minutas_contratos',
      pricing: 'Freemium',
      compliance: ['Benchmarking Contratual'],
      desc: 'Analisa e pontua a clareza de contratos e minutas, identificando ambiguidades, obrigações ocultas e inconsistências de termos.',
      url: 'https://legalrobot.com'
    },

    // -------------------------------------------------------------
    // NOVAS FERRAMENTAS: TRANSCRIÇÃO & ATAS DE REUNIÃO
    // -------------------------------------------------------------
    {
      id: 't8',
      name: 'tl;dv',
      category: 'transcricao_atas',
      pricing: 'Freemium',
      compliance: ['Suporte a PT-BR', 'Integração Zoom/Teams/Meet'],
      desc: 'Grava e transcreve reuniões, audiências e sessões deliberativas, gerando sumários automáticos com timestamp dos principais oradores.',
      url: 'https://tldv.io',
      badge: 'Muito Popular'
    },
    {
      id: 't9',
      name: 'Tactiq',
      category: 'transcricao_atas',
      pricing: 'Freemium',
      compliance: ['Transcrição em Tempo Real'],
      desc: 'Extensão para navegadores que captura a transcrição ao vivo no Google Meet ou Teams e gera a ata resumida com decisões tomadas.',
      url: 'https://tactiq.io'
    },
    {
      id: 't10',
      name: 'Otter.ai',
      category: 'transcricao_atas',
      pricing: 'Freemium',
      compliance: ['Geração de Atas'],
      desc: 'Assistente de reuniões que transcreve áudios e vídeos, extrai pontos de ação e cria notas estruturadas para comissões e equipes.',
      url: 'https://otter.ai'
    },

    // -------------------------------------------------------------
    // NOVAS FERRAMENTAS: LINGUAGEM SIMPLES & ATENDIMENTO
    // -------------------------------------------------------------
    {
      id: 't11',
      name: 'Notion AI',
      category: 'linguagem_simples',
      pricing: 'Pago',
      compliance: ['Edição de Texto', 'Reescrita Acessível'],
      desc: 'Excelente para reescrever pareceres, despachos e informativos técnicos em tom direto e acessível ao cidadão ou cliente.',
      url: 'https://www.notion.so/product/ai'
    },
    {
      id: 't12',
      name: 'ChatGPT (Custom GPTs)',
      category: 'linguagem_simples',
      pricing: 'Freemium',
      compliance: ['Assistentes de Atendimento'],
      desc: 'Permite criar robôs de atendimento personalizados com FAQs institucionais para traduzir o "juridiquês" em Linguagem Simples.',
      url: 'https://chatgpt.com',
      badge: 'Versátil'
    },
    {
      id: 't13',
      name: 'ChatDOC',
      category: 'linguagem_simples',
      pricing: 'Freemium',
      compliance: ['Extração de Tabelas e PDFs'],
      desc: 'Analisa documentos técnicos e regulatórios e responde perguntas sobre eles em linguagem clara, direto com citações do texto fonte.',
      url: 'https://chatdoc.com'
    }
  ],

  prompts: [
    {
      id: 'p1',
      title: 'Elaboração de ETP Conforme Lei nº 14.133/2021',
      categoryId: 'compras_publicas',
      llm: 'Claude 3.5 / ChatGPT',
      upvotes: 142,
      author: 'Equipe Curadoria SintaxIA',
      content: `Atue como Especialista em Contratações Públicas no Brasil.\n\nContexto: Preciso elaborar a seção de Justificativa da Necessidade da Contratação para um Estudo Técnico Preliminar (ETP) com base na Lei nº 14.133/2021.\n\nObjeto: [Inserir Objeto, ex: Aquisição de licenças de software]\n\nInstruções:\n1. Apresente o problema público e os impactos da não contratação.\n2. Utilize tom estritamente impessoal e formal.\n3. Estruture em seções prontas para inclusão em documento oficial.`
    },
    {
      id: 'p2',
      title: 'Síntese Cronológica de Processos Extensos',
      categoryId: 'resumo_processos',
      llm: 'NotebookLM / Claude',
      upvotes: 98,
      author: 'Dr. Fernando M.',
      content: `Atue como Assessor Jurídico.\n\nObjetivo: Analisar os documentos anexos e gerar uma síntese cronológica rigorosa.\n\nInstruções:\n- Liste eventos por: Data | Documento | Ocorrência | Página.\n- Destaque pendências documentais e contradições.\n- Regra: Baseie-se estritamente nos anexos sem supor fatos.`
    }
  ]
};

// Inicialização da Aplicação
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupFilters();
  setupForms();
  renderAll();
});

// Navegação por Abas
function setupNavigation() {
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tabTarget = btn.getAttribute('data-tab');
      switchTab(tabTarget);
    });
  });
}

function switchTab(tab) {
  STATE.currentTab = tab;
  
  // Atualizar botões de nav
  document.querySelectorAll('.nav-tab').forEach(b => {
    if (b.getAttribute('data-tab') === tab) {
      b.classList.add('active-tab');
    } else {
      b.classList.remove('active-tab');
    }
  });

  // Alternar views
  document.querySelectorAll('.app-view').forEach(view => {
    view.classList.add('hidden');
  });
  
  const activeView = document.getElementById(`view-${tab}`);
  if (activeView) activeView.classList.remove('hidden');

  if (tab === 'saved') renderSavedView();
}

// Renderização dos Componentes
function renderAll() {
  renderCategoryPills();
  renderCategoryOptions();
  renderTools();
  renderPrompts();
  updateStats();
}

function updateStats() {
  document.getElementById('stat-tools-count').textContent = STATE.tools.length;
  document.getElementById('stat-prompts-count').textContent = STATE.prompts.length;
}

function renderCategoryPills() {
  const container = document.getElementById('quick-category-pills');
  container.innerHTML = STATE.categories.map(cat => `
    <button onclick="filterByCategory('${cat.id}')" class="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-slate-300 text-xs font-medium transition flex items-center gap-2">
      <i class="fa-solid ${cat.icon} text-indigo-400"></i>
      ${cat.name}
    </button>
  `).join('');
}

function renderCategoryOptions() {
  const selects = [
    document.getElementById('tool-category-filter'),
    document.getElementById('prompt-category-filter'),
    document.getElementById('prompt-category'),
    document.getElementById('tool-category')
  ];

  const options = STATE.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

  selects.forEach(select => {
    if (select) {
      const isFilter = select.id.includes('filter');
      select.innerHTML = (isFilter ? '<option value="ALL">Todas as Categorias</option>' : '') + options;
    }
  });
}

// Renderizar Ferramentas
function renderTools() {
  const container = document.getElementById('tools-grid');
  const search = document.getElementById('tool-search-input').value.toLowerCase();
  const catFilter = document.getElementById('tool-category-filter').value;
  const priceFilter = document.getElementById('tool-pricing-filter').value;

  const filtered = STATE.tools.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search) || t.desc.toLowerCase().includes(search);
    const matchCat = catFilter === 'ALL' || t.category === catFilter;
    const matchPrice = priceFilter === 'ALL' || t.pricing === priceFilter;
    return matchSearch && matchCat && matchPrice;
  });

  if (filtered.length === 0) {
    container.innerHTML = '';
    document.getElementById('tools-empty-state').classList.remove('hidden');
    return;
  }

  document.getElementById('tools-empty-state').classList.add('hidden');
  container.innerHTML = filtered.map(t => {
    const isSaved = STATE.savedIds.has(t.id);
    return `
      <div class="bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-indigo-500/5 group">
        <div>
          <div class="flex items-start justify-between mb-3">
            <div>
              <h3 class="text-lg font-bold text-white group-hover:text-indigo-300 transition">${t.name}</h3>
              <span class="text-xs text-indigo-400 font-medium">${getCategoryName(t.category)}</span>
            </div>
            <button onclick="toggleSave('${t.id}')" class="text-slate-500 hover:text-amber-400 transition">
              <i class="fa-${isSaved ? 'solid' : 'regular'} fa-bookmark ${isSaved ? 'text-amber-400' : ''}"></i>
            </button>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed mb-4">${t.desc}</p>
        </div>

        <div>
          <div class="flex flex-wrap gap-1.5 mb-4">
            <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs">${t.pricing}</span>
            ${(t.compliance || []).map(c => `<span class="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/50 text-xs">${c}</span>`).join('')}
          </div>
          <a href="${t.url}" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center gap-2 transition">
            Acessar Ferramenta <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        </div>
      </div>
    `;
  }).join('');
}

// Renderizar Prompts
function renderPrompts() {
  const container = document.getElementById('prompts-grid');
  const search = document.getElementById('prompt-search-input').value.toLowerCase();
  const catFilter = document.getElementById('prompt-category-filter').value;

  const filtered = STATE.prompts.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search) || p.content.toLowerCase().includes(search);
    const matchCat = catFilter === 'ALL' || p.categoryId === catFilter;
    return matchSearch && matchCat;
  });

  container.innerHTML = filtered.map(p => {
    const isSaved = STATE.savedIds.has(p.id);
    const highlightedContent = p.content.replace(/\[(.*?)\]/g, '<span class="prompt-var">[$1]</span>');

    return `
      <div class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between mb-2">
            <h3 class="text-base font-bold text-white">${p.title}</h3>
            <button onclick="toggleSave('${p.id}')" class="text-slate-500 hover:text-amber-400 transition">
              <i class="fa-${isSaved ? 'solid' : 'regular'} fa-bookmark ${isSaved ? 'text-amber-400' : ''}"></i>
            </button>
          </div>
          <div class="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <span class="text-indigo-400 font-medium">${getCategoryName(p.categoryId)}</span>
            <span>•</span>
            <span>${p.llm}</span>
          </div>
          <pre class="bg-slate-950 p-4 rounded-xl text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed border border-slate-800/80 mb-4 max-h-56 overflow-y-auto">${highlightedContent}</pre>
        </div>

        <div class="flex items-center justify-between pt-2 border-t border-slate-800/60">
          <button onclick="upvotePrompt('${p.id}')" class="flex items-center gap-2 text-xs text-slate-400 hover:text-indigo-400 transition">
            <i class="fa-solid fa-thumbs-up"></i> <span>${p.upvotes}</span>
          </button>
          <button onclick="copyPrompt('${p.id}')" class="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-2 transition">
            <i class="fa-solid fa-copy"></i> Copiar Prompt
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Auxiliares
function getCategoryName(id) {
  const cat = STATE.categories.find(c => c.id === id);
  return cat ? cat.name : id;
}

function filterByCategory(catId) {
  switchTab('tools');
  document.getElementById('tool-category-filter').value = catId;
  renderTools();
}

function copyPrompt(id) {
  const prompt = STATE.prompts.find(p => p.id === id);
  if (prompt) {
    navigator.clipboard.writeText(prompt.content);
    showToast('Prompt copiado para a área de transferência!');
  }
}

function upvotePrompt(id) {
  const prompt = STATE.prompts.find(p => p.id === id);
  if (prompt) {
    prompt.upvotes++;
    renderPrompts();
    showToast('Voto registrado!');
  }
}

function toggleSave(id) {
  if (STATE.savedIds.has(id)) {
    STATE.savedIds.delete(id);
    showToast('Removido dos salvos.');
  } else {
    STATE.savedIds.add(id);
    showToast('Salvo com sucesso!');
  }
  localStorage.setItem('sintaxia_saved', JSON.stringify([...STATE.savedIds]));
  renderTools();
  renderPrompts();
  if (STATE.currentTab === 'saved') renderSavedView();
}

function renderSavedView() {
  const container = document.getElementById('saved-grid');
  const savedTools = STATE.tools.filter(t => STATE.savedIds.has(t.id));
  const savedPrompts = STATE.prompts.filter(p => STATE.savedIds.has(p.id));

  if (savedTools.length === 0 && savedPrompts.length === 0) {
    container.innerHTML = '';
    document.getElementById('saved-empty-state').classList.remove('hidden');
    return;
  }

  document.getElementById('saved-empty-state').classList.add('hidden');
  container.innerHTML = [
    ...savedTools.map(t => `<div class="bg-slate-900 p-4 rounded-xl border border-slate-800"><h4 class="font-bold text-white">${t.name}</h4><p class="text-xs text-slate-400 mt-1">${t.desc}</p></div>`),
    ...savedPrompts.map(p => `<div class="bg-slate-900 p-4 rounded-xl border border-slate-800"><h4 class="font-bold text-white">${p.title}</h4><p class="text-xs text-indigo-400 mt-1">Prompt</p></div>`)
  ].join('');
}

function setupFilters() {
  document.getElementById('tool-search-input').addEventListener('input', renderTools);
  document.getElementById('tool-category-filter').addEventListener('change', renderTools);
  document.getElementById('tool-pricing-filter').addEventListener('change', renderTools);
  document.getElementById('prompt-search-input').addEventListener('input', renderPrompts);
  document.getElementById('prompt-category-filter').addEventListener('change', renderPrompts);
}

function setupForms() {
  const btnPrompt = document.getElementById('form-type-prompt');
  const btnTool = document.getElementById('form-type-tool');
  const formPrompt = document.getElementById('submit-prompt-form');
  const formTool = document.getElementById('submit-tool-form');

  btnPrompt.addEventListener('click', () => {
    formPrompt.classList.remove('hidden');
    formTool.classList.add('hidden');
    btnPrompt.classList.add('text-indigo-400', 'border-b-2', 'border-indigo-500');
    btnTool.classList.remove('text-indigo-400', 'border-b-2', 'border-indigo-500');
  });

  btnTool.addEventListener('click', () => {
    formTool.classList.remove('hidden');
    formPrompt.classList.add('hidden');
    btnTool.classList.add('text-indigo-400', 'border-b-2', 'border-indigo-500');
    btnPrompt.classList.remove('text-indigo-400', 'border-b-2', 'border-indigo-500');
  });

  formPrompt.addEventListener('submit', (e) => {
    e.preventDefault();
    const newPrompt = {
      id: 'p_' + Date.now(),
      title: document.getElementById('prompt-title').value,
      categoryId: document.getElementById('prompt-category').value,
      llm: document.getElementById('prompt-llm').value || 'Geral',
      upvotes: 1,
      author: document.getElementById('prompt-author').value || 'Anônimo',
      content: document.getElementById('prompt-content').value
    };

    STATE.prompts.unshift(newPrompt);
    renderPrompts();
    updateStats();
    formPrompt.reset();
    showToast('Prompt enviado e publicado com sucesso!');
    switchTab('prompts');
  });
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-xs font-medium shadow-lg flex items-center gap-2 animate-bounce';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
  
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
