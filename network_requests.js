let urlPost = 'https://jsonplaceholder.typicode.com/posts';

function sendPostFetchPromise(url, body) {
    /* fetch(url, [options]) - промис
    Методы response (ответа):
       .text() 
       .json() 
       .formData() 
    Свойства:
       .ok - true/false
       .status - код состояния
    */

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(body), 
        // преобразование объекта в json
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
        // указывается тип body - формат json
    })
        .then((response) => response.json()) 
        // преобразование в json
        .then((response) => console.log(response));
}


async function sendPostFetchAsync(url, body) {
    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });
    let responseJson = await response.text(); 
    // преобразование в строку
    console.log(responseJson);
}

sendPostFetchPromise(urlPost, { id: 1, name: 'Anna', age: 30 });
sendPostFetchAsync(urlPost, { id: 2, name: 'Maria', age: 32 });


function sendPostXMLPromise(url, body) {
    /*
    Свойства: 
       .status - код состояния
       .statusText - сообщение о состоянии
       .response - тело ответа
       .readyState - текущее состояние запроса 

       .timeout = n - устаналивает время ожидания ответа 
       .responseType = type - устаналивает тип ответа 
    События:
       .onload - получен какой-либо ответ 
       .onerror - когда запрос не может быть выполнен
       .progress - сообщает о прогрессе на стадии загрузки ответа от сервера:
           - event.loaded - количество загруженных байт
           - event.lengthComputable - равно true, если сервер присылает заголовок Content-Length
           - event.total - количество байт всего
        .onreadystatechange - текущее состояние запроса
        .abort - завершить запрос
        .upload - отслеживание событий отправки:
            .onloadstart – начало загрузки данных
            .onprogress – генерируется периодически во время отправки на сервер
            .onabort – загрузка прервана
            .onerror – ошибка, не связанная с HTTP
            .onload – загрузка успешно завершена
            .ontimeout – вышло время, отведённое на загрузку (при установленном свойстве timeout)
            .onloadend – загрузка завершена, вне зависимости от того, как – успешно или нет.
    Заголовки:
        .setRequestHeader(name, value) - устанавливает заголовок запроса с именем name и значением value
        .getResponseHeader(name) - возвращает значение заголовка ответа name (кроме Set-Cookie и Set-Cookie2)
        .getAllResponseHeaders() - возвращает все заголовки ответа, кроме Set-Cookie и Set-Cookie2
    */
    new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest(); // создание запроса 
        xhr.open('POST', urlPost, true); 
        // инициализация запроса 
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        // устаналивает тип body
        xhr.responseType = 'json';
        // устаналивает ожидаемый тип ответа   
        xhr.send(JSON.stringify(body));
        // отправка запроса
        xhr.onload = () => resolve(xhr.response);
        // получен ответ 
    })
        .then(res => console.log(res));
}

async function sendPostXMLAsync(url, body) {
    let promise = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', urlPost, true); 
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.responseType = 'text';
        xhr.send(JSON.stringify(body));
        xhr.onload = () => resolve(xhr.response);
    });
    let response = await promise;
    console.log(response);
}

sendPostXMLPromise(urlPost, { id: 3, name: 'Ben', age: 31 });
sendPostXMLAsync(urlPost, { id: 4, name: 'Mark', age: 33 });



