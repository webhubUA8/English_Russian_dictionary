const form = document.querySelector('.row-form');
const tableBox = document.querySelector('.table-box');
const englishWord = document.querySelector('.english-word');
const russianWord = document.querySelector('.russian-word');

const table = document.createElement('table');
const thead = document.createElement('thead');
// const tbody = document.createElement('tbody');

const tableThName = ['Английское слово', 'Русское слово', ''];

console.log(localStorage.length);

// 
loadTable();
form.addEventListener('submit', addWord);


// Functions

function emptySpisok() {
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.textContent = 'Список пуст';
    div.appendChild(h2);

    tableBox.appendChild(div);
}

function loadTable() {
    if (!localStorage.length) {
        console.log('nooooo');
        emptySpisok();
        return;
    }

    if (!tableBox.contains(table)) renderTable();
    // renderTable();
}

function addWord(e) {
    e.preventDefault();
    
    // loadTable();

    if (englishWord.value === '' || russianWord.value === '') {
        alert('Заполните все поля!');
        return;
    }
    const englishWordValue = englishWord.value;
    const russianWordValue = russianWord.value;
    const oneWord = [englishWordValue, russianWordValue];
    // allWords.push(oneWord);
    console.log(oneWord);
    localStorage.setItem(englishWordValue, JSON.stringify(oneWord));

    renderTable();
    // renderTrWord();
    // loadTable();
    englishWord.value = '';
    russianWord.value = '';
}

function renderTable() {
    tableBox.innerHTML = '';
    const fragment = document.createDocumentFragment();
    
    table.classList.add('striped', 'centered');

    const tr = document.createElement('tr');
    
    tableThName.forEach(elem => {
        const th = document.createElement('th');
        th.textContent = elem;
        tr.appendChild(th);
    })

    thead.appendChild(tr);

    // const tbody = renderTrWord();

    table.appendChild(thead);
    // table.appendChild(tbody);

    fragment.appendChild(table);
    console.log(table);

    tableBox.innerHTML = '';
    tableBox.insertAdjacentElement('afterbegin', table);
    // console.log(tableBox.contains(table));

    renderTrWord();
}

function renderTrWord() {

    const removeBtn = [...document.querySelectorAll('.remove-word')];
    const tbody = document.createElement('tbody');

    removeBtn.forEach(btn => {
        // console.log(btn);
        btn.addEventListener('click', () => {
            // console.log(btn);
            const dataBtn = btn.getAttribute('data-btn-remove');
            deleteLineWord(dataBtn);
        });
    })

    function createBtnRemoveWord() {
        const button = document.createElement('button');
        button.classList.add('remove-word');
        button.innerHTML = '<img src="./img/remove.png" alt="remove">';
        return button;
    }

    // addWord();.\
    for (let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
            continue;
        }
        let lineWord = JSON.parse(localStorage.getItem(key));
        console.log(lineWord);

        // if (lineWord[0] != '') {
            const tr = document.createElement('tr');
            
            lineWord.forEach(word => {
                const td = document.createElement('td');
                console.log(word);
                td.innerHTML = word;
                
                tr.appendChild(td);
            })
            const btn = createBtnRemoveWord();
            btn.setAttribute('data-btn-remove', key);

            const td = document.createElement('td');
            td.appendChild(btn);
            tr.appendChild(td);
            console.log(btn);
            tbody.appendChild(tr);
        // }
    }

    // return tbody;
    table.appendChild(tbody);
    // const lineWord = JSON.parse(localStorage())
}

function deleteLineWord(dataBtn) {
    for (let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
            continue;
        }
        if (dataBtn === key) {
            console.log('yesss');
            localStorage.removeItem(dataBtn);
        }
    }
    // renderTrWord();
}

// renderTable();