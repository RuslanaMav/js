// Условный оператор 
let a = 18;
let b = 6;
console.log(a > b ? a : b) // 18

// Оператор нулевого слияния и присваивания
a = null;
b = 5;
console.log(a ?? b) // 5
a ??= b
console.log(a) // 5
a = 10;
console.log(a ?? b) // 10
a ??= b
console.log(a) // 10


/*  Примитивные типы данных: number, string, bigint, boolean, null, undefined, symbol
    typeof obj - вывести тип данных
    Преобразование типов:
      String(value)
      Number(value)
      Boolean(value): false - "", 0, null, undefined, NaN
*/




