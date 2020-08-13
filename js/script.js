const form = document.querySelector('.row-form');
const tableBox = document.querySelector('.table-box');
const englishWord = document.querySelector('.english-word');
const russianWord = document.querySelector('.russian-word');
const allWords = {};

const allBtnRemove = document.querySelectorAll('.remove-word');
const removeAllBtn = document.querySelector('.remove-all');

const tableThName = ['Английское слово', 'Русское слово', ''];

form.addEventListener('submit', addWord);

// Вызов функции очистки localStorage
removeAllBtn.addEventListener('click', removeAll);

// Записываем новые данные в localSorage и обновление таблицы
function addWord(e) {
    e.preventDefault();
    
    console.log('helllo');
    if (englishWord.value === '' || russianWord.value === '') {
        alert('Заполните все поля!');
        return;
    }
    const englishWordValue = englishWord.value;
    const russianWordValue = russianWord.value;
    // console.log(englishWordValue, russianWordValue);
    // const oneWord = [englishWordValue, russianWordValue];
    allWords[englishWordValue] = [englishWordValue, russianWordValue];
    // localStorage.setItem('allwords', JSON.stringify(allWords));
    console.log(allWords);
    let locStor = readLocalStorage();
    // let locStor = JSON.parse(localStorage.getItem('allwords'));
    if (!locStor) {
        localStorage.setItem('allwords', JSON.stringify(allWords));
        locStor = readLocalStorage();
    }
    console.log(locStor);
    locStor[englishWordValue] = [englishWordValue, russianWordValue];
    console.log(locStor);
    localStorage.setItem('allwords', JSON.stringify(locStor));
    console.log(readLocalStorage());
    renderTable();
    englishWord.value = '';
    russianWord.value = '';
    loadDoc();
}

// Создание объекта с данных localStorage
function readLocalStorage() {
    const locStor = JSON.parse(localStorage.getItem('allwords'));
    return locStor;
}

loadDoc();

// Создание заголовка "Список пуст"
function emprtySpisok() {
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.textContent = 'Список пуст!';

    div.appendChild(h2);
    tableBox.appendChild(div);
}

// Проверка localSorage на пустоту и вывод заголовка"Список пуст" или таблицы
function loadDoc() {
    let locStor = readLocalStorage();
    // console.log(locStor);
    // if (!localStorage.length) {
    // console.log(Object.keys(locStor));
    // console.log(Object.keys(locStor).length);
    if (locStor === null || Object.keys(locStor).length == 0) {
        tableBox.innerHTML = '';
        console.log(!localStorage.length);
        emprtySpisok();
        return;
    }
    renderTable();
}

// Создание таблицы
function renderTable() {
    tableBox.innerHTML = '';
    const table = document.createElement('table');
    table.classList.add('striped', 'centered');

    const thead = renderThead(tableThName);
    const tbody = renderTbody(readLocalStorage());

    table.appendChild(thead);
    table.appendChild(tbody);
    tableBox.appendChild(table);
}

// Создание шапки таблицы
function renderThead(arr) {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    arr.forEach(el => {
        const th = document.createElement('th');
        th.textContent = el;
        th.style.fontSize = 24 + 'px';
        th.style.color = '#00897b  ';

        tr.appendChild(th);
    })
    thead.appendChild(tr);

    return thead;
}

// Создание тела таблицы
function renderTbody(arr) {
    const tbody = document.createElement('tbody');

    for (let key in arr) {
        const tr = document.createElement('tr');
        arr[key].forEach(line => {
            const td = document.createElement('td');
            td.textContent = line;
            td.style.fontWeight = 'bold';
            td.style.color = '#616161 ';
            tr.appendChild(td);
        })
        const td = document.createElement('td');
        const btn = createBtnRemove();
        let img = btn.children[0];
        
        img.setAttribute('data-btn-remove', key);
        td.appendChild(btn);
        tr.appendChild(td);

        // tbody.appendChild(tr);
        tbody.insertAdjacentElement('afterbegin', tr);
    }
    return tbody;
}

// Создание кнопки удаление слова
function createBtnRemove() {
    const btn = document.createElement('button');
    btn.classList.add('remove-word');
    btn.innerHTML = '<img class="img-remove" src="./img/remove.png" alt="remove">';

    return btn;
}

// Удаление одного слова
function removeLineWord(data) {
    const store = readLocalStorage();
    
    for (let key in store) {
        if (key == data) {
            delete store[data];
            localStorage.setItem('allwords', JSON.stringify(store));
            console.log(Object.keys(store).length);
            if (Object.keys(store).length == 0) {
                loadDoc();
            }
            // renderTable();
        }
    }
    
}

// Вызов функции удаление слова
tableBox.addEventListener('click', (e) => {
    if (e.target.classList.contains('img-remove')) {
        const dataAtr = e.target.getAttribute('data-btn-remove');
        removeLineWord(dataAtr);
        loadDoc();
    }
})

// Очистка localStorage
function removeAll() {
    let locStor = readLocalStorage();
    if (locStor === null || Object.keys(locStor).length == 0) {
        alert('Нет объетов для удаления. Добавьте слова в список!');
        return;
    }
    if (!confirm("Вы действительно хотите удалить Фсё???")) return;
    localStorage.clear();
    console.log(!localStorage.length);
    loadDoc();
    // renderTable();
}