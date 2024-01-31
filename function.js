/*  ...остаточные параметры, оператор расширения
    arguments - все аргументы функции, массив

    Свойства функции:
      .name
      .length - количество параметров
    имя_функции.имя_свойства = значение - собственное свойство 

*/

function functionDeclaration() { console.log("Function Declaration"); }

let functionExpression = function () { console.log("Function Expression"); };

let arrowFunction = () => console.log("Arrow Function"); // не имеют this, arguments

let newFunction = new Function('console.log("New Function Syntax")');

functionDeclaration();
functionExpression();
arrowFunction();
newFunction();
functionDeclaration.count = 2
console.log(functionDeclaration.name, functionDeclaration.length, functionDeclaration.count)
// functionDeclaration 0 2

// Замыкание
function closure(a) {
    let count = 5;
    function inner() { console.log(count + a); } // 6
    inner();
}
closure(1);

// Декоратор 
function general(a, b) { return a + b; }

function decorator(func) {
    return function (x, y) {
        if (x + y < 10) console.log(func(x, y));
        else console.log(100)
    }
}

general = decorator(general);
general(1, 2); // 3
general(10, 4); // 100

/* Передача контекста call, apply, bind - явно задает this
   call - принимает аргументы в виде списка 
   apply - принимает аргументы в виде псевдомассива
   bind - возвращает функцию */
let user = { name: "John" };
let user1 = { name: "Maria" };

function callFunction(phrase, separator) {
    console.log(`${this.name} ${phrase}${separator}`);
}

callFunction.call(user, "Hello", "!"); //John Hello!
callFunction.call(user1, "Hi", "."); // Maria Hi.

function applyFunction(number) {
    console.log(Math.min(number), this.name)
}
applyFunction.apply(user, [-1, 2, 3]); // -1 John

let bindFunction = applyFunction.bind(user1, -2, 3, 4); // -2 Maria
bindFunction();

/* Генераторы
    .next() - запускает выполнение до ближайшей инструкции yield <значение>
    По достижении yield выполнение функции приостанавливается, а значение возвращается
    yield запоминается и следующий next доходит до следующего yield
    Результатом next() - объект:
       value: значение из yield
       done: true, если выполнение функции завершено, иначе false
*/ 
function* generatorFunction() {
    yield 100;
    yield 200;
    return 300; }
let generator = generatorFunction(); // создание объекта-генератора
console.log(generator.next()); // {value: 100, done: false}
console.log(generator.next().value); // 200
console.log(generator.next().done); // true
console.log(generator.next()); // {value: undefined, done: true}


// Перебор генераторов
function* generatorFunction2() {
    yield 102;
    yield 202;
    return 302; }
let generator2 = generatorFunction2();
for(let value of generator2) { console.log(value); } // 102,202

// Перебор массива
function* generatorFunction3(number) {
    for (let i = 0; i <= number.length; i++) yield number[i];
}

let generator3 = generatorFunction3([10, 20, 30]);
console.log(generator3.next().value); // 10
console.log(generator3.next().value); // 20
console.log(generator3.next().value); // 30

// Самовызывающаяся функция 

(function(a){
    console.log(a + 10);
})(15); // 25