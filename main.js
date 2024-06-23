let nomeDados = prompt("Qual o nome do aluno?");
let idadeDados = prompt("Qual a idade do aluno?");
let serieDados = prompt("Qual a série do aluno?");
let nomeEscolaDados = prompt("Qual o nome da escola?");
let materiaFavoritaDados = prompt("Qual a sua matéria favorita?");

let nomeId = document.getElementById("nome")
let idadeId = document.getElementById("idade")
let serieId = document.getElementById("serie")
let escolaId = document.getElementById("escola")
let materiaFavoritaId = document.getElementById("materiaFavorita") 

function pegarDadosDeAluno() {
nomeId.innerHTML = `<strong>Nome: </strong> ${nomeDados}`
idadeId.innerHTML = `<strong>Idade: </strong> ${idadeDados}`
serieId.innerHTML = `<strong>Série: </strong> ${serieDados}`
escolaId.innerHTML = `<strong>Escola: </strong> ${nomeEscolaDados}`
materiaFavoritaId.innerHTML = `<strong>Matéria Favorita: </strong> ${materiaFavoritaDados}`
}

pegarDadosDeAluno()

function novaLinha() {
  let curso = pegarMateriaEnotas();
  criarLinha(curso);
}

function fazerMedia (notas) {
  let soma = 0;

  for (let i = 0; i < notas.length; i++) {
      soma += notas[i];
  }

  return soma / notas.length;
}

const mediasGerais = [];
const arrayMediasMaterias = [];

function pegarMateriaEnotas() {
  let nomeMateria = prompt("Qual a matéria?");
  let controlador = 1;
  let arrayNotas = [];

  while (controlador <= 4) {
    let notaEscolhida = prompt(controlador + "° nota");

    notaEscolhida = Number(trocarVirgulaPorPonto(notaEscolhida));

    if (isNaN(notaEscolhida)) {
      alert("Você não inseriu um valor númerio para a nota. Por favor, insira novamente uma matérias e suas notas.");
      break;

    } else {
        arrayNotas.push(notaEscolhida);
        controlador++;
    }
  }

  if (arrayNotas.length === 4) {
    let mediaNotas = fazerMedia(arrayNotas);
    arrayMediasMaterias.push(mediaNotas);

    let curso = {
      materia: nomeMateria,
      notas: arrayNotas,
      media: mediaNotas
    };

    mediasGerais.push(curso.media);
    
    return curso;

  } else {
    return null;
  }     
}

function trocarVirgulaPorPonto(valorNota) {
  if (valorNota.includes(',')) {
    return valorNota.replace(',', '.');
  } else {
    return valorNota;
  }
}

function criarLinha(curso) {
  let tbody = document.querySelector("tbody");
  let linha = `
      <tr>
          <td>${curso.materia}</td>
          <td>${curso.notas[0].toFixed(1)}</td>
          <td>${curso.notas[1].toFixed(1)}</td>
          <td>${curso.notas[2].toFixed(1)}</td>
          <td>${curso.notas[3].toFixed(1)}</td>
          <td class="mediaMateria">${curso.media.toFixed(1)}</td>
      </tr>
  `;

  tbody.innerHTML += linha;


  let geralMediaGeral = calcMediaGeral(mediasGerais);
  let geralMaiorNota = ordenar(arrayMediasMaterias);

  insereMediaGeral(geralMediaGeral);
  insereMaiorMedia(geralMaiorNota);
}


function calcMediaGeral(arrayMedias) {
  let media = arrayMedias.reduce(function(total, nota) {
    return total + nota;
  }, 0)
  return media / arrayMedias.length;
}

function insereMediaGeral(media) {
  let elementoMedia = document.querySelector('#media-geral');
  elementoMedia.innerHTML = `<b>${media.toFixed(2)}</b>`
}

function insereMaiorMedia(media) {
  let elementoMaiorMedia = document.querySelector('#maior-media');
  elementoMaiorMedia.innerHTML = `<b>${media.toFixed(1)}</b>`
}

function ordenar(arrayNumeros) {
  let numeroMaior = 0;
  for (let i = 0; i < arrayNumeros.length; i++) {
    let isNumeroFinal = i >= arrayNumeros.length ? true : false;
    debugger;
    if (arrayNumeros[i] > numeroMaior && !isNumeroFinal) {
      numeroMaior = arrayNumeros[i];
    }
  }
  return numeroMaior;
}