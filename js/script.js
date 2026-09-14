const menuItens = document.querySelectorAll('.item-arquivo');
const abas = document.querySelectorAll('.tab');
const secoes = document.querySelectorAll('.secao-conteudo');

const btnMenuMobile = document.getElementById('btn-menu');
const sidebar = document.getElementById('sidebar');

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
               <a href="${projeto.linkRepo}" target="_blank"     class="btn-card"><i class="fa-brands fa-github"></i> Repositório</a>
               <a href="${projeto.linkPagina}" target="_blank" class="btn-card btn-destaque"><i class="fa-solid fa-arrow-up-right-from-square"></i> Ver Projeto</a>
            </div>
         </article>
      `;
   }).join('');

   container.innerHTML = projetosHTML;
}

renderizarProjetos();

function alternarTela(idAlvo) {
   secoes.forEach(secao => secao.classList.add('escondido'));

   menuItens.forEach(item => item.classList.remove('ativo'));
   abas.forEach(aba => aba.classList.remove('tab-ativa'));

   const secaoAlvo = document.getElementById(idAlvo);
   if (secaoAlvo) secaoAlvo.classList.remove('escondido');

   const itemSidebarAtivo = document.querySelector(`.item-arquivo[href="#${idAlvo}"]`);
   if (itemSidebarAtivo) itemSidebarAtivo.classList.add('ativo');

   const abaAtiva = document.querySelector(`.tab[data-alvo=${idAlvo}]`);
   if (abaAtiva) abaAtiva.classList.add('tab-avita');

   if (sidebar && sidebar.classList.contains('menu-aberto')) sidebar.classList.remove('menu-aberto');  
}

menuItens.forEach(item => {
   item.addEventListener('click', e => {
      e.preventDefault();

      const alvo = item.getAttribute('href').replace('#', '');
      if (alvo) {
         alternarTela(alvo, item);
      }
   });
});

abas.forEach(aba => {
   aba.addEventListener('click', () => {
      const alvo = aba.dataset.alvo;
      if (alvo) {
         alternarTela(alvo, aba);
      }
   });
});

if (btnMenuMobile && sidebar) {
   btnMenuMobile.addEventListener('click', () => {
      sidebar.classList.toggle('menu-aberto');
   });
}