// let nomeDados = prompt("Qual o nome do aluno?");
// let idadeDados = prompt("Qual a idade do aluno?");
// let serieDados = prompt("Qual a série do aluno?");
// let nomeEscolaDados = prompt("Qual o nome da escola?");
// let materiaFavoritaDados = prompt("Qual a sua matéria favorita?");

// let nomeId = document.getElementById("nome")
// let idadeId = document.getElementById("idade")
// let serieId = document.getElementById("serie")
// let escolaId = document.getElementById("escola")
// let materiaFavoritaId = document.getElementById("materiaFavorita") 

// function pegarDadosDeAluno() {
// nomeId.innerHTML = `<strong>Nome: </strong> ${nomeDados}`
// idadeId.innerHTML = `<strong>Idade: </strong> ${idadeDados}`
// serieId.innerHTML = `<strong>Série: </strong> ${serieDados}`
// escolaId.innerHTML = `<strong>Escola: </strong> ${nomeEscolaDados}`
// materiaFavoritaId.innerHTML = `<strong>Matéria Favorita: </strong> ${materiaFavoritaDados}`
// }

// pegarDadosDeAluno()

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
    let curso = {
      materia: nomeMateria,
      notas: arrayNotas,
      media: mediaNotas
    };

    let notasAlunoString = localStorage.getItem('notasAluno');
    let notasAluno = JSON.parse(notasAlunoString);

    if (!notasAluno[0].materia) {
      notasAluno = [curso];
    } else {
      notasAluno.push(curso);
    }

    localStorage.setItem('notasAluno', JSON.stringify(notasAluno));
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

  let notasAlunoString = localStorage.getItem('notasAluno');
  let notasAluno = JSON.parse(notasAlunoString);

  console.log(notasAluno)

  let medias = notasAluno.map((curso) => {
    return curso.media;
  });

  let geralMediaGeral = calcMediaGeral(medias);
  let geralMaiorNota = ordenar(medias);

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

    if (arrayNumeros[i] > numeroMaior && !isNumeroFinal) {
      numeroMaior = arrayNumeros[i];
    }
  }
  return numeroMaior;
}

async function inserirEnderecoCampo() {
  let cepDados = document.getElementById("cepDados");
  let ruaDados = document.getElementById("ruaDados");
  let cidadeDados = document.getElementById("cidadeDados");
  let estadoDados = document.getElementById("estadoDados");
  let cep = cepDados.value;

  if (cep.length >= 8) {
    let data = fazerFetchCep(cep);

    data
    .then((info) => {
      let endereco = info;

      if (endereco.uf) {
        cepDados.style.borderBottom = "2px solid black";
        ruaDados.value = endereco.logradouro;
        cidadeDados.value = endereco.localidade;
        estadoDados.value = endereco.uf;
      }
    })
    .catch((err) => {
      cepDados.style.borderBottom = "2px solid #c90808";
      console.error(err);
    })
  }
}

async function inserirAlunosCampo(data) {
  let lista = document.querySelectorAll("#lista-alunos li");
  console.log(data)

  data
  .then((info) => {
    lista.forEach((li, index) => {
      li.textContent = info[index].nome
      console.log(info.nome)
    });
  })
  .catch((err) => {
    console.error(err);
  })
}

async function fazerFetchCep(cepDados) {
  let url = "https://viacep.com.br/ws/" + cepDados + "/json/";
  const request = await fetch(url, {method: "GET"});
  return await request.json();
}

async function fazerFetchAlunos() {
  let url = "./alunos.json";
  const request = await fetch(url, {method: "GET"});
  return await request.json();
}

function pegarDadosAluno() {
  let nomeDados = document.getElementById("nomeDados");
  let idadeDados = document.getElementById("idadeDados");
  let serieDados = document.getElementById("serieDados");
  let escolaDados = document.getElementById("escolaDados");
  let materiaFavoritaDados = document.getElementById("materiaDados");
  let cepDados = document.getElementById("cepDados");
  let ruaDados = document.getElementById("ruaDados");
  let cidadeDados = document.getElementById("cidadeDados");
  let estadoDados = document.getElementById("estadoDados");

  let dadosAluno = {
    nome: nomeDados.value,
    idade: idadeDados.value,
    serie: serieDados.value,
    nomeEscola: escolaDados.value,
    materiaFavorita: materiaFavoritaDados.value,
    cep: cepDados.value,
    rua: ruaDados.value,
    cidade: cidadeDados.value,
    estado: estadoDados.value
  }

  if (ruaDados.value) {
    let notasAluno = [{
      materia: "",
      notas: [0, 0, 0, 0],
      media: 0
    }];
    localStorage.setItem('dadosAluno', JSON.stringify(dadosAluno));
    localStorage.setItem('notasAluno', JSON.stringify(notasAluno));

    console.log(localStorage.getItem('dadosAluno'))
    location.assign("./index.html");
  }

}

function inserirDadosAlunoCampo() {
  let nomeId = document.getElementById("nome");
  let idadeId = document.getElementById("idade");
  let serieId = document.getElementById("serie");
  let escolaId = document.getElementById("escola");
  let materiaFavoritaId = document.getElementById("materiaFavorita");
  let cepId = document.getElementById("cepId");
  let ruaId = document.getElementById("ruaId");
  let cidadeId = document.getElementById("cidadeId");
  let estadoId = document.getElementById("estadoId");

  let dadosAlunoString = localStorage.getItem('dadosAluno');
  let dadosAluno = JSON.parse(dadosAlunoString);

  let notasAlunoString = localStorage.getItem('notasAluno');
  let notasAluno = JSON.parse(notasAlunoString);

  let medias = notasAluno.map((curso) => {
    return curso.media;
  });

  let geralMediaGeral = calcMediaGeral(medias);
  let geralMaiorNota = ordenar(medias);

  insereMediaGeral(geralMediaGeral);
  insereMaiorMedia(geralMaiorNota);

  let data = fazerFetchAlunos();
  inserirAlunosCampo(data);

  nomeId.innerHTML = `<strong>Nome: </strong> ${dadosAluno.nome}`;
  idadeId.innerHTML = `<strong>Idade: </strong> ${dadosAluno.idade}`;
  serieId.innerHTML = `<strong>Série: </strong> ${dadosAluno.serie}`;
  escolaId.innerHTML = `<strong>Escola: </strong> ${dadosAluno.nomeEscola}`;
  materiaFavoritaId.innerHTML = `<strong>Matéria Favorita: </strong> ${dadosAluno.materiaFavorita}`;
  cepId.innerHTML = `<strong>CEP: </strong> ${dadosAluno.cep}`;
  ruaId.innerHTML = `<strong>Rua: </strong> ${dadosAluno.rua}`;
  cidadeId.innerHTML = `<strong>Cidade: </strong> ${dadosAluno.cidade}`;
  estadoId.innerHTML = `<strong>Estado: </strong> ${dadosAluno.estado}`;
}