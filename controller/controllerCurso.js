/******************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de recebimento, tratamento e retorno de dados entre a API e a model 
 * Autor: Samuel Matos
 * Data - Criação: 27/10/2022
 * Versão: 1.0
 ******************************************************************/

//Import das mensagens configuradas 
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../module/config.js');

//Funcao para cadastrar um novo curso
const createCurso = async function (curso) {
    //Validacao de campos obrigatorios 
    if (curso.nome == '' || curso.nome == undefined 
        || curso.carga_horaria == '' || curso.carga_horaria == undefined)

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    else 
    {
        //Import da model de aluno
        const { insertCurso } = require('../model/DAO/curso.js');
        //Chama a funcao para inserir o aluno no BD
        const novoCurso = await insertCurso(curso);
        if (novoCurso) 
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};    
        else
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
    }
}
//Funcao para atualizar o registro
const updateCurso = async function (curso) {
    //Validacao de campos obrigatorios 
    if (curso.nome == '' || curso.nome == undefined || curso.carga_horaria == '' || curso.carga_horaria == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    else 
    {
        //Import da model de aluno
        const { updateCurso } = require('../model/DAO/curso.js');
        //Chama a funcao para inserir o aluno no BD
        const atualizarCurso = await updateCurso(curso);
        if (atualizarCurso) 
            return {status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM};    
        else
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
    }
}
//Funcao para retornar todos os registros
const readCursos = async function () {
    let dadosCursosJSON = {};
    const { selectAllCursos } = require('../model/DAO/curso.js');

    const dadosCursos = await selectAllCursos();

    if (dadosCursos) 
    {
        //Conversao do tipo de dados BigInt para Int (?????????????)
        // dadosAlunos.forEach(element => {
        // element.id = Number(element.id);
        // });


        //Criamos uma chave cursos no JSON para retornar o array de cursos
        dadosCursosJSON.cursos = dadosCursos;
        return dadosCursosJSON;
    }
    else 
        return false;
}
//Funcao para deletar um curso do BD
const deleteCurso = async function (id) {
    //Validacao do Id obrigatorio para identificar o curso
    if (id == '' || id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else 
    {
        //Verificar se existe o Id no BD
        const buscarCurso = await buscarCursoById(id);
        if (buscarCurso) 
        {
            //Import da model de aluno
            const { deleteCurso } = require('../model/DAO/curso.js');
            //Chama a funcao para atualizar o aluno no BD
            const deletarCurso = await deleteCurso(id);
            if (deletarCurso) 
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
//Funcao para selecionar um curso pelo Id
const buscarCursoById = async function (id) {
    let dadosCursoJSON = {};
    //Validacao de id como campo obrigatorio 
    if (id == '' || id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else 
    {
        const { selectCursoById } = require('../model/DAO/curso.js');
    
        const dadosCurso = await selectCursoById(id);
    
        if (dadosCurso) 
        {
            //Conversao do tipo de dados BigInt para Int (?????????????)
            // dadosAlunos.forEach(element => {
            // element.id = Number(element.id);
            // });


            //Criamos uma chave alunos no JSON para retornar o array de alunos
            dadosCursoJSON.curso = dadosCurso;
            return dadosCursoJSON;
        }
        else 
            return false;
    }
}
module.exports = {
    readCursos,
    createCurso,
    updateCurso,
    deleteCurso,
    buscarCursoById
}