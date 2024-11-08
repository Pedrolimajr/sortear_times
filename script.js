let jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];

function adicionarJogador() {
    const nome = document.getElementById('nome').value;
    const posicao = document.getElementById('posicao').value;

    if (nome && posicao) {
        jogadores.push({ nome, posicao });
        atualizarLista();
        salvarJogadores();
        document.getElementById('nome').value = '';
        document.getElementById('posicao').value = '';
    }
}

function removerJogador(index) {
    jogadores.splice(index, 1);
    atualizarLista();
    salvarJogadores();
}

function atualizarLista() {
    const listaJogadores = document.getElementById('listaJogadores');
    listaJogadores.innerHTML = '';
    jogadores.forEach((jogador, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${jogador.nome} (${jogador.posicao}) <button onclick="removerJogador(${index})">Remover</button>`;
        listaJogadores.appendChild(li);
    });
}

function sortearTimes() {
    const time1 = [];
    const time2 = [];
    const posicoes = {};

    jogadores.forEach(jogador => {
        if (!posicoes[jogador.posicao]) {
            posicoes[jogador.posicao] = [];
        }
        posicoes[jogador.posicao].push(jogador);
    });

    for (let pos in posicoes) {
        posicoes[pos].forEach((jogador, index) => {
            if (index % 2 === 0) {
                time1.push(jogador);
            } else {
                time2.push(jogador);
            }
        });
    }

    exibirTimes(time1, time2);
}

function exibirTimes(time1, time2) {
    const listaTime1 = document.getElementById('time1');
    const listaTime2 = document.getElementById('time2');

    listaTime1.innerHTML = '';
    listaTime2.innerHTML = '';

    time1.forEach(jogador => {
        const li = document.createElement('li');
        li.innerHTML = `${jogador.nome} (${jogador.posicao})`;
        listaTime1.appendChild(li);
    });

    time2.forEach(jogador => {
        const li = document.createElement('li');
        li.innerHTML = `${jogador.nome} (${jogador.posicao})`;
        listaTime2.appendChild(li);
    });
}

function zerarLista() {
    jogadores = [];
    atualizarLista();
    document.getElementById('time1').innerHTML = '';
    document.getElementById('time2').innerHTML = '';
    salvarJogadores();
}

function salvarJogadores() {
    localStorage.setItem('jogadores', JSON.stringify(jogadores));
}

// Inicialização do campo de seleção para posições
function inicializarPosicoes() {
    const posicaoSelect = document.getElementById('posicao');
    const opcoes = [];

    opcoes.forEach(opcao => {
        const option = document.createElement('option');
        option.value = opcao;
        option.textContent = opcao;
        posicaoSelect.appendChild(option);
    });
}

// Chama a inicialização das posições ao carregar a página
window.onload = () => {
    inicializarPosicoes();
    atualizarLista();
};
