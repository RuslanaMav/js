console.log('CLASS PROTOTYPE')


/* Классы
    get() - получает значение свойства
    set() - устаналивает значение свойства 
    extends - наследование класса
    super(val) - вызов родительского конструктора
    super.имя_метода - вызов родительского метода
    # - приватное свойство, метод. Не наследуются
    static - статические свойства/ методы (самого класса). Наследуются
    имя_объект instance of имя_класса - проверка принадлеежности к классу (true/ false)
    можно наследовать встроенные классы
*/

class MyClass {
    static lengthClass = 100;
    #sum = 5; // Приватное свойство
    count = 10; // Свойство экземляра

    constructor(name, age) {
        this.name = name;
        this.age = age;  
    }

    show(message) { 
        console.log(`${message} ${this.name}`); 
    }

    showCount (){
        this.count++;
        return this.count;
    }

    #calcSum() { // Приватный метод
        this.#sum += 5; 
        return this.#sum;
    }

    showSum(number) {
        return this.#calcSum() + number;
    }

}

class MyClass2 extends MyClass {
    constructor(name, lastName, age) {
        super(name, age); // Вызов родительского конструктора
        this.lastName = lastName;
    }

    get fullName(){
        return `${this.lastName} ${this.name}`
    }

    set fullName(fullName) {
        const [name, lastName] = fullName.split(' ');
        this.name = name;
        this.lastName = lastName;
    }

    showGreeatingAndBye(message) {
        super.show(message); // Вызов родительского метода
        return `Bye ${this.name}!`;
    }

    show() { 
        return 'Hello!'; // Переопределение родительского метода
    } 
}

let user = new MyClass('Anna', 30);
user.show("Hi"); // Hi Anna
user.age = 35;
console.log(user.age); // 35

let user2 = new MyClass2('Maria', 'Petrova', 20);
console.log(user2.fullName); // Petrova Maria
user2.fullName = 'Alena Ivanova';
console.log(user2.fullName); // Ivanova Alena
console.log(user2.showGreeatingAndBye("Hi"));// Hi Alena \n Bye Alena!
console.log(user2.show()); // Hello

console.log(user.count) // 10
console.log(user2.count) // 10

console.log(user.showCount()); // 11
console.log(user2.showCount()); // 11

console.log(user.showSum(10)); // 20
console.log(user2.showSum(10)); // 20

console.log(MyClass.lengthClass); // 100
console.log(MyClass2.lengthClass); // 100



/* Прототипы
   имя_объекта.__proto__ = имя_прототипа - установка прототипа. Объект будет иметь все свойства, методы прототипа
   имя_функции-конструктора.prototype = имя_прототипа - если объект объявлен через функцию-конструктор
   this - сам объект
   при записи свойства (которое есть в прототипе) оно не изменяет прототип
   for ... in - выводит все свойства, в том числе и из прототипа
   фильтрация свойств через obj.hasOwnProperty(key)
   имя_объекта.__proto__ - вывод прототипа
   String.prototype.имя_свойства - измнение встроенного прототипа

   Методы прототипов:
       Object.create(proto, [descriptors]) – создаёт пустой объект со свойством [[Prototype]], указанным как proto, и необязательными дескрипторами свойств descriptors
       Object.getPrototypeOf(obj) – возвращает свойство [[Prototype]] объекта
       Object.setPrototypeOf(obj, proto) – устанавливает свойство [[Prototype]] объекта obj как proto
*/

let animal = { type: 'rabbit' }
let rabbit = { color: 'white' }
rabbit.__proto__ = animal;
console.log(rabbit.type);

for(let prop in rabbit) console.log(prop); // color, type

let animal2 = { eats: true };
function Dog(name) { this.name = name; }
Dog.prototype = animal2;
let dog = new Dog('Sharik');
console.log(dog.eats); // true

for(let prop in dog) {
    if (dog.hasOwnProperty(prop)) 
      console.log(prop); // name
}

console.log(rabbit.__proto__) // вывод прототипа 

String.prototype.count = 5;
// Добавление свойства встроенному прототипу
console.log('Hey'.count); // 5

let r = Object.create(rabbit);
console.log(r); // {}
console.log(Object.getPrototypeOf(r)); // { color: 'white' }
Object.setPrototypeOf(r, animal);
console.log(Object.getPrototypeOf(r)); // { type: 'rabbit' }
