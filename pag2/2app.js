function sortear() {
    let quantidade = parseInt(document.getElementById('quantidade').value);
    let de = parseInt(document.getElementById('de').value);
    let ate = parseInt(document.getElementById('ate').value);

    // Verifica se o intervalo tem números suficientes antes de sortear
    if ((ate - de + 1) < quantidade) {
        alert('O intervalo deve ser maior ou igual à quantidade de números a serem sorteados.');
        return;
    }

    let sorteados = new Set(); // Usando um Set para evitar números repetidos

    while (sorteados.size < quantidade) {
        let numero = Math.floor(Math.random() * (ate - de + 1)) + de;
        sorteados.add(numero); // Como é um Set, ele automaticamente ignora repetidos
    }

    let resultado = document.getElementById('resultado');
    resultado.innerHTML = `<label class="texto__paragrafo">Números sorteados: ${[...sorteados].join(", ")}</label>`;

    alterarStatusBotao();
}

function obterNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function validarCampos() {
    let quantidade = document.getElementById('quantidade').value.trim();
    let de = document.getElementById('de').value.trim();
    let ate = document.getElementById('ate').value.trim();
    let botao = document.getElementById('btn-sortear');

    // Se algum campo estiver vazio, desativa o botão
    botao.disabled = !(quantidade && de && ate);
}

function alterarStatusBotao() {
    let botao = document.getElementById('btn-reiniciar');
    let resultado = document.getElementById('resultado').innerText.trim();

    // Se houver números sorteados, habilita o botão
    if (resultado.includes("Números sorteados:") && resultado !== "Números sorteados: ") {
        if (botao.classList.contains('container__botao-desabilitado')) {
            botao.classList.remove('container__botao-desabilitado');
            botao.classList.add('container__botao');
        }
    } else {
        // Se não houver números sorteados, desabilita o botão
        if (botao.classList.contains('container__botao')) {
            botao.classList.remove('container__botao');
            botao.classList.add('container__botao-desabilitado');
        }
    }
}


function reiniciar() {
    let botaoReiniciar = document.getElementById('btn-reiniciar');
    let resultado = document.getElementById('resultado').innerText.trim();

    // Se não houver números sorteados, impede a reinicialização
    if (!resultado.includes("Números sorteados:") || resultado === "Números sorteados: ") {
        return;
    }

    document.getElementById('quantidade').value = '';
    document.getElementById('de').value = '';
    document.getElementById('ate').value = '';
    document.getElementById('resultado').innerHTML = '';

    validarCampos(); // Desativa o botão "Sortear" após reiniciar
    alterarStatusBotao();
}



document.addEventListener('DOMContentLoaded', function () {
    let inputs = document.querySelectorAll('#quantidade, #de, #ate');

    inputs.forEach(input => {
        input.addEventListener('input', validarCampos);
    });

    validarCampos(); // Garante que o botão esteja desativado ao iniciar
});
