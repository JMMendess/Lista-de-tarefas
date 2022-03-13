
let banco = [];

const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));

function atualizarBanco(key) {
    const banco = getBanco();
    banco[key].checked = !banco[key].checked;
    setBanco(banco);
}

function criarItem(tarefa, checked, indice) {
    const item = document.createElement('label');

    const status = checked ? 'checked' : '';

    // if (checked) {
    //     status stringChecked = 'checked'
    // } else {
    //     status stringChecked = ''
    // }

    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice} onchange="atualizarBanco(${indice})">
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
    const banco = getBanco();
    banco.forEach ((item, indice) => criarItem (item.tarefa, item.checked, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter'){
        const banco = getBanco();
        banco.push ({'tarefa': texto, 'checked': false});
        setBanco(banco);
        renderizarTela();
        evento.target.value= '';
    }
}
const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice (indice, 1);
    setBanco(banco);
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