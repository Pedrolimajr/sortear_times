/* Tela do login */

document.addEventListener('DOMContentLoaded', () => {
    fetch('config.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON');
            }
            return response.json();
        })
        .then(config => {
            document.getElementById('loginForm').addEventListener('submit', function(event) {
                event.preventDefault();

                const username = document.getElementById('username').value.trim();
                const password = document.getElementById('password').value.trim();
                const errorMessage = document.getElementById('errorMessage');

                // Verifica se o nome de usuário e a senha estão corretos
                if (username === config.Login && password === config.Senha) {
                    errorMessage.textContent = '';
                    window.location.assign('app.html'); // Redireciona para app.html
                } else {
                    errorMessage.textContent = 'Usuário ou senha incorretos!';
                    errorMessage.style.color = 'red';
                }
            });
        })
        .catch(error => console.error('Erro ao carregar config.json:', error));
});


/* Gerenciamento de jogadores */
let jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];

function adicionarJogador() {
    const nome = document.getElementById('nome').value.trim();
    const posicao = document.getElementById('posicao').value.trim();

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
        li.textContent = `${jogador.nome} (${jogador.posicao})`;
        
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.onclick = () => removerJogador(index);
        
        li.appendChild(btnRemover);
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
            (index % 2 === 0 ? time1 : time2).push(jogador);
        });
    }

    exibirTimes(time1, time2);
}

function exibirTimes(time1, time2) {
    const listaTime1 = document.getElementById('time1');
    const listaTime2 = document.getElementById('time2');

    listaTime1.innerHTML = '';
    listaTime2.innerHTML = '';

    time1.forEach(jogador => criarItemLista(listaTime1, jogador));
    time2.forEach(jogador => criarItemLista(listaTime2, jogador));
}

function criarItemLista(lista, jogador) {
    const li = document.createElement('li');
    li.textContent = `${jogador.nome} (${jogador.posicao})`;
    lista.appendChild(li);
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

function inicializarPosicoes() {
    const posicaoSelect = document.getElementById('posicao');
    const opcoes = ['Goleiro', 'Defensor', 'Meio-Campo', 'Atacante'];

    opcoes.forEach(opcao => {
        const option = document.createElement('option');
        option.value = opcao;
        option.textContent = opcao;
        posicaoSelect.appendChild(option);
    });
}

window.onload = () => {
    inicializarPosicoes();
    atualizarLista();
};
