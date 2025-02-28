document.addEventListener("DOMContentLoaded", () => {
    let listaNumeroSorteados = [];
    let numeroLimite = 10;
    let numeroSecreto = gerarNumeroSecreto();
    let tentativas = 1;
    let maxTentativas = 5; // Define o limite de tentativas

    function gerarNumeroSecreto() {
        let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
        let numeroElementosLista = listaNumeroSorteados.length;

        if (numeroElementosLista == 10) {
            listaNumeroSorteados = [];
        }

        if (listaNumeroSorteados.includes(numeroEscolhido)) {
            return gerarNumeroSecreto();
        } else {
            listaNumeroSorteados.push(numeroEscolhido);
            console.log(listaNumeroSorteados);
            return numeroEscolhido;
        }
    }

    // Função para exibir mensagens na tela
    function exibirTexto(tag, texto) {
        let campo = document.querySelector(tag);
        campo.innerHTML = texto;
        responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
    }

    // Mensagem inicial
    function exibirMensagemInicial() {
        exibirTexto('h1', 'Hora do desafio');
        exibirTexto('p', `Escolha um número entre 1 e ${numeroLimite}.`);
    }
    exibirMensagemInicial();

    // Função para verificar o chute do jogador
    function verificarChute() {
        let chute = document.querySelector('input').value; // Obtém o valor digitado no campo de entrada

        // Validação de entrada para garantir que é um número válido
        if (isNaN(chute) || chute < 1 || chute > numeroLimite) {
            exibirTexto('h1', `Por favor, insira um número válido entre 1 e ${numeroLimite}.`);
            return;
        }

        if (chute == numeroSecreto) {
            exibirTexto('h1', `Parabéns! Você acertou o número secreto!`);
            let plural = tentativas > 1 ? 'tentativas' : 'tentativa';
            let mensagemTentativa = `Você acertou com ${tentativas} ${plural}.`;
            exibirTexto('p', `${mensagemTentativa}`);
            document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão Reiniciar
        } else if (chute < numeroSecreto) {
            exibirTexto('h1', `Tente novamente`);
            exibirTexto('p', `O número secreto é maior que ${chute}.`);
        } else {
            exibirTexto('h1', `Tente novamente`);
            exibirTexto('p', `O número secreto é menor que ${chute}.`);
        }

        // Verifica se atingiu o limite de tentativas
        if (tentativas >= maxTentativas) {
            exibirTexto('h1', `Você não acertou! O número secreto era ${numeroSecreto}.`);
            document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão Reiniciar
            return;
        }

        tentativas++;
        limparCampo();
    }

    // Função para limpar o campo de entrada
    function limparCampo() {
        let chute = document.querySelector('input');
        chute.value = '';
    }

    // Função para reiniciar o jogo
    function reiniciarJogo() {
        numeroSecreto = gerarNumeroSecreto(); // Gera um novo número secreto
        tentativas = 1; // Reseta o contador de tentativas
        exibirMensagemInicial(); // Redefine as mensagens iniciais
        limparCampo(); // Limpa o campo de entrada
        document.getElementById('reiniciar').setAttribute('disabled', 'true'); // Desativa o botão Reiniciar novamente
    }

    document.getElementById('reiniciar').addEventListener('click', reiniciarJogo);

    // Certifique-se de que a função verificarChute esteja disponível globalmente
    window.verificarChute = verificarChute;

    // Adiciona o event listener para o botão "Chutar"
    document.getElementById('botaoChutar').addEventListener('click', verificarChute);
});
