// Inicializa a lista de jogadores a partir do armazenamento local (localStorage).
// Se não houver dados no localStorage, usa uma lista vazia como padrão.
let jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];

// Função para adicionar um jogador à lista.
function adicionarJogador() {
    // Captura os valores dos campos de entrada (nome e posição).
    const nome = document.getElementById('nome').value;
    const posicao = document.getElementById('posicao').value;

    // Verifica se os campos "nome" e "posição" foram preenchidos.
    if (nome && posicao) {
        // Adiciona o jogador como um objeto com nome e posição à lista de jogadores.
        jogadores.push({ nome, posicao });

        // Atualiza a lista exibida na interface.
        atualizarLista();

        // Salva a lista de jogadores no armazenamento local.
        salvarJogadores();

        // Limpa os campos de entrada para permitir novos cadastros.
        document.getElementById('nome').value = '';
        document.getElementById('posicao').value = '';
    }
}

// Função para remover um jogador da lista.
function removerJogador(index) {
    // Remove o jogador pelo índice da lista.
    jogadores.splice(index, 1);

    // Atualiza a lista exibida na interface.
    atualizarLista();

    // Atualiza o armazenamento local com a nova lista.
    salvarJogadores();
}

// Função para atualizar a lista de jogadores exibida na interface.
function atualizarLista() {
    // Seleciona o elemento HTML onde a lista será exibida.
    const listaJogadores = document.getElementById('listaJogadores');

    // Limpa o conteúdo anterior da lista.
    listaJogadores.innerHTML = '';

    // Itera sobre a lista de jogadores.
    jogadores.forEach((jogador, index) => {
        // Cria um item de lista para cada jogador.
        const li = document.createElement('li');
        li.innerHTML = `${jogador.nome} (${jogador.posicao}) <button onclick="removerJogador(${index})">Remover</button>`;

        // Adiciona o item à lista exibida na interface.
        listaJogadores.appendChild(li);
    });
}

// Função para sortear os times com base nos jogadores e suas posições.
function sortearTimes() {
    const time1 = []; // Armazena os jogadores do Time A.
    const time2 = []; // Armazena os jogadores do Time B.
    const posicoes = {}; // Organiza os jogadores por posição.

    // Agrupa os jogadores por posição.
    jogadores.forEach(jogador => {
        if (!posicoes[jogador.posicao]) {
            posicoes[jogador.posicao] = [];
        }
        posicoes[jogador.posicao].push(jogador);
    });

    // Distribui os jogadores de cada posição alternadamente entre os dois times.
    for (let pos in posicoes) {
        posicoes[pos].forEach((jogador, index) => {
            if (index % 2 === 0) {
                time1.push(jogador);
            } else {
                time2.push(jogador);
            }
        });
    }

    // Exibe os jogadores sorteados em cada time na interface.
    exibirTimes(time1, time2);
}

// Função para exibir os jogadores de cada time na interface.
function exibirTimes(time1, time2) {
    const listaTime1 = document.getElementById('time1'); // Lista do Time A.
    const listaTime2 = document.getElementById('time2'); // Lista do Time B.

    // Limpa os conteúdos anteriores das listas.
    listaTime1.innerHTML = '';
    listaTime2.innerHTML = '';

    // Adiciona os jogadores do Time A na interface.
    time1.forEach((jogador, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${jogador.nome} (${jogador.posicao})`;

        // Adiciona um botão de remoção ao lado do nome do jogador.
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.onclick = () => removerJogador(index);
        li.appendChild(btnRemover);

        listaTime1.appendChild(li);
    });

    // Adiciona os jogadores do Time B na interface.
    time2.forEach((jogador, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${jogador.nome} (${jogador.posicao})`;

        // Adiciona um botão de remoção ao lado do nome do jogador.
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.onclick = () => removerJogador(index);
        li.appendChild(btnRemover);

        listaTime2.appendChild(li);
    });
}

// Função para zerar a lista de jogadores e os times.
function zerarLista() {
    // Limpa a lista de jogadores.
    jogadores = [];

    // Atualiza a interface e limpa os times.
    atualizarLista();
    document.getElementById('time1').innerHTML = '';
    document.getElementById('time2').innerHTML = '';

    // Atualiza o armazenamento local.
    salvarJogadores();
}

// Função para salvar a lista de jogadores no armazenamento local.
function salvarJogadores() {
    localStorage.setItem('jogadores', JSON.stringify(jogadores));
}

// Função para inicializar as opções de posição no campo de seleção.
function inicializarPosicoes() {
    const posicaoSelect = document.getElementById('posicao'); // Seleciona o campo de posição.
    const opcoes = []; // Lista de opções para posições (atualmente está vazia).

    // Adiciona cada opção ao campo de seleção.
    opcoes.forEach(opcao => {
        const option = document.createElement('option');
        option.value = opcao;
        option.textContent = opcao;
        posicaoSelect.appendChild(option);
    });
}

// Executa as funções iniciais ao carregar a página.
window.onload = () => {
    inicializarPosicoes(); // Inicializa as opções de posição.
    atualizarLista(); // Atualiza a lista de jogadores na interface.
};


/* Tela do login */

fetch('config.json')
    .then(response => response.json())
    .then(config => {
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');

            if (username === config.USERNAME && password === config.PASSWORD) {
                errorMessage.textContent = '';
                window.location.href = 'app.html';
            } else {
                errorMessage.textContent = 'Usuário ou senha incorretos!';
            }
        });
    });
