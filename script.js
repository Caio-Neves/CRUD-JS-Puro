const form = document.getElementById("form")
form.addEventListener('submit', function(){
    
    let storage = (localStorage.ALUNOS) ? JSON.parse(localStorage.ALUNOS) : [];

    // Pegar dados do form
    let nome = document.querySelector('.aluno').value;
    let notas = document.querySelector('.notas').value;

    // Convertendo array de string em números
    let arrayNotas = notas.split(",", 3);
    let notaNum = arrayNotas.map(Number);

    // Calculando média
    let somaNotas = notaNum.reduce((total, elem) => total + elem, 0);
    let media = somaNotas/3

    // Situação do aluno
    let situacao = '';
    if (media >= 6){
        situacao = "Aprovado"
    } else if (media <=5){
        situacao = "Reprovado"
    }

    let aluno = {

        "nome" : nome,
        "notas" : notaNum,
        "media" : media,
        "situacao" : situacao
    }

    let submitButton = document.querySelector('button').value;
    if (!submitButton){
        storage.push(aluno)
    }else{
        let idRegistro = document.querySelector('#idRegistro').value;
        storage[idRegistro] = aluno;
    }

    // Salvar no localStorage
    localStorage.setItem('ALUNOS', JSON.stringify(storage));
    
    // Limpar o form
    form.reset();
    listarDados();
    document.querySelector('button').value = '';

});

// READ
function listarDados(){
    if(localStorage.ALUNOS){

        let dados = (localStorage.ALUNOS) ? JSON.parse(localStorage.ALUNOS) : [];
        let estrutura = '';

        for (const i in dados) {
            estrutura += `
            <tr>
            <th>${dados[i].nome}</th>
            <th>${dados[i].notas}</th>
            <th>${dados[i].media}</th>
            <th>${dados[i].situacao}</th>
            <td><a href="#" onClick="editById(${i})">Edit</a></td>
            <td><a href="#" onClick="deleteById(${i})">Delete</a></td>
            </tr>
            `;
        }

        document.querySelector('table tbody').innerHTML = estrutura;
    }else{
        let estrutura = `
        <tr>
            <td colspan="7" align="center">Nenhum aluno cadastrado</td>
        </tr>
        `;
        document.querySelector("table tbody").innerHTML = estrutura;
    }
}

// DELETE
function deleteById(id){
    let dados = (localStorage.ALUNOS) ? JSON.parse(localStorage.ALUNOS) : [];

    dados.splice(id, 1);
    if(dados.length > 0){
        localStorage.setItem('ALUNOS', JSON.stringify(dados));
        listarDados()
    }else{
        localStorage.setItem('ALUNOS', "");
    }

    listarDados();
    return false;
}

// EDIT
function editById(id){
    let dados = (localStorage.ALUNOS) ? JSON.parse(localStorage.ALUNOS) : [];

    let alunoSelecionado = dados[id];

    document.querySelector('.aluno').value = alunoSelecionado.nome;
    document.querySelector('.notas').value = alunoSelecionado.notas;

    document.querySelector('button').value = "editar";
    document.querySelector('#idRegistro').value = id;

}
listarDados();
