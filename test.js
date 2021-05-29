////////////////////////////////
// utils
////////////////////////////////
const { format } = require('path');
function m(num){
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    return formatter.format(num);
}
////////////////////////////////


////////////////////////////////
// objects 
////////////////////////////////
class Employee {
    constructor(
        name = "Employee Name", type = "Designer",
        monthly_salary = 2400, years_experience = 0
    ){
        this.name = name;
        this.type = type;
        this.monthly_salary = monthly_salary;
        this.years_experience = years_experience;
    }

    render(){
        return `${this.name} (${this.type}): ${m(this.monthly_salary)} per month`;
    }
}

class Company{
    constructor(){
        this.name = "My Company";
        this.cash = 0.0;
        this.employees = [];
        this.employees.push(new Employee( "You", "Dev", 0, 0,));
        this.month = 0;
        this.income = 0.0;
        this.expenses = this.employees.reduce((total, e) => total + e.monthly_salary, 0 )
        this.monthly_cashflow = this.income - this.expenses;
    }

    next_month(){
        // update values we previewed last month
        this.month += 1;
        this.cash += this.monthly_cashflow;
        // update the values for next month
        // this.income = 0.0;
        this.expenses = this.employees.reduce((total, e) => total + e.monthly_salary, 0 )
        this.monthly_cashflow = this.income - this.expenses;
    }

    render(){
        const info = [
            `Company ${this.name}`,
            `  Cash: ${m(this.cash)} (${this.monthly_cashflow})`, 
            `  Income: ${m(this.income)} Expenses: ${m(this.expenses)}`,
        ].join("\n");
        let employee_str = "";
        if(this.employees.length > 0){
            employee_str += `Employees\n`;
            for(let i = 0; i < this.employees.length; i++){
                employee_str += `  ${this.employees[i].render()}\n`;
            }
        }
        return [info , employee_str].join("\n");
    }
}
////////////////////////////////

////////////////////////////////
// main  
////////////////////////////////
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

let company = null;
let active_menu = null;

function main(){
    company = new Company();
    active_menu = MainMenu
    menu();
}
////////////////////////////////

function render_before_menu(){
    console.clear();
    console.log(company.render());
    console.log("---------------------\n\n");
}
const MainMenu = {
    renderMenu: () => {
        let options = [
            'e. employee management',
            '',
            'n. forward time one month',
            "q. Exit",
        ];
        return options.join('\n');
    },
    processAnswer: (answer) => {
        switch(answer){
            case 'e': active_menu = EmployeeMenu; break;
            case 'n':
                console.log("next month");
                company.next_month();
                break;
            case 'q': process.exit(); break;
            default: console.log(`Option: ${answer} not valid`); break;
        }
        menu();
    }
}

const EmployeeHireMenu = {
    renderMenu: () => {
        let options = [
            'No One to Hire Right Now',
            '',
            'b. back',
            "q. Exit",
        ];
        return options.join('\n');
    },
    processAnswer: (answer) => {
        switch(answer){
            case 'b': active_menu = EmployeeMenu; break;
            case 'q': process.exit(); break;
            default: console.log(`Option: ${answer} not valid`); break;
        }
        menu();
    }
}

const EmployeeFireMenu = {
    renderMenu: () => {
        const status = company.employees.length > 1 ? '' : 'No One to Fire Right Now';
        let options = [
            status,
            '',
            'b. back',
            "q. Exit",
        ];
        return options.join('\n');
    },
    processAnswer: (answer) => {
        switch(answer){
            case 'b': active_menu = EmployeeMenu; break;
            case 'q': process.exit(); break;
            default: console.log(`Option: ${answer} not valid`); break;
        }
        menu();
    }
}

const EmployeeMenu = {
    renderMenu: () => {
        let options = [
            'h. hire employee',
            'f. fire employee',
            'p. promote employee',
            'r. give raise to',
            '',
            'b. back',
            "q. Exit",
        ];
        return options.join('\n');
    },
    processAnswer: (answer) => {
        switch(answer){
            case 'h': active_menu = EmployeeHireMenu; break;
            case 'f': active_menu = EmployeeFireMenu; break;
            case 'b': active_menu = MainMenu; break;
            case 'q': process.exit(); break;
            default: console.log(`Option: ${answer} not valid`); break;
        }
        menu();
    }
}
function menu(){
    render_before_menu();
    console.log(active_menu.renderMenu());
    readline.question("Option: ", active_menu.processAnswer);
}
main()
