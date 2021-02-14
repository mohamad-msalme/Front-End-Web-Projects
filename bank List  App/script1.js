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
    '2021-02-09T23:36:17.929Z',
    '2021-02-11T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'de-DE', // de-DE
  currloginDate: '2021-02-10T10:51:36.790Z',
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
// Elements////////
const labelWelcome = document.querySelector('.welcome');
const lableLastLogin = document.querySelector('.last__login');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnLogout = document.querySelector('.logout__btn');
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

const view = {
  updateMovs(stack) {
    containerMovements.innerHTML = '';
    for (const [i, [date, mov]] of stack.entries()) {
      const type = mov > 0 ? 'deposit' : 'withdrawal';
      const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
        ${i + 1} ${type}</div>
        <div class="movements__date">${this.formatDate(date)}</div>
        <div class="movements__value">${this.formatNumber(mov)}</div>
      </div>`;
      containerMovements.insertAdjacentHTML('afterbegin', html);
    }
    this.styleOddRow();
  },
  updateUI() {
    view.updateMovs(this.currAcc.datesAndMovements);
    labelBalance.textContent = `${view.formatNumber(this.currAcc.balance)}`;
    labelSumInterest.textContent = `${view.formatNumber(this.currAcc.intrest)}`;
    labelSumIn.textContent = `${view.formatNumber(this.currAcc.incomes)}`;
    labelSumOut.textContent = `${view.formatNumber(this.currAcc.out)}`;
  },
  styleOddRow: () => {
    const movsRows = [
      ...containerMovements.querySelectorAll('.movements__row'),
    ];
    movsRows.forEach((row, i) =>
      i % 2 !== 0 ? row.classList.add('movements__row__even') : 0
    );
  },
  formatDate(date) {
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    const mSecToDays = 1000 * 60 * 60 * 24;
    const mSec = Math.abs(new Date() - new Date(date));
    const days = Math.floor(mSec / mSecToDays);
    if (days == 0 || days == 'Today') return 'Today';
    else if (days == 1) return 'Yasterday.';
    else if (days <= 7) return `${days} days ago`;
    else
      return new Intl.DateTimeFormat(model.currAcc.locale, options).format(
        new Date(date)
      );
  },
  formatNumber(num) {
    const options = {
      style: 'currency',
      currency: model.currAcc.currency,
    };
    return new Intl.NumberFormat(model.currAcc.locale, options).format(num);
  },
};
const model = {
  resetInput() {
    inputTransferTo.value = inputTransferAmount.value = '';
    inputLoanAmount.value = '';
    inputCloseUsername.value = inputClosePin.value = '';
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginUsername.classList.remove('login__input__error');
    inputLoginPin.classList.remove('login__input__error');
    btnLogin.classList.add('hidden');
    btnLogout.classList.remove('hidden');
  },
  handelTransfer(e) {
    e.preventDefault();
    const traName = inputTransferTo.value;
    const isValidAcc = accounts.findIndex(
      acc => acc.userName == traName && traName != this.currAcc.userName
    );
    let amount = +inputTransferAmount.value;
    amount = this.currAcc.balance >= (amount > 0 ? amount : NaN) ? amount : NaN;
    if (isValidAcc >= 0 && amount) {
      this.updateMovs(isValidAcc, amount);
      this.updateMovs(this.currInd, -1 * amount);
      this.calcSummary();
    } else console.log('Error ');
  },
  handelLoan(e) {
    e.preventDefault();
    const amount = +inputLoanAmount.value ?? 0;
    const isValid = this.currAcc.movements.some(mov => mov >= amount * 0.1);
    if (amount > 0 && isValid) {
      this.updateMovs(this.currInd, amount);
      setTimeout(this.calcSummary.bind(model), 5000);
    } else console.log('Error ');
  },
  handelClose(e) {
    e.preventDefault();
    const isvalidName = inputCloseUsername.value === this.currAcc.userName;
    const isValidPin = +inputClosePin.value === this.currAcc.pin;
    if (isValidPin && isvalidName) {
      accounts.splice(this.currentAccountIndx, 1);
      containerApp.style.opacity = 0;
      containerMovements.innerHTML = '';
    } else console.log('Error');
    this.resetInput();
  },
  updateMovs(indexAcc, amount) {
    accounts[indexAcc].movements.push(Math.floor(amount));
    accounts[indexAcc].movementsDates.push(Date.now());
    accounts[indexAcc].datesAndMovements.push([Date.now(), amount]);
  },
  calcSummary() {
    this.currAcc.balance = this.currAcc.movements
      .reduce((acc, mov) => acc + mov, 0)
      .toFixed(2);

    this.currAcc.incomes = this.currAcc.movements
      .filter(mov => mov > 0)
      .reduce((acc, Pomov) => acc + Pomov, 0)
      .toFixed(2);

    this.currAcc.out = this.currAcc.movements
      .filter(mov => mov < 0)
      .reduce((acc, negMov) => acc + negMov, 0)
      .toFixed(2);

    this.currAcc.intrest = this.currAcc.movements
      .filter(mov => mov > 0)
      .map(posMov => (posMov * this.currAcc.interestRate) / 100)
      .filter(intrest => intrest >= 1)
      .reduce((acc, intrest) => acc + intrest, 0)
      .toFixed(2);

    view.updateUI.call(this);
    this.resetInput();
  },
  login(logIndAcc) {
    this.timer();
    this.currAcc = accounts[logIndAcc];
    this.currInd = logIndAcc;
    lableLastLogin.textContent = `Last Login : ${view.formatDate(
      this.currAcc.currloginDate
    )}`;
    containerApp.style.opacity = 1;
    labelWelcome.textContent = `Hello, Again ${this.currAcc.firstName}`;
    this.calcSummary();
  },
  logout(e) {
    e.preventDefault();
    btnLogout.classList.add('hidden');
    btnLogin.classList.remove('hidden');
    clearInterval(this.intTimerID);
    containerApp.style.opacity = 0;
    this.currAcc.currloginDate = new Date();
    labelWelcome.textContent = 'Log in to get started';
  },
  sortMovs(e) {
    if (e.target.value == 'true') {
      e.target.value = 'false';
      view.updateMovs(this.currAcc.datesAndMovements);
    } else {
      e.target.value = 'true';
      const shollow = this.currAcc.datesAndMovements
        .slice()
        .sort((a, b) => a[1] - b[1]);
      view.updateMovs(shollow);
    }
  },
  timer() {
    let timer = 300; // 300sec = 5 Min;
    this.intTimerID = setInterval(() => {
      timer--;
      let min = `${Math.trunc(timer / 60)}`.padStart(2, 0);
      let sec = `${Math.trunc(timer % 60)}`.padStart(2, 0);
      labelTimer.textContent = `${min} : ${sec}`;
      if (timer < 0) controller.logout();
    }, 1000);
  },
};

const controller = {
  initAccounts() {
    [this.firstName, this.lastName] = this.owner.toLowerCase().split(' ');
    this.userName = `${this.firstName[0]}${this.lastName[0]}`;
    this.datesAndMovements = [...new Map()];
    for (const [ind, mov] of this.movements.entries())
      this.datesAndMovements.push([this.movementsDates[ind], mov]);
  },
  checkLogin(e) {
    e.preventDefault();
    this.logIndAcc = accounts.findIndex(
      acc =>
        acc.userName === inputLoginUsername.value &&
        acc.pin === +inputLoginPin.value
    );
    this.logIndAcc >= 0 ? model.login(this.logIndAcc) : this.errorLogin();
  },
  handelEvents() {
    accounts.forEach(acc => controller.initAccounts.call(acc));
    btnLogin.addEventListener('click', controller.checkLogin.bind(controller));
    btnLogout.addEventListener('click', model.logout.bind(model));
    btnSort.addEventListener('click', model.sortMovs.bind(model));
    btnTransfer.addEventListener('click', model.handelTransfer.bind(model));
    btnLoan.addEventListener('click', model.handelLoan.bind(model));
    btnClose.addEventListener('click', model.handelClose.bind(model));
  },
  errorLogin: () => {
    inputLoginUsername.classList.add('login__input__error');
    inputLoginPin.classList.add('login__input__error');
    inputLoginPin.value = inputLoginUsername.value = '';
  },
};
controller.handelEvents();
