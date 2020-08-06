const form = document.querySelector('.row-form');
const tableBox = document.querySelector('.table-box');
const englishWord = document.querySelector('.english-word');
const russianWord = document.querySelector('.russian-word');


const table = document.createElement('table');
const thead = document.createElement('thead');
const tbody = document.createElement('tbody');
// let allWords = [];
const tableThName = ['Английское слово', 'Русское слово', ''];
console.log(tableBox);
// console.log(tableBox.contains(table));
console.log(form);
// console.log(form['action']);

form.addEventListener('submit', addWord);
    // renderTrWord();;
// renderTable();



function addWord(e) {
    e.preventDefault();
    if (!tableBox.contains(table)) renderTable();
    // renderTrWord();
    
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

    renderTrWord();
    englishWord.value = '';
    russianWord.value = '';
}

function renderTable() {
    tableBox.innerHTML = '';
    const fragment = document.createDocumentFragment();
    
    table.classList.add('striped', 'centered');

    // const thead = document.createElement('thead');
    

    const tr = document.createElement('tr');
    
    tableThName.forEach(elem => {
        const th = document.createElement('th');
        th.textContent = elem;
        tr.appendChild(th);
    })

    thead.appendChild(tr);
    table.appendChild(thead);

    fragment.appendChild(table);
    console.log(table);
    tableBox.insertAdjacentElement('afterbegin', table);
    // console.log(tableBox.contains(table));
}

renderTable();
renderTrWord();

const removeBtn = [...document.querySelectorAll('.remove-word')];

removeBtn.forEach(btn => {
    // console.log(btn);
    btn.addEventListener('click', () => {
        // console.log(btn);
        const dataBtn = btn.getAttribute('data-btn-remove');
        deleteLineWord(dataBtn);
    });
})

function renderTrWord() {
    // addWord();.\
    for (let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
            continue;
        }
        let lineWord = JSON.parse(localStorage.getItem(key));
        console.log(lineWord);

        if (lineWord[0] != '') {
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
        }
    }
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
    renderTrWord();
}

function createBtnRemoveWord() {
    const button = document.createElement('button');
    button.classList.add('remove-word');
    button.innerHTML = '<img src="./img/remove.png" alt="remove">';
    return button;
}


console.log(localStorage);

// localStorage.clear();
