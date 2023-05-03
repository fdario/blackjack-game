const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits = ['Espadas', 'Copas', 'Paus', 'Ouros']
let separacao = [' de '];
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

    fullCards.push(value[position].concat(separacao,suitsValue[position]));

    let unorderedListOfCards = document.createElement('ul');
    let listItemOfCards = document.createElement('li');
    
    res.innerHTML = `Carta: ${value} <br> Valor: ${verifyValue()}`;
    
    if (soma < 21) {
        if (position == 0) {
            soma = Number(value[0]);
        } else {
            soma += Number(verifyValue()[position]);
        }
        position++;

        result.textContent = `Total de cartas: ${soma}`;
        
        listItemOfCards.innerHTML = `Lista de cartas: ${fullCards}`;
        unorderedListOfCards.appendChild(listItemOfCards);
        
        res.appendChild(unorderedListOfCards);
        res.appendChild(result);
    }
    if (soma == 21) {
        button.remove();

        let resultWinner = document.createElement('p');
        resultWinner.classList.add("result");
        resultWinner.textContent = `Você ganhou!`;

        res.appendChild(result);
        res.appendChild(resultWinner);
        res.appendChild(reloadInstruction);
        res.appendChild(reloadButton);
    }
    if (soma > 21) {
        button.remove();

        let resultLoser = document.createElement('p');
        resultLoser.classList.add("result");
        resultLoser.textContent = `Você Perdeu!`;

        res.appendChild(result);
        res.appendChild(resultLoser);
        res.appendChild(reloadInstruction);
        res.appendChild(reloadButton);
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
