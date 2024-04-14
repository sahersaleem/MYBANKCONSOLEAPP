import inquirer from "inquirer";

interface IBankAccount {
  accountBalance: number;

  deposit(d: number): void;
  getBalance(): void;
  withDraw(d: number): void;
}

class Customer {
  firstName: string;
  lastName: string;
  age: number;
  mobileNumber: number;
  bankAccount: number;

  constructor(
    firstName: string,
    lastName: string,
    age: number,
    mobileNumber: number,
    bankacccount: number
  ) {
    (this.firstName = firstName),
      (this.lastName = lastName),
      (this.age = age),
      (this.mobileNumber = mobileNumber);
    this.bankAccount = bankacccount;
  }
}

class BankAccount implements IBankAccount {
  accountBalance: number = 0;

  constructor() {
    this.accountBalance = 0;
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.accountBalance += amount;
      console.log(`Amount added Successfully`);
    } else {
      console.log("You entered wrong amount!");
    }
  }

  withDraw(amount: number): void {
    if (amount > this.accountBalance) {
      let error = "The amount is greater than the current balance";
      console.error(error);
    }

    if (amount <= this.accountBalance) {
      this.accountBalance -= amount;
      console.log("Your amount is withdrawn successfully!");
    }
  }
  getBalance(): void {
    console.log(this.accountBalance);
  }
}

async function createAccount() {
  const userInfo = await inquirer.prompt([
    {
      type: "string",
      name: "firstName",
      message: "Enter user first name:",
    },

    {
      type: "string",
      name: "lastName",
      message: "Enter user last name:",
    },

    {
      type: "number",
      name: "age",
      message: "Enter user age : ",
    },
    {
      type: "number",
      name: "accNo",
      message: "Enter user bankAccount No : ",
    },
    {
      type: "number",
      name: "mobNo",
      message: "Enter user mobile No : ",
    },
  ]);
  const { firstName, lastName, age, mobNo, accNo } = userInfo;
  const user = new Customer(firstName, lastName, age, mobNo, accNo);
  console.log("Account Created Successfully !");
  console.table(user);
}

await createAccount();

async function askQuestion() {
  let bank = new BankAccount();
  let running = true;
  while (running) {
    const userInput = await inquirer.prompt([
      {
        type: "list",
        name: "opt",
        message: "Which Operation You Want To Perform?",
        choices: ["Deposit", "WithDraw", "GetBalance", "Exit"],
      },
    ]);

    const { opt } = userInput;

    if (opt == "Deposit") {
      const userInputAmount = await inquirer.prompt([
        {
          type: "number",
          name: "depositAmount",
          message: "Enter Amount For Deposit : ",
        },
      ]);
      const { depositAmount } = userInputAmount;

      bank.deposit(depositAmount);
    }

    if (opt == "WithDraw") {
      const userInputAmountForWithDraw = await inquirer.prompt([
        {
          type: "number",
          name: "WithDrawamount",
          message: "Enter Amount For Withdraw : ",
        },
      ]);

      const { WithDrawamount } = userInputAmountForWithDraw;

      bank.withDraw(WithDrawamount);
    }

    if (opt == "GetBalance") {
      let userBalance = bank.getBalance();
    }
    if (opt == "Exit") {
      running = false;
    }
  }
}

askQuestion();
