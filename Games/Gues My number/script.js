window.onload = init;
let score = 20 ; 
let heighScore = 0 ;
let randomNumber = Math.floor(Math.random()*(score + 1 ));
function init(){
  console.log('asd');
  const submit = document.querySelector('.check');
  const playAgain = document.querySelector('.again');
  playAgain.addEventListener('click', resetGame);
  submit.addEventListener('click', compare);
  console.log(randomNumber);

}

function compare(){
  const guessobj = document.querySelector('.guess');
  const guess = validInput(guessobj.value);
  guessobj.value = '';

  if(!isNaN(guess) && score){
      if(guess === randomNumber){
        const body = document.querySelector('body');
        body.style.background = 'green';
        display(randomNumber, 3);
        display(`💯 Score:\t${--score}`, 1);
        display('it is correct guess', 0);
        if( score > heighScore){
          heighScore = score;
          display(`🥇 Highscore:\t${heighScore}`, 2);
        }
        score = 0 ;

      }
      else if ( guess > randomNumber){
        display('it is Too Heigh', 0);
        display(`💯 Score:\t${--score}`, 1);
      }
      else {
        display('it is Too Low', 0);
        display(`💯 Score:\t${--score}`, 1);
      }     
  }else return 0 ;

}

function validInput(value){
  if(Number(value) && isFinite(value) && (value >= 0 && value <= 20)){
    return Math.floor(Number(value));
  }else {
    display('Pease Enter Valid input',0);
    return NaN;
  }
}
function display(str, num){
  str = str.toString();
  switch(num){
    case 0 : 
      const message = document.querySelector('.message');
      message.textContent = str;
      break;
    case 1 :
      const score = document.querySelector('.label-score');
      score.textContent = str;
      break;
    case 2 :
      const heighScore = document.querySelector('.label-highscore');
      heighScore.textContent = str;
      break;
    default:
      const correctNumber = document.querySelector('.number');
      correctNumber.textContent = str;
      break;
  }
}
function resetGame(){
  randomNumber = Math.floor(Math.random()*21);
  score = 20 ;
  const body = document.querySelector('body');
        body.style.background = '#222';
  display(`💯 Score:\t${score}`, 1);
  display('Start guessing...', 0);
  display('?', 3);
  console.log(randomNumber);

}

