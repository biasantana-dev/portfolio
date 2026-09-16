const menuItens = document.querySelectorAll('.item-arquivo');
const secoes = document.querySelectorAll('.secao-conteudo');
const sidebar = document.querySelector('.sidebar');
const dropdowns = document.querySelectorAll('.menu-item-dropdown');
const btnsNavTop = document.querySelectorAll('.btn-nav-top');

const btnMenuMobile = document.getElementById('btn-menu');
const overlay = document.getElementById('overlay-mobile');
const btnFechar = document.getElementById('btn-fechar-menu');
const tabsContainer = document.getElementById('tabs-container');

const btnSobreProjeto = document.getElementById('btn-sobre-projeto');
const btnActivityExplorer = document.getElementById('btn-activity-explorer');
const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
const btnFullscreen = document.getElementById('btn-fullscreen');


const dadosArquivos = {
   'home': { nome: 'home.html', icone: 'fa-brands fa-html5', cor: '#e34c26' },
   'projetos': { nome: 'projetos.js', icone: 'fa-brands fa-js', cor: '#f7df1e' },
   'sobre-mim': { nome: 'sobre-mim.css', icone: 'fa-brands fa-css3-alt', cor: '#264de4' }
}

let abasAbertas = ['home'];
let abaAtivaId = 'home';

const meusProjetos = [
   {
      titulo: 'DevPharma',
      destaque: '★ DESTAQUE • FRONT-END • LÓGICA',
      isDestaque: true,
      descricao: 'Sistema de gerenciamento de estoque farmacêutico com controle de medicamentos, cadastro e validação dinâmica de dados.',
      tecnologias: ['HTML', 'CSS', 'Javascript'],
      linkRepo: 'https://github.com/biasantana-dev/Projeto-DevPharma',
      linkPagina: 'https://biasantana-dev.github.io/Projeto-DevPharma/'
   },

   {
      titulo: 'Mini Aventura Textual',
      destaque: 'JOGO • INTERATIVIDADE • LÓGICA',
      isDestaque: false,
      descricao: 'Jogo interativo RPG/Cyberpunk executado no navegador com tomada de decisões, ramificações de história e manipulação do DOM.',
      tecnologias: ['HTML', 'CSS', 'Javascript'],
      linkRepo: 'https://github.com/biasantana-dev/mini-aventura-textual',
      linkPagina: 'https://biasantana-dev.github.io/mini-aventura-textual/'
   },

   {
      titulo: 'Simulador de Autonomia',
      destaque: 'UTILITÁRIO • CÁLCULO • BATERIA',
      isDestaque: false,
      descricao: 'Aplicação web para cálculo e simulação de consumo e autonomia de combustível para veículos com base em dados informados.',
      tecnologias: ['HTML', 'CSS', 'Javascript'],
      linkRepo: 'https://github.com/biasantana-dev/projeto-simulador-de-autonomia',
      linkPagina: 'https://biasantana-dev.github.io/projeto-simulador-de-autonomia/'
   },

   {
      titulo: 'Portfólio',
      destaque: 'UI / UX • RESPONSIVO • SPA',
      isDestaque: false,
      descricao: 'Interface interativa inspirada no editor de código, desenvolvida com navegação por abas, explorador e layout fixo.',
      tecnologias: ['HTML', 'CSS', 'Javascript'],
      linkRepo: 'https://github.com/biasantana-dev/portfolio',
      linkPagina: 'https://biasantana-dev.github.io/portfolio/'
   },
];

function renderizarProjetos() {
   const container = document.querySelector('#grid-projetos');

   const projetosHTML = meusProjetos.map(projeto => {
      return `
         <article class="card-projeto destaque-card">
            <p class="tags-card"><span class="tag-destaque">${projeto.destaque}</span></p>
            <h2>${projeto.titulo}</h2>
            <p class="descricao-card">${projeto.descricao}</p>
            <div class="tecnologias-card">
               ${projeto.tecnologias.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>
            <div class="botoes-card">
               <a href="${projeto.linkRepo}" target="_blank" rel="noopener noreferrer" class="btn-card"><i class="fa-brands fa-github"></i> Repositório</a>
               <a href="${projeto.linkPagina}" target="_blank" rel="noopener noreferrer" class="btn-card btn-destaque"><i class="fa-solid fa-arrow-up-right-from-square"></i> Ver Projeto</a>
            </div>
         </article>
      `;
   }).join('');

   container.innerHTML = projetosHTML;
}
renderizarProjetos();

function renderizarAbas() {
   if (!tabsContainer) return;

   tabsContainer.innerHTML = abasAbertas.map(id => {
      const arquivo = dadosArquivos[id];
      const isAtiva = id === abaAtivaId ? 'tab-ativa' : '';

      const botaoFechar = `<span class="btn-fechar-aba" data-fechar="${id}"><i class="fa-solid fa-xmark"></i></span>`;

      return `
         <div class="tab ${isAtiva}" data-alvo="${id}">
            <span class="icone-tab"><i class="${arquivo.icone}" style="color: ${arquivo.cor};"></i></span>
            ${arquivo.nome}
            ${botaoFechar}
         </div>
      `;
   }).join('');
}

if (tabsContainer) {
   tabsContainer.addEventListener('click', e => {
      const btnFechar = e.target.closest('.btn-fechar-aba');
      const aba = e.target.closest('.tab');

      if (btnFechar) {
         fecharAba(btnFechar.dataset.fechar)
      } else if (aba) {
         alternarTela(aba.dataset.alvo);
      }
   });
}

function fecharAba(id) {
   if (id === 'home') return;

   abasAbertas = abasAbertas.filter(aba => aba !== id);

   const secao = document.getElementById(id);
   if (secao) secao.classList.add('escondido');

   if (id === abaAtivaId) {
      alternarTela(abasAbertas[abasAbertas.length - 1]);
   } else {
      renderizarAbas();
   }
}

function alternarTela(idAlvo) {
   if (!idAlvo) return;

   if (!abasAbertas.includes(idAlvo)) {
      abasAbertas.push(idAlvo);
   }

   abaAtivaId = idAlvo;

   secoes.forEach(secao => secao.classList.add('escondido'));
   menuItens.forEach(item => item.classList.remove('ativo'));

   const secaoAlvo = document.getElementById(idAlvo);
   if (secaoAlvo) secaoAlvo.classList.remove('escondido');

   const itemSidebarAtivo = document.querySelector(`.item-arquivo[href="#${idAlvo}"]`);
   if (itemSidebarAtivo) itemSidebarAtivo.classList.add('ativo');

   const tituloMobile = document.getElementById('aba-ativa-mobile');
   if (tituloMobile && dadosArquivos[idAlvo]) {
      tituloMobile.textContent = dadosArquivos[idAlvo].nome;
   }

   renderizarAbas();
}


menuItens.forEach(item => {
   item.addEventListener('click', e => {
      e.preventDefault();
      const alvo = item.getAttribute('href').replace('#', '');

      alternarTela(alvo);

      if (window.innerWidth <= 768) {
        fecharMenuMobile();
      }
   });
});

renderizarAbas();

function abrirMenuMobile() {
   if (sidebar) sidebar.classList.add('menu-aberto');
   if (overlay) overlay.classList.remove('escondido');
}

function fecharMenuMobile() {
   if (sidebar) sidebar.classList.remove('menu-aberto');
   if (overlay) overlay.classList.add('escondido');
}

function alternarSidebar() {
   if (!sidebar) return;

   const estaColapsado = sidebar.classList.toggle('colapsado');
   if (btnActivityExplorer) {
      if (estaColapsado) {
         btnActivityExplorer.classList.remove('ativo');
      } else {
         btnActivityExplorer.classList.add('ativo');
      }
   }
}

if (btnActivityExplorer) btnActivityExplorer.addEventListener('click', alternarSidebar);
if (btnToggleSidebar) btnToggleSidebar.addEventListener('click', alternarSidebar);

if (btnMenuMobile) {
   btnMenuMobile.addEventListener('click', () => {
      if (sidebar && sidebar.classList.contains('menu-aberto')) {
         fecharMenuMobile();
      } else {
         abrirMenuMobile();
      }
   });
}

if (btnFechar) btnFechar.addEventListener('click', fecharMenuMobile);
if (overlay) overlay.addEventListener('click', fecharMenuMobile);

dropdowns.forEach(dropdown => {
   const btn = dropdown.querySelector('.btn-menu-top');
   btn.addEventListener('click', e => {
      e.stopPropagation();

      dropdowns.forEach(d => {
         if (d !== dropdown) d.classList.remove('ativo');
      });

      dropdown.classList.toggle('ativo');
   });
});

document.addEventListener('click', () => {
   dropdowns.forEach(d => d.classList.remove('ativo'));
});


if (btnFullscreen) {
   btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
         document.documentElement.requestFullscreen();
      } else {
         if (document.exitFullscreen) document.exitFullscreen();
      }
   });
}

btnsNavTop.forEach(btn => {
   btn.addEventListener('click', e => {
      e.preventDefault();
      const alvo = btn.dataset.alvo;
      if (alvo) alternarTela(alvo);
   });
});

if (btnSobreProjeto) {
   btnSobreProjeto.addEventListener('click', () => {
      alert('VS Code Portfolio v1.0\nDesenvolvido por Beatriz Santana com HTML, CSS e JavaScript puro!');
   });
}