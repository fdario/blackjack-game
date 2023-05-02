const button = document.getElementById('pegar-carta');
button.addEventListener('click', drawCard);
const res = document.getElementById('res');

const cards = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
const value = [];

let soma = 0;
let position = 0;

function drawCard() {
    if (soma > 21) {
        res.innerHTML = '';
        
        let resultLoser = document.createElement('p');
        resultLoser.textContent = `Você estourou! Clique em 'Reiniciar' para jogar de novo.`;

        let reloadButton = document.createElement('button');
        reloadButton.textContent = `Reiniciar`;
        reloadButton.addEventListener('click', reloadPage);

        res.appendChild(resultLoser);
        res.appendChild(reloadButton);

    } else if (soma == 21) {
        res.innerHTML = '';

        let resultWinner = document.createElement('p');
        resultWinner.textContent = `Você ganhou! Clique em 'Reiniciar' para jogar de novo.`;

        let reloadButton = document.createElement('button');
        reloadButton.textContent = `Reiniciar`;
        reloadButton.addEventListener('click', reloadPage);

        res.appendChild(resultWinner);
        res.appendChild(reloadButton);

    } else {
    value.push(cards[Math.floor((Math.random() * cards.length))]);
        res.innerHTML = `${verifyValue()}`;
        if (position == 0) {
            soma = value[0];
        } else {
            soma += verifyValue()[position];
        }
        position++;
        let result = document.createElement('p');
        result.textContent = `Total de cartas: ${soma}`;

        res.appendChild(result);
    }
}

function verifyValue() {
    if (value[0] == 'A') {
        value.shift();
        value.unshift(11);
    }
    if (value[position] == 'A') {
        value.pop();
        value.push(1);
    }
    if (value[0] == 'J') {
        value.shift();
        value.unshift(11);
    }
    if (value[position] == 'J') {
        value.pop();
        value.push(11);
    }
    if (value[0] == 'Q') {
        value.shift();
        value.unshift(12);
    }
    if (value[position] == 'Q') {
        value.pop();
        value.push(12);
    }
    if (value[0] == 'K') {
        value.shift();
        value.unshift(13);
    }
    if (value[position] == 'K') {
        value.pop();
        value.push(13);
    }
    return value;
}

function reloadPage() {
    document.location.reload(true);
}
