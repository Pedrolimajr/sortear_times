// Tela do login
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const errorMessage = document.getElementById('errorMessage');

        // Verifica se o nome de usuário e a senha estão corretos
        if (username === "@pedrojunior" && password === "sorttimes@2024") {
            errorMessage.textContent = '';
            window.location.assign('app.html'); // Redireciona para app.html
        } else {
            errorMessage.textContent = 'Usuário ou senha incorretos!';
            errorMessage.style.color = 'red';
        }
    });

    // Funcionalidade de mostrar/esconder a senha
    const togglePassword = document.getElementById('togglePassword');
    togglePassword.addEventListener('click', function() {
        const passwordField = document.getElementById('password');
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash'); // Alterna o ícone
    });
});



/* Gerenciamento de jogadores */
// Variáveis globais para armazenar os times sorteados
let time1 = [];
let time2 = [];

// Gerenciamento de jogadores
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
        btnRemover.textContent = 'Remover ❌';
        btnRemover.style.marginLeft = '10px';
        btnRemover.style.backgroundColor = 'black';
        btnRemover.style.width = '100px';
        btnRemover.onclick = () => removerJogador(index);

        li.appendChild(btnRemover);
        listaJogadores.appendChild(li);
    });
}

// 🔥 Função para sortear os times
function sortearTimes() {
    time1 = [];
    time2 = [];
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

    exibirTimes();
}

// 🔥 Exibir os times na tela
function exibirTimes() {
    const listaTime1 = document.getElementById('time1');
    const listaTime2 = document.getElementById('time2');

    listaTime1.innerHTML = '';
    listaTime2.innerHTML = '';

    time1.forEach((jogador, index) => criarItemLista(listaTime1, jogador, 'time1', index));
    time2.forEach((jogador, index) => criarItemLista(listaTime2, jogador, 'time2', index));
}

// 🔥 Criar item da lista com botão de remover
function criarItemLista(lista, jogador, time, index) {
    const li = document.createElement('li');
    li.textContent = `${jogador.nome} (${jogador.posicao})`;

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover ❌';
    btnRemover.style.marginLeft = '10px';
    btnRemover.style.backgroundColor = 'black';
    btnRemover.style.width = '100px';
    btnRemover.onclick = () => removerDoTime(time, index);

    li.appendChild(btnRemover);
    lista.appendChild(li);
}

// 🔥 Função para remover jogador do time correto
function removerDoTime(time, index) {
    if (time === 'time1') {
        time1.splice(index, 1);
    } else if (time === 'time2') {
        time2.splice(index, 1);
    }
    exibirTimes(); // Atualiza a exibição dos times
}

// 🔥 Zerar tudo
function zerarLista() {
    jogadores = [];
    time1 = [];
    time2 = [];
    atualizarLista();
    exibirTimes();
    salvarJogadores();
}

// 🔥 Salvar jogadores no LocalStorage
function salvarJogadores() {
    localStorage.setItem('jogadores', JSON.stringify(jogadores));
}

// 🔥 Inicializar opções de posição no `<select>`
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

// 🔥 Carregar lista ao iniciar
window.onload = () => {
    inicializarPosicoes();
    atualizarLista();
};


/* Login com digital */
async function autenticarPorDigital() {
    if (!window.PublicKeyCredential) {
        alert("Seu navegador não suporta autenticação por digital.");
        return;
    }

    try {
        const credenciais = await navigator.credentials.get({
            publicKey: {
                challenge: new Uint8Array(32),
                allowCredentials: [],
                timeout: 60000,
                userVerification: "required",
            },
        });

        if (credenciais) {
            alert("Autenticação bem-sucedida! ✅");
            // Aqui você pode redirecionar para outra página ou liberar funcionalidades
        }
    } catch (error) {
        console.error("Erro ao autenticar:", error);
        alert("Falha na autenticação biométrica.");
    }
}

// 🔥 Chame essa função ao clicar no botão de login por digital
document.getElementById("btnDigital").addEventListener("click", autenticarPorDigital);
