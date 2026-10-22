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
    {
      id: 't1',
      name: 'NotebookLM',
      category: 'resumo_processos',
      pricing: 'Gratuito',
      risk: '🟢 Baixo Risco / Geral',
      compliance: ['LGPD Ready', 'Leitura de PDFs Longos'],
      desc: 'Ferramenta da Google ideal para ler centenas de páginas de cadernos processuais e criar resumos fundamentados sem alucinações.',
      url: 'https://notebooklm.google.com',
      badge: 'Destaque Setor Público'
    },
    {
      id: 't2',
      name: 'Casetext (CoCounsel)',
      category: 'pesquisa_precedentes',
      pricing: 'Pago',
      risk: '🟡 Requer Supervisão Humana',
      compliance: ['Segurança Jurídica'],
      desc: 'Assistente jurídico treinado para pesquisa jurisprudencial rápida, revisão de documentos e análise de riscos.',
      url: 'https://casetext.com',
      badge: 'Popular Jurídico'
    },
    {
      id: 't3',
      name: 'Claude 3.5 Sonnet',
      category: 'compras_publicas',
      pricing: 'Freemium',
      risk: '🟡 Requer Supervisão Humana',
      compliance: ['Lei 14.133/2021', 'Análise de Tabelas'],
      desc: 'Destaca-se na redação de Estudos Técnicos Preliminares (ETP) e Termos de Referência (TR) pela alta precisão em linguagem formal.',
      url: 'https://claude.ai',
      badge: 'Recomendado'
    },
    {
      id: 't5',
      name: 'Spellbook',
      category: 'minutas_contratos',
      pricing: 'Pago',
      risk: '🟡 Requer Supervisão Humana',
      compliance: ['Integração MS Word', 'Análise de Riscos'],
      desc: 'Funciona diretamente dentro do Microsoft Word para sugerir cláusulas, identificar riscos e redigir minutas contratuais em segundos.',
      url: 'https://www.spellbook.legal',
      badge: 'Essencial para Word'
    },
    {
      id: 't8',
      name: 'tl;dv',
      category: 'transcricao_atas',
      pricing: 'Freemium',
      risk: '🟢 Baixo Risco / Geral',
      compliance: ['Suporte PT-BR', 'Integração Meet/Teams'],
      desc: 'Grava e transcreve reuniões, audiências e sessões deliberativas, gerando sumários automáticos com timestamp.',
      url: 'https://tldv.io',
      badge: 'Muito Popular'
    },
    {
      id: 't11',
      name: 'Notion AI',
      category: 'linguagem_simples',
      pricing: 'Pago',
      risk: '🟢 Baixo Risco / Geral',
      compliance: ['Edição de Texto', 'Reescrita Acessível'],
      desc: 'Excelente para reescrever pareceres, despachos e informativos técnicos em tom direto e acessível ao cidadão ou cliente.',
      url: 'https://www.notion.so/product/ai'
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
      content: `Atue como Especialista em Contratações Públicas no Brasil.\n\nContexto: Preciso elaborar a seção de Justificativa da Necessidade da Contratação para um Estudo Técnico Preliminar (ETP) com base na Lei nº 14.133/2021.\n\nObjeto: [Inserir Objeto, ex: Aquisição de licenças de software]\n\nInstruções:\n1. Apresente o problema público e os impactos da não contratação.\n2. Utilize tom estritamente impessoal e formal.`
    },
    {
      id: 'p2',
      title: 'Síntese Cronológica de Processos Extensos',
      categoryId: 'resumo_processos',
      llm: 'NotebookLM / Claude',
      upvotes: 98,
      author: 'Dr. Fernando M.',
      content: `Atue como Assessor Jurídico.\n\nObjetivo: Analisar os documentos anexos e gerar uma síntese cronológica rigorosa.\n\nInstruções:\n- Liste eventos por: Data | Documento | Ocorrência | Página.\n- Regra: Baseie-se estritamente nos anexos sem supor fatos.`
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupMobileMenu();
  setupAIModules();
  setupFilters();
  setupForms();
  renderAll();
  handleUrlDeepLink();
});

function setupNavigation() {
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.getAttribute('data-tab'));
      closeMobileMenu();
    });
  });
}

function setupMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('mobile-menu-icon');

  if (btn && menu) {
    btn.addEventListener('click', () => {
      const isHidden = menu.classList.contains('hidden');
      if (isHidden) {
        menu.classList.remove('hidden');
        icon.className = 'fa-solid fa-xmark text-lg';
      } else {
        closeMobileMenu();
      }
    });
  }
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('mobile-menu-icon');
  if (menu && !menu.classList.contains('hidden')) {
    menu.classList.add('hidden');
    if (icon) icon.className = 'fa-solid fa-bars text-lg';
  }
}

function switchTab(tab) {
  STATE.currentTab = tab;
  document.querySelectorAll('.nav-tab').forEach(b => {
    b.classList.toggle('active-tab', b.getAttribute('data-tab') === tab);
  });
  document.querySelectorAll('.app-view').forEach(view => view.classList.add('hidden'));
  const activeView = document.getElementById(`view-${tab}`);
  if (activeView) activeView.classList.remove('hidden');
  if (tab === 'saved') renderSavedView();
}

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
      <i class="fa-solid ${cat.icon} text-indigo-400"></i> ${cat.name}
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
            <span class="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 text-xs">${t.risk || '🟢 Baixo Risco'}</span>
          </div>
          <a href="${t.url}" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center gap-2 transition">
            Acessar Ferramenta <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        </div>
      </div>
    `;
  }).join('');
}

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
      <div id="${p.id}" class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
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
        <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
          <button onclick="upvotePrompt('${p.id}')" class="flex items-center gap-2 text-xs text-slate-400 hover:text-indigo-400 transition">
            <i class="fa-solid fa-thumbs-up"></i> <span>${p.upvotes}</span>
          </button>
          <div class="flex items-center gap-2">
            <button onclick="copyPromptLink('${p.id}')" class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition" title="Copiar link direto">
              <i class="fa-solid fa-link"></i>
            </button>
            <button onclick="downloadPromptFile('${p.id}')" class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition" title="Baixar como arquivo .md">
              <i class="fa-solid fa-download"></i>
            </button>
            <button onclick="copyPrompt('${p.id}')" class="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-2 transition">
              <i class="fa-solid fa-copy"></i> Copiar
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

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

function copyPromptLink(id) {
  const url = `${window.location.origin}${window.location.pathname}#${id}`;
  navigator.clipboard.writeText(url);
  showToast('Link direto copiado!');
}

function downloadPromptFile(id) {
  const prompt = STATE.prompts.find(p => p.id === id);
  if (prompt) {
    const blob = new Blob([prompt.content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${prompt.title.toLowerCase().replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Arquivo baixado com sucesso!');
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

// Configuração das IAs de Licitação com suporte a Word (.docx)
function setupAIModules() {
  const licForm = document.getElementById('licitacao-form');
  if (licForm) {
    licForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const tipo = document.getElementById('lic-tipo').value;
      const objeto = document.getElementById('lic-objeto').value;
      const necessidade = document.getElementById('lic-necessidade').value;
      const fileInput = document.getElementById('lic-file');

      let conteudoBase = "";

      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        try {
          const arrayBuffer = await file.arrayBuffer();
          const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
          conteudoBase = result.value; // Texto extraído do Word do utilizador
        } catch (err) {
          console.error(err);
          showToast('Erro ao ler o ficheiro Word.');
          return;
        }
      }

      let minutaFinal = `=== MINUTA INTELIGENTE (${tipo}) - LEI Nº 14.133/2021 ===\n\n`;
      if (conteudoBase) {
        minutaFinal += `[ADAPTADO DO MODELO ANEXADO PELO UTILIZADOR]\n\n` +
          `--- CONTEÚDO ORIGINAL PARSEADO ---\n${conteudoBase.substring(0, 1500)}...\n----------------------------------\n\n`;
      }

      minutaFinal += `1. DESCRIÇÃO DA NECESSIDADE:\nConsiderando o planejamento estratégico, justifica-se a contratação de "${objeto}" visando sanar a seguinte demanda: "${necessidade}".\n\n` +
        `2. REQUISITOS DA CONTRATAÇÃO:\n- Atendimento estrito aos padrões de sustentabilidade e LGPD.\n- Compatibilidade com as diretrizes da Nova Lei de Licitações (Lei nº 14.133/2021).\n\n` +
        `3. ESTIMATIVA DE QUANTITATIVOS E PREÇOS:\n[Preencher com base em pesquisa de mercado conforme art. 23 da Lei 14.133/2021]`;

      document.getElementById('lic-output').value = minutaFinal;
      document.getElementById('lic-result-box').classList.remove('hidden');
      showToast(`${tipo} processado e gerado com sucesso!`);
    });
  }

  // Módulo Aprimorador Jurídico
  const aprForm = document.getElementById('aprimorador-form');
  if (aprForm) {
    aprForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const modo = document.getElementById('apr-modo').value;
      const texto = document.getElementById('apr-texto').value;

      let prefixo = '';
      let otimizado = '';

      if (modo === 'simples') {
        prefixo = '[TRADUZIDO PARA LINGUAGEM SIMPLES]\n\n';
        otimizado = prefixo + 'Resumo da Decisão / Pedido:\n' + texto.replace(/jurisdicionado|impetrante|merito/gi, 'parte interessada') + '\n\nO que significa na prática:\nO pedido foi estruturado de forma a garantir o direito pleiteado com clareza e transparência.';
      } else if (modo === 'tecnico') {
        prefixo = '[POLIMENTO TÉCNICO E FORMAL]\n\n';
        otimizado = prefixo + 'À luz da dogmática jurídica e da jurisprudência pátria, tem-se que: ' + texto + '\n\nDestarte, restam configurados os requisitos legais autorizadores da medida.';
      } else {
        prefixo = '[ANÁLISE DE COERÊNCIA LÓGICA]\n\n';
        otimizado = prefixo + 'Argumentação analisada:\n' + texto + '\n\nPonto de Atenção: A fundamentação está sólida, mas sugere-se reforçar o nexo causal entre o pedido principal e os fatos narrados.';
      }

      document.getElementById('apr-output').value = otimizado;
      document.getElementById('apr-result-box').classList.remove('hidden');
      showToast('Texto aprimorado com sucesso!');
    });
  }
}

// Função para gerar e descarregar o documento em Word (.docx) real
async function downloadWordDocument() {
  const textoGerado = document.getElementById('lic-output').value;
  const tipoDoc = document.getElementById('lic-tipo').value;

  try {
    const { Document, Packer, Paragraph, TextRun, HeadingLevel } = window.docx;

    // Criar secções de parágrafos divididas por quebra de linha
    const linhas = textoGerado.split('\n');
    const paragrafos = linhas.map(linha => {
      if (linha.startsWith('===')) {
        return new Paragraph({
          text: linha,
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 200 }
        });
      } else if (linha.endsWith(':') || linha.match(/^[0-9]+\./)) {
        return new Paragraph({
          text: linha,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 150, after: 100 }
        });
      }
      return new Paragraph({
        children: [new TextRun(linha)],
        spacing: { after: 120 }
      });
    });

    const doc = new Document({
      sections: [{
        properties: {},
        children: paragrafos,
      }],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tipoDoc}_Lei_14133.docx`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Ficheiro Word (.docx) descarregado com sucesso!');
  } catch (err) {
    console.error(err);
    showToast('Erro ao gerar o ficheiro Word.');
  }
}

function copyAprimoradoResult() {
  const text = document.getElementById('apr-output').value;
  navigator.clipboard.writeText(text);
  showToast('Texto aprimorado copiado!');
}

function calculateDeadline() {
  const dateInput = document.getElementById('calc-start-date').value;
  const days = parseInt(document.getElementById('calc-days-qty').value) || 0;
  const type = document.getElementById('calc-days-type').value;
  const resultDiv = document.getElementById('calc-result');

  if (!dateInput) {
    showToast('Selecione uma data inicial.');
    return;
  }

  let currentDate = new Date(dateInput + 'T00:00:00');
  let addedDays = 0;

  while (addedDays < days) {
    currentDate.setDate(currentDate.getDate() + 1);
    const dayOfWeek = currentDate.getDay();
    if (type === 'calendar') {
      addedDays++;
    } else {
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        addedDays++;
      }
    }
  }

  const formatted = currentDate.toLocaleDateString('pt-BR');
  resultDiv.classList.remove('hidden');
  resultDiv.textContent = `Data final calculada: ${formatted} (${days} ${type === 'business' ? 'dias úteis' : 'dias corridos'})`;
}

function generateETPPrompt() {
  const obj = document.getElementById('etp-obj').value || '[Objeto não informado]';
  const prob = document.getElementById('etp-prob').value || '[Problema não informado]';
  const output = document.getElementById('etp-output');

  const generated = `Atue como Especialista em Licitações Públicas sob a Lei nº 14.133/2021.\n\nElabore a justificativa da necessidade para:\n- Objeto: ${obj}\n- Problema: ${prob}`;
  output.classList.remove('hidden');
  output.value = generated;
  showToast('Prompt gerado!');
}

function setupFilters() {
  const searchInput = document.getElementById('tool-search-input');
  if (searchInput) searchInput.addEventListener('input', renderTools);
  
  const toolCat = document.getElementById('tool-category-filter');
  if (toolCat) toolCat.addEventListener('change', renderTools);

  const toolPrice = document.getElementById('tool-pricing-filter');
  if (toolPrice) toolPrice.addEventListener('change', renderTools);

  const promptSearch = document.getElementById('prompt-search-input');
  if (promptSearch) promptSearch.addEventListener('input', renderPrompts);

  const promptCat = document.getElementById('prompt-category-filter');
  if (promptCat) promptCat.addEventListener('change', renderPrompts);

  const newsletter = document.getElementById('newsletter-form');
  if (newsletter) {
    newsletter.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('newsletter-email').value = '';
      showToast('Inscrição realizada com sucesso!');
    });
  }
}

function setupForms() {
  const btnPrompt = document.getElementById('form-type-prompt');
  const btnTool = document.getElementById('form-type-tool');
  const formPrompt = document.getElementById('submit-prompt-form');
  const formTool = document.getElementById('submit-tool-form');

  if (btnPrompt && btnTool) {
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
  }

  if (formPrompt) {
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
      showToast('Prompt publicado com sucesso!');
      switchTab('prompts');
    });
  }
}

function handleUrlDeepLink() {
  if (window.location.hash) {
    const id = window.location.hash.substring(1);
    switchTab('prompts');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        el.classList.add('border-indigo-500');
      }
    }, 200);
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-xs font-medium shadow-lg flex items-center gap-2 animate-bounce';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
