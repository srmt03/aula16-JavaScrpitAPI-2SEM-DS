/******************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de recebimento, tratamento e retorno de dados entre a API e a model 
 * Autor: Samuel Matos
 * Data - Criação: 06/10/2022
 * Versão: 1.0
 ******************************************************************/

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../module/config.js')

//Funcao para gerar um novo aluno
const createAluno = async function (aluno) {
    //Validacao de campos obrigatorios 
    if (aluno.nome == '' || aluno.nome == undefined 
        || aluno.rg == '' || aluno.rg == undefined
        || aluno.cpf == '' || aluno.cpf == undefined
        || aluno.email == '' || aluno.email == undefined
        || aluno.data_nascimento == '' || aluno.data_nascimento == undefined)
        
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    //Validacao para verificar email valido 
    else if (!aluno.email.includes('@'))
        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL};
    else 
    {
        //Import da model de aluno
        const novoAluno = require('../model/DAO/aluno.js');
        //Import da model de aluno_curso
        const novoAlunoCurso = require('../model/DAO/aluno_curso.js');
        //Chama a funcao para inserir o aluno no BD
        const resultNovoAluno = await novoAluno.insertAluno(aluno);
        if (resultNovoAluno) {
            //Chama a funcao que verifica o id gerado para o novo aluno
            let idNovoAluno = await novoAluno.selectLastId();
            
            if (idNovoAluno > 0) {
                //Cria um obj JSON
                let alunoCurso = {}
                //Retrona o ano corrente
                let anoMatricula = new Date().getFullYear();
                //Cria a matricula do aluno
                let numero_matricula = `${idNovoAluno}${aluno.curso[0].id_curso}${anoMatricula}`
                //Coloca os valores no JSON
                alunoCurso.id_aluno = idNovoAluno
                alunoCurso.id_curso = aluno.curso[0].id_curso
                alunoCurso.matricula = numero_matricula
                alunoCurso.status_aluno = 'Cursando'

                //Chama a funcao para inserir na tabela aluno curso
                const resultNovoAlunoCurso = await novoAlunoCurso.insertAlunoCurso(alunoCurso);

                if (resultNovoAlunoCurso) 
                    return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
                else
                {
                    //Caso ocorra um erro no processo deve ser excluido 
                        //obrigatoriamente devera ser excluido do BD o registro do aluno.
                    await deleteAluno(idNovoAluno);
                    return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
                }
            }
            else
            {
                //Caso ocorra um erro no processo deve ser excluido 
                    //obrigatoriamente devera ser excluido do BD o registro do aluno.
                await deleteAluno(idNovoAluno);
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
            } 
        }
        else
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};    
    }
}
//Funcao para atualizar um registro 
const updateAluno = async function (aluno) {
    //Validacao do Id obrigatorio para identificar o aluno 
    if (aluno.id == '' || aluno.id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    
    //Validacao de campos obrigatorios 
    else if (aluno.nome == '' || aluno.nome == undefined 
        || aluno.rg == '' || aluno.rg == undefined
        || aluno.cpf == '' || aluno.cpf == undefined
        || aluno.email == '' || aluno.email == undefined
        || aluno.data_nascimento == '' || aluno.data_nascimento == undefined)
        
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    //Validacao para verificar email valido 
    else if (!aluno.email.includes('@'))
        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL};
    else 
    {
        //Import da model de aluno
        const { updateAluno } = require('../model/DAO/aluno.js');
        //Chama a funcao para atualizar o aluno no BD
        const atualizarAluno = await updateAluno(aluno);
        if (atualizarAluno) 
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};    
        else
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
    }
}
//Funcao para retornar todos os registros
const readAluno = async function () {
    let dadosAlunosJSON = {};
    // let alunosCursoArray = [];

    const { selectAllAlunos } = require('../model/DAO/aluno.js');
    const { selectAlunoCurso } = require('../model/DAO/aluno_curso.js');
    const dadosAlunos = await selectAllAlunos();

    if (dadosAlunos) 
    {
        const alunosCursoArray = dadosAlunos.map(async itemAluno => {
            //Busca os dados referente ao curso do aluno 
            const dadosAlunosCurso = await selectAlunoCurso(itemAluno.id);

            if (dadosAlunosCurso ) {
                //Acrescenta uma chave curso e coloca os dados do curso do aluno 
                itemAluno.curso = dadosAlunosCurso;

                //Adiciona no array cada elemento contendo dados do aluno e o seu curso 
                // alunosCursoArray.push(itemAluno);      
            }
            else 
                itemAluno.curso = MESSAGE_ERROR.NO_COURSE
            
            return itemAluno;
        });
        // console.log(await Promise.all(alunosCursoArray));
        // dadosAlunosJSON.alunos = dadosAlunos;
        dadosAlunosJSON.alunos = await Promise.all(alunosCursoArray);
        return dadosAlunosJSON;
    }
    else 
        return false;
}
//Funcao para excluir um registro
const deleteAluno = async function (id) {
    //Validacao do Id obrigatorio para identificar o aluno 
    if (id == '' || id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else 
    {
        //Verificar se existe o Id no BD
        const buscarAluno = await buscarAlunoById(id);
        if (buscarAluno) 
        {
            //Import da model de aluno
            const { deleteAluno } = require('../model/DAO/aluno.js');
            //Chama a funcao para atualizar o aluno no BD
            const deletarAluno = await deleteAluno(id);
            if (deletarAluno) 
                return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM};    
            else
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        } 
        else 
        {
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}; 
        }
    }
}
//Funcao para mostrar aluno de acordo com id 
const buscarAlunoById = async function (id) {
    let dadosAlunosJSON = {};
    //Validacao de id como campo obrigatorio 
    if (id == '' || id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else 
    {
        //Importa da model aluno e aluno_curso
        const { selectAlunoById } = require('../model/DAO/aluno.js');
        const { selectAlunoCurso } = require('../model/DAO/aluno_curso.js');
    
        const dadosAluno = await selectAlunoById(id);

        if (dadosAluno) 
        {
            const dadosAlunoCurso = await selectAlunoCurso(id);

            if (dadosAlunoCurso) 
            {
                //Adiciona a chave curso dentro do objeto de dados do aluno e acrescenta os 
                    //dados do curso do aluno
                dadosAluno[0].curso = dadosAlunoCurso;
                //Criamos uma chave alunos no JSON para retornar o array de alunos
                dadosAlunosJSON.aluno = dadosAluno;

                return dadosAlunosJSON;
            }
            else 
            {
                //Criamos uma chave alunos no JSON para retornar o array de alunos
                dadosAlunosJSON.aluno = dadosAluno;
                dadosAlunosJSON.aluno = dadosAlunoCurso;
                
                return dadosAlunosJSON;
            }
        }
        else 
            return false;
    }
}
module.exports = {
    readAluno,
    createAluno,
    updateAluno,
    deleteAluno,
    buscarAlunoById
}
