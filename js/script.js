const menuItens = document.querySelectorAll('.item-arquivo');
const abas = document.querySelectorAll('.tab');
const secoes = document.querySelectorAll('.secao-conteudo');

const btnMenuMobile = document.getElementById('btn-menu');
const sidebar = document.getElementById('sidebar');

function alternarTela(idAlvo, elementoClicado) {
   secoes.forEach(secao => {
      secao.classList.add('escondido');
   });
   
   menuItens.forEach(item => {
      item.classList.remove('ativo');
   });

   abas.forEach(aba => {
      aba.classList.remove('tab-ativa');
   });

   const secaoAlvo = document.getElementById(idAlvo);
   if (secaoAlvo) {
      secaoAlvo.classList.remove('escondido');
   }

   if (elementoClicado) {
      if (elementoClicado.classList.contains('item-arquivo')) {
         elementoClicado.classList.add('ativo');
      } else if (elementoClicado.classList.contains('tab')) {
         elementoClicado.classList.add('tab-ativa')
      }
   }
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