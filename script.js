const you = 'black';
const machine = 'red';
let turno = 0;
var tablero = [];
let winCases = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
]

const celdas = document.querySelectorAll('button');



const play = () =>{
    tablero = Array.from(Array(9).keys());
    celdas.forEach(
        (item, index) => {
            item.addEventListener('click', e => handleClick(e, index))
            item.style.removeProperty('background');
        }
    )
}

const turn = (celId, player) =>{
    tablero[celId] = player;
    const cell = document.getElementById(celId);
    cell.style.backgroundImage = player === you ? "url('/img/ficha2.png')" : "url('/img/ficha1.png')";
    // document.getElementById(celdId).innerText = player;
    let winner = isWin(tablero, player);
    winner ? gameOver(winner) : null; 
}

const isWin = (tablero, player) => {
    let marcados = tablero.reduce((acum, element, index) => (element === player) ? acum.concat(index) : acum, []);
    let winner = null;
    console.log(marcados);
    for (let [index, caseWin] of winCases.entries()){
        if(caseWin.every(item => marcados.indexOf(item)> -1)){
            winner = {index: index, player: player};
            return winner;
        }
    }

    return winner;
}

const gameOver = (winner) => {
    for(let index of winCases[winner.index]){
        document.getElementById(index).style.background = "blue";
    }
    celdas.forEach(
        (item) => item.removeEventListener('click', handleClick, false)
    )
}

const freeCells = () => {
    return tablero.filter(item => typeof item == 'number');
}

const bestSpot = () => {
	return freeCells()[0];
}

// const checkCell(){
//     if(freeCells().length == 0){
//         for()
//     }
// }

const handleClick = (e, index) => {
    //capturar elemento del DOM
    const celda = e.target;

    //Asignar jugadores
    if(typeof tablero[e.target.id] == 'number'){
        turn(e.target.id, you);
        setTimeout(
            function() {
                turn(bestSpot(), machine)
            }
        , 1000);
    }

    
    //Renderizar imagen de ficha jugada
    // celda.style.backgroundImage = turno % 2 ? "url('/img/ficha2.png')" : "url('/img/ficha2.png')";
}
