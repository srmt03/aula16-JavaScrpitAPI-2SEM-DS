/***************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao com o BD (insert, update, delete e select) CRUD
 * Autor: Samuel Matos
 * Data - Criação: 27/10/2022
 * Versão: 1.0
 ***************************************************************************************/
//Funcao para inserir um novo curso no BD 
const insertCurso = async function (curso) {
    try {
        //Importar os dados do banco
        const { PrismaClient } = require('@prisma/client');
    
        //Instancia da classe PrismaClient
        const prisma = new PrismaClient(); 
    
        let sql = `insert into tbl_curso (nome, 
                                          icone, 
                                          sigla,
                                          carga_horaria)
                                          values(
                                              '${curso.nome}',
                                              '${curso.icone}',
                                              '${curso.sigla}',
                                               ${curso.carga_horaria}
        );`;
        //Executa o script SQL no BD 
        //$executeRawUnsafe permite encaminhar uma variavel contendo o script
        const resultCreate = await prisma.$executeRawUnsafe(sql);
        //Verifica se o script foi executado com sucesso no banco de dados 
        if (resultCreate) 
            return true
        else 
            return false

    } catch (error) {
        return false;
    }
}
//Funcao para atualizar um novo registro no BD
const updateCurso = async function (curso) {
    try {
        //Importar os dados do banco
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe do PrismaClient
        const prisma = new PrismaClient();

        let sql = `update tbl_curso set nome            = '${curso.nome}', 
                                        icone           = '${curso.icone}', 
                                        sigla           = '${curso.sigla}', 
                                        carga_horaria   = '${curso.carga_horaria}' 
                            where id = '${curso.id}'
        `;

        //Executa o script SQL no BD
        const resultUpdate = await prisma.$executeRawUnsafe(sql);

        //Verifica se o script foi executado
        if (resultUpdate)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}
//Funcao para deletar um novo registro no BD
const deleteCurso = async function (id) {
    try {
        //Importar os dados do banco
        const { PrismaClient } = require('@prisma/client');
    
        //Instancia da classe PrismaClient
        const prisma = new PrismaClient(); 
    
        let sql = `delete from tbl_curso where id = '${id}'`;

        //Executa o script SQL no BD 
        const resultDelete = await prisma.$executeRawUnsafe(sql);
    
        //Verifica se o script foi executado com sucesso no banco de dados 
        if (resultDelete) 
            return true
        else 
            return false
    
    } catch (error) {
        return false
    }
}
//Funcao para selecionar todos os registros do BD
const selectAllCursos = async function () {
    //Import do Prisma
    const { PrismaClient } = require('@prisma/client')

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet para receber os dados do BD, atraves do script SQL (select)
    const rsCursos = await prisma.$queryRaw `select cast(id as float) as id, nome, icone, sigla, carga_horaria from tbl_curso ORDER BY id DESC`;

    if (rsCursos.length > 0) 
        return rsCursos;
    else
        return false;
}
//Funcao para selecionar cursos pelo Id
const selectCursoById = async function (id) {
    //Import do Prisma 
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe 
    const prisma = new PrismaClient();

    const rsCursos = await prisma.$queryRaw `select cast(id as float) as id, 
                                                                        nome, 
                                                                        icone, 
                                                                        sigla, 
                                                                        carga_horaria
                                                                        from tbl_curso where id = ${id}`;

    if (rsCursos.length > 0)
        return rsCursos
    else
        return false
}

module.exports = {
    selectAllCursos,
    insertCurso,
    updateCurso,
    deleteCurso,
    selectCursoById
}