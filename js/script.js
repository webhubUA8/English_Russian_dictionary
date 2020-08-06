const form = document.querySelector('.row-form');
const tableBox = document.querySelector('.table-box');
const englishWord = document.querySelector('.english-word');
const russianWord = document.querySelector('.russian-word');
const allWords = {};

const allBtnRemove = document.querySelectorAll('.remove-word');

// const table = document.createElement('table');
// const thead = document.createElement('thead');
// const tbody = document.createElement('tbody');

const tableThName = ['Английское слово', 'Русское слово', ''];

form.addEventListener('submit', addWord);

function addWord(e) {
    e.preventDefault();

    if (englishWord.value === '' || russianWord.value === '') {
        alert('Заполните все поля!');
        return;
    }
    const englishWordValue = englishWord.value;
    const russianWordValue = russianWord.value;
    // const oneWord = [englishWordValue, russianWordValue];
    allWords[englishWordValue] = [englishWordValue, russianWordValue];
    console.log(allWords);
    const locStor = JSON.parse(localStorage.getItem('allwords'));
    if (!locStor) {
        return;
    }
    locStor[englishWordValue] = [englishWordValue, russianWordValue];
    console.log(locStor);
    localStorage.setItem('allwords', JSON.stringify(locStor));

    renderTable();
    englishWord.value = '';
    russianWord.value = '';

    
}


function readLocalStorage() {
    const locStor = JSON.parse(localStorage.getItem('allwords'));

    console.log(locStor);
    return locStor;
}

loadDoc();

function emprtySpisok() {
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.textContent = 'Список пуст!';

    div.appendChild(h2);
    tableBox.appendChild(div);
}

console.log(localStorage.length);

function loadDoc() {
    if (!localStorage.length) {
        emprtySpisok();
        return;
    }
    renderTable();
}

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

function renderTbody(arr) {
    const tbody = document.createElement('tbody');

    for (let key in arr) {
        const tr = document.createElement('tr');
        arr[key].forEach(line => {
            const td = document.createElement('td');
            td.textContent = line;
            td.style.fontWeight = 'bold';
            td.style.color = '#616161 ';
            console.log(line);
            tr.appendChild(td);
        })
        const td = document.createElement('td');
        const btn = createBtnRemove();
        // let img = document.querySelector('.img-remove');
        let img = btn.children[0];
        
        img.setAttribute('data-btn-remove', key);
        console.log(img);
        td.appendChild(btn);
        tr.appendChild(td);

        tbody.appendChild(tr);
        console.log(tbody);
    }
    // console.log(oneLine);

    return tbody;
}

function createBtnRemove() {
    const btn = document.createElement('button');
    btn.classList.add('remove-word');
    btn.innerHTML = '<img class="img-remove" src="./img/remove.png" alt="remove">';

    return btn;
}

function removeLineWord() {
    
}

tableBox.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target.classList.contains('img-remove')) {
        const dataAtr = e.target.getAttribute('data-btn-remove');
        console.log(dataAtr);
    }
})