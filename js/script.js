const menuItens = document.querySelectorAll('.item-arquivo');
const abas = document.querySelectorAll('.editor-tabs');
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
   secaoAlvo.classList.remove('escondido');

   if (elementoClicado) {
      if (elementoClicado.classList.contains('tab')) {
         elementoClicado.classList.add('tab-ativa');
      } else 
         elementoClicado.classList.add('ativo');
   }
}

menuItens.forEach(item => {
   item.addEventListener('click', e => {
      e.preventDefault();

      const href = item.getAttribute('href');
      const alvo = href.replace('#', '');
      alternarTela(alvo, item);
   });
});

abas.forEach(aba => {
   aba.addEventListener('click', () => {
      const href = aba.getAttribute('href');
      const alvo = href ? href.replace('#', '') : 'sec-home';
      alternarTela(alvo, aba);
   });
});

btnMenuMobile.addEventListener('click', () => {
   sidebar.classList.toggle('ativo');
});