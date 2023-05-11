const cards = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
const suits = ['Espadas', 'Copas', 'Paus', 'Ouros'];
const separacao = [' de '];
const value = [];
const suitsValue = [];
const fullCards = [];

let soma = 0;
let position = 0;

const button = document.getElementById('pegar-carta');
button.addEventListener('click', drawCard);
const res = document.getElementById('res');

const reloadButton = document.createElement('button');
reloadButton.textContent = `Reiniciar`;
reloadButton.addEventListener('click', reloadPage);

const result = document.createElement('p');

const reloadInstruction = document.createElement('p');
reloadInstruction.textContent = `Clique em 'Reiniciar' para jogar de novo.`;

function drawCard() {
    res.innerHTML = '';
    res.classList.add('appaear');

    value.push(cards[Math.floor((Math.random() * cards.length))]);
    suitsValue.push(suits[Math.floor((Math.random() * suits.length))]);

    fullCards.push(value[position].toString().concat(separacao, suitsValue[position]));

    let unorderedListOfCards = document.createElement('ul');
    let listItemOfCards = document.createElement('li');
    res.innerHTML = `<p>Carta: ${fullCards[position]}</p><p>Valor: ${verifyValue()}</p>`;

    if (soma < 21) {
        if (position == 0) {
            soma = value[0];
        } else {
            soma += verifyValue()[position];
        }

        position++;

        result.textContent = `Total de cartas: ${soma}`;

        listItemOfCards.innerHTML = `Lista de cartas:`;
        unorderedListOfCards.appendChild(listItemOfCards);

        for (let i = 1; i <= fullCards.length; i++) {
            let cardsForTheList = document.createElement('li');
            cardsForTheList.textContent = `${fullCards[i - 1]}`;
            unorderedListOfCards.appendChild(cardsForTheList);
        }

        res.appendChild(result);
        res.appendChild(unorderedListOfCards);
    }
    if (soma == 21) {
        button.remove();

        let resultWinner = document.createElement('p');
        resultWinner.classList.add("result");
        resultWinner.classList.add("win");
        resultWinner.textContent = `Você ganhou!`;

        res.appendChild(resultWinner);
        res.appendChild(reloadInstruction);
        res.appendChild(reloadButton);
    }
    if (soma > 21) {
        button.remove();

        let resultLoser = document.createElement('p');
        resultLoser.classList.add("result");
        resultLoser.classList.add("lose");
        resultLoser.textContent = `Você Perdeu!`;

        res.appendChild(resultLoser);
        res.appendChild(reloadInstruction);
        res.appendChild(reloadButton);
    }
}

function verifyValue() {
    if (value[0] == 'A') {
        let aceConfirm = window.prompt('O Ás nessa posição pode valer 1 ou 11. Qual você deseja? Digite apenas o número');
        if (aceConfirm == 1) {
            value.pop();
            value.push(1);
        } else {
            value.pop();
            value.push(11);
        }
    }
    switch (value[position]) {
        case 'A':
            value.pop();
            value.push(1);
            break;
        case 'J':
            value.pop();
            value.push(11);
            break;
        case 'Q':
            value.pop();
            value.push(12);
            break;
        case 'K':
            value.pop();
            value.push(13);
            break;
    }
    return value;
}

function reloadPage() {
    document.location.reload(true);
}