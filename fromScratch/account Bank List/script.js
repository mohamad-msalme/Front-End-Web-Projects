
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-11-20T14:11:59.604Z',
    '2020-11-23T17:01:17.194Z',
    '2020-11-24T23:36:17.929Z',
    '2020-11-25T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'de-DE', // de-DE
  currloginDate: '2020-11-26T10:51:36.790Z',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-11-27T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'pt-PT',
  currloginDate: '2020-11-25T10:51:36.790Z',

};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-11-24T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'de-DE', // de-DE
  currloginDate: '2020-11-24T10:51:36.790Z',

};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90, 50, 400, -460],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-23T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
  currloginDate: '2020-11-27T10:51:36.790Z',

};

const accounts = [account1, account2, account3, account4];
/////////////////////////////////////////////////////

// Elements////////
const labelWelcome   = document.querySelector('.welcome');
const lableLastLogin = document.querySelector('.last__login');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

/////////////////////////////////////////////////

const view = {

  viewMvments:( acc, sort = 'on')=> {
    // remove all movs on screen 
    containerMovements.innerHTML = "";
    let stack = acc.copyMovsAndDates.slice();
    //function to create aray contains array of pairs of movs & date
    // sort Movs With Dates 
    if( sort === 'off'){ 
      stack.sort( (a, b) => a[movAmunt = 1] -b[movAmunt = 1]);
    }
    //display Movs 
    stack.forEach((mov, i) => {
      const type = mov[movAmunt = 1] > 0 ? 'deposit' : 'withdrawal';
      const html =`
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${ i + 1} ${type}</div>
          <div class="movements__date">${model.calcPassedDays(mov[0])}</div>
          <div class="movements__value">${model.formatNumber(mov[movAmunt = 1])}</div>
        </div>`;
      containerMovements.insertAdjacentHTML('afterbegin', html);  
      });
    view.styleOddRow();
  },

  viewSumarry :(currAcc)=>{
    labelSumIn.textContent       = `${model.formatNumber(currAcc.incomes)}`;
    labelSumOut.textContent      = `${model.formatNumber(currAcc.out)}`;
    labelSumInterest.textContent = `${model.formatNumber(currAcc.intrest)}`
  },

  viewBalance :(currAcc)=> labelBalance.innerHTML = `${model.formatNumber(currAcc.balance)}`,

  viewLoginDate:(currAcc)=>
    lableLastLogin.innerHTML = `last Login: ${model.calcPassedDays(currAcc.currloginDate)}`,
    
  viewDateUpdated: ()=> labelDate.innerHTML = `${model.formatDate(Date.now())}`,

  viewTimer: (time)=> labelTimer.innerHTML = time,
 
  viewMessageWelcom: (msg)=>labelWelcome.textContent = msg,

  styleOddRow: ()=>{
    const movsRows = [...containerMovements.querySelectorAll('.movements__row')]
    movsRows.forEach( (row, i) => i % 2 !== 0 ? row.classList.add('movements__row__even') : 0 );
  },

  updateUserInreface : function(currAcc){
    inputCloseUsername.value = inputClosePin.value = '';
    inputLoginPin.value = inputLoginUsername.value = "";
    inputTransferAmount.value = inputTransferTo.value = '';
    model.calcBalance();
    model.calcSummary();
    this.viewMvments(currAcc);
    this.viewSumarry(currAcc);
    this.viewBalance(currAcc);
  },
};

const model = {

  calcBalance : function(){
    this.currAcc.balance = this.currAcc.movements.reduce( (acc, mov) => acc + mov, 0).toFixed(2);
  },

  calcSummary : function(){
    this.currAcc.incomes = 
      this.currAcc.movements
        .filter( mov => mov > 0 )
        .reduce( (acc, Pomov) => acc + Pomov, 0)
        .toFixed(2);

    this.currAcc.out =
      this.currAcc.movements
        .filter( mov => mov < 0)
        .reduce( (acc, negMov) => acc + negMov, 0)
        .toFixed(2);
  
    this.currAcc.intrest =
      this.currAcc.movements
        .filter( mov => mov > 0)
        .map( posMov => (posMov * this.currAcc.interestRate)/100)
        .filter( intr => intr >= 1 )
        .reduce((acc, int) => acc + int, 0)
        .toFixed(2);
  },

  login : function(currAcclogIndx){
    this.currentAccountIndx = currAcclogIndx;
    this.currAcc = accounts[this.currentAccountIndx];
    if(containerApp.style.opacity) {//Second Login
      view.viewMessageWelcom(``);
      clearInterval(this.timerState)
      containerApp.style.opacity = 0;
      setTimeout( ( )=> this.timer(),500)
    }else{
      this.timer();
    }  // first LogIn 
  },

  checkValidTranfer: function(e){
    e.preventDefault();
    let amount = +inputTransferAmount.value ;
    amount = 
      this.currAcc.balance >=
      (amount > 0 ? amount : NaN) ?
      amount : NaN;
    let tranAccName = inputTransferTo.value ;

    let tranAccIndx = 
      this.currAcc.userName === tranAccName ? -1 : accounts.findIndex( acc=> acc.userName === tranAccName );
    inputTransferAmount.value = inputTransferTo.value = '';

    tranAccIndx >= 0 && amount ? this.transferMoney(tranAccIndx ,amount) : console.log(`Error Input`);
  },

  transferMoney: function(transAccIndx, amount){
    this.currAcc.movements.push(-1*amount);
    this.currAcc.movementsDates.push(Date.now());
    this.currAcc.copyMovsAndDates.push([Date.now(), -1*amount])

    accounts[transAccIndx].movements.push(amount);
    accounts[transAccIndx].movementsDates.push(Date.now());
    accounts[transAccIndx].copyMovsAndDates.push([Date.now(), amount]);

    view.updateUserInreface(this.currAcc);
  },


  checkValidCloseAcc : function(e){
    e.preventDefault();
    let closeUserName = inputCloseUsername.value;
    closeUserName = closeUserName === this.currAcc.userName ? closeUserName : undefined;
    let closePassword = +inputClosePin.value;
    closePassword = closePassword === this.currAcc.pin ? closePassword : undefined;
    closePassword && closeUserName ? this.deletAccount() : console.log(`Error Input`);
  },

  deletAccount: ()=>{
    accounts.splice(this.currentAccountIndx, 1);
    containerApp.style.opacity = 0;
  },

  checkLoan: function(e){
    e.preventDefault();
    const amount = +inputLoanAmount.value;
    if (amount > 0 && this.currAcc.movements.some(mov => mov >= amount * 0.1)) this.loanMoney(amount);
    else console.log(`Error Input`);
  },

  loanMoney: function(loanAmount){
    this.currAcc.movements.push(Math.floor(loanAmount));
    this.currAcc.movementsDates.push(Date.now());
    this.currAcc.copyMovsAndDates.push([Date.now(), Math.floor(loanAmount)])

    inputLoanAmount.value = '';
    setTimeout(view.updateUserInreface.bind(view, this.currAcc),3000);

  },
  
  sortMovs: function(e){
    e.preventDefault();
    //sort button pressed  
    if(e.target.value == 'off'){
      view.viewMvments(this.currAcc, 'off');
      e.target.value = 'on';
    }else{
      view.viewMvments(this.currAcc, 'on');
      e.target.value = 'off';
    }
  },

  formatDate: (date)=>{
    const options = {
      timeStyle: "short",
      dateStyle: "medium",
    };  
    return new Intl.DateTimeFormat(model.currAcc.locale, options).format(date);
  },

  calcPassedDays: function( pastDate ) { 
    let days = Math.abs( Date.now() - new Date(pastDate)); // result in ms 
    days = Math.floor( days /(1000*60*60*24));// convert from ms to days 
    if( days === 0)       return `Today.`;
    else if( days === 1 ) return 'Yasterday.';
    else if( days <= 7 )  return `${days} days ago.`;
    else return this.formatDate(new Date(pastDate));
  },

  formatNumber: function(number){
    const options = {
      style: 'currency',
      currency: this.currAcc.currency
    };
    return new Intl.NumberFormat(this.currAcc.locale, options).format(number);
  },

  timer: function(){
    let time = 300 ;
    containerApp.style.opacity = 1;
    const welcomMsg = `Hello Again, ${this.currAcc.owner.split(" ")[0]}`;
    view.viewMessageWelcom(welcomMsg);
    view.viewDateUpdated();
    view.viewLoginDate(this.currAcc);
    view.updateUserInreface(this.currAcc);
    this.currAcc.currloginDate = Date.now();

    inputLoginUsername.classList.remove("login__input__error");
    inputLoginPin.classList.remove("login__input__error");
    
    var resetTimer = setInterval( function(){
      time--;   
      let minute = Math.trunc(time / 60) + '' ;
      let second = time % 60 + '';
      let result = `${minute.padStart(2, 0)} : ${second.padStart(2, 0)}`
        if(!time){ 
          view.viewMessageWelcom(`Log in to get started`);
          containerApp.style.opacity = 0;
          clearInterval(resetTimer)
        }
      model.timerState = resetTimer;
      view.viewTimer(result);
      view.viewDateUpdated();
    },1000);
  },
};

const contrller = {
  
  init:()=>{
    contrller.initAccount();
    btnLogin.addEventListener   ('click', contrller.checkValidlogin);
    btnTransfer.addEventListener('click', model.checkValidTranfer.bind(model));
    btnClose.addEventListener   ('click', model.checkValidCloseAcc.bind(model));
    btnSort.addEventListener    ('click', model.sortMovs.bind(model))
    btnLoan.addEventListener    ('click', model.checkLoan.bind(model));  
  },
  
  initAccount:()=>{
    accounts.forEach( acc => {
      acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map( word => word[0])
      .join(""); 

      acc.copyMovsAndDates = new Map();

      acc.movements
      .forEach( (mov, i)=> {
        acc.copyMovsAndDates
          .set(acc.movementsDates[i], mov.toFixed(2))
        })
        acc.copyMovsAndDates = [...acc.copyMovsAndDates];
      })     
  },
 

  checkValidlogin :function(e){
    e.preventDefault();
    clearInterval(view.resetTimer);
    const currLoginIndx =
      accounts.findIndex(acc => acc.userName === inputLoginUsername.value && acc.pin === +inputLoginPin.value);
    currLoginIndx >= 0 ? this.login(currLoginIndx) : contrller.errorLogin();
  }.bind(model),

  errorLogin:()=>{
    inputLoginUsername.classList.add('login__input__error');
    inputLoginPin.classList.add('login__input__error');
    inputLoginPin.value = inputLoginUsername.value = "";
  }
  
};
window.onload = contrller.init;


