// deposite into slot machine
// determine no of line to bet/
// collect a bet amount
// spin the slote machine 
// check if the user won
// give moneu
// play again


// this is definition of a function 
// function deposite(){
//   return 1
// }
// const x = deposite()
// to run prog in terminal : node filename.js

//write npm i/install prompt-sync, in order to use this this will create package-lock.json
const prompt = require("prompt-sync")(); 

//defiing some global vars
const ROWS = 3;
const COLS = 3;

// definig some symbols of each wheal of each col

const symbols_conunt = {
  "A":2,
  "b":4,
  "c":6,
  "d":8
}
const symbols_value = {
  "A":5,
  "b":4,
  "c":3,
  "d":2
}

// this is another definition of a function 

// deposite into slot machine
const deposite = () => {
  while (true){

    const depositeAmount = prompt ("Enter your deposite amount : ");  //taking input , this will be in str format even if its number
    const NumberdepositeAmount = parseFloat(depositeAmount);   //type conversion
    if (isNaN(NumberdepositeAmount) || NumberdepositeAmount <= 0){
      console.log("invalid amount, please try again :")
    }else{
      return NumberdepositeAmount;
    }
  }
};

// determine no of line to bet/
const getNumberOfLines = () => {
  while (true){

    const lines = prompt ("Enter the number of line (1-3) : ");  //taking input , this will be in str format even if its number
    const numberOfLine = parseFloat(lines);   //type conversion
    if (isNaN(numberOfLine) || numberOfLine <= 0 || numberOfLine >3){
      console.log("invalid number of line, please try again :")
    }else{
      return numberOfLine;
    }
  }
}

// collect a bet amount
const getBet = (balance, lines) => {
  while (true){

    const bet = prompt ("Enter the total bet per line  : ");  //taking input , this will be in str format even if its number
    const numberBet = parseFloat(bet);   //type conversion
    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines){
      console.log("invalid bet amount or you have low balance, please try again :")
    }else{
      return numberBet;
    }
  }
}
//spinning the slot machine
const spin = () => {
  const symbols = [];
  for (const [symbol,count] of Object.entries(symbols_conunt)){
    for (let i=0;i<count;i++){
      symbols.push(symbol);  //84 to 87 line of code generates array of all the available symbols
    }
  }
  const reels= [];  //creating reels
  for (let i = 0; i< COLS; i++){
    reels.push([]); //creates reels no of COLS i.e. 3
    const reelSymbols = [...symbols];
    for (let j = 0; j<ROWS; j++){
      const randomIndex = Math.floor(Math.random()*reelSymbols.length);
      const selectedSymbols = reelSymbols[randomIndex]
      reels[i].push(selectedSymbols);
      reelSymbols.splice(randomIndex,1);

    }
  }
  return reels;
};


// transpose the result
const transpose = (reels) => {
  const rows= [];
  for (let i=0 ; i<ROWS ; i++){
    rows.push([]);
    for (let j=0; j<COLS ; j++){
      rows[i].push(reels[j][i]);
    }
  };
  return rows;
};

// print the transposed result
const printrows = (rows) => {
  for (const row of rows){
    let rowString = "";
    for (const [i, symbol] of row.entries()){
      rowString += symbol
      if (i != row.length - 1){
        rowString += " | "
      }
    }
    console.log(rowString)

  }
}

// get winners

const getWinnings = (rows , bet , lines) => {
  let winnings= 0;
  for (let row=0; row < lines; row++){
    const symbols= rows[row];
    let allsame= true;
    for (const symbol of symbols){
      if (symbol != symbols[0]){
        allsame= false;
        break;

      }

    }
    if (allsame){
      winnings += bet*symbols_value[symbols[0]]
    }

  }
  return winnings;

};

const game = () => {
  // variable can be defined as 'let, which allow to modify it' or  'const, which remains constant at all time '
let balance = deposite();
  while (true){
    console.log("you have balance of $" + balance);
    const numberOfLine= getNumberOfLines();
    const bet = getBet(balance, numberOfLine);
    balance -= bet * numberOfLine;
    const reels = spin();
    const rows = transpose(reels);
    printrows(rows);
    const winnings =  getWinnings(rows, bet, numberOfLine);
    balance += winnings;
    console.log("You won : $" + winnings.toString());
    if (balance <= 0){
      console.log("you ran out of money");
      break;
    }
      const playagain = prompt("do you want to play again (y\n)?")
      if (playagain != "y") break;
  }

};


game();




