
let banco = [
    {'tarefa': 'estudar JS', 'checked': false},
    {'tarefa': 'netflix', 'checked': true},
];

function atualizarBanco(key) {
    banco[key].checked = !banco[key].checked;
}

function criarItem(tarefa, checked, indice, key) {
    const item = document.createElement('label');

    const status = checked ? 'checked' : '';

    // if (checked) {
    //     status stringChecked = 'checked'
    // } else {
    //     status stringChecked = ''
    // }

    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice} onchange="atualizarBanco(${key})">
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `;
    document.getElementById('todoList').appendChild(item);
}
const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}
const renderizarTela = () => {
    limparTarefas();
    banco.forEach ((item, indice, key) => criarItem (item.tarefa, item.checked, indice,  key));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter'){
        banco.push ({'tarefa': texto, 'checked': false});
        renderizarTela();
        evento.target.value= '';
    }
}
const removerItem = (indice) => {
    banco.splice (indice, 1);
    renderizarTela();
    
}

const atualizarItem = (indice) => {
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    renderizarTela();
}
const clickItem = (evento) => {
    const elemento = evento.target;
    console.log(elemento);
    if (elemento.type ==='button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);

    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;

    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);


renderizarTela();