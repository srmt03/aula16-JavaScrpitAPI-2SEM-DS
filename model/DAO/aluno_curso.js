/******************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de dados com o BD
 * Autor: Samuel Matos
 * Data - Criação: 03/11/2022
 * Versão: 1.0
 ******************************************************************/

//Funcao para inserir um novo registro no BD 
const insertAlunoCurso  = async function (alunoCurso) {
    try {
        //Import do PrismaClient
        const { PrismaClient } = require('@prisma/client');
        //Instancia
        const prisma = new PrismaClient();

        let sql = `insert into tbl_aluno_curso (id_aluno,
                                               id_curso,
                                               matricula,
                                               status_aluno)
                                        values ('${alunoCurso.id_aluno}',
                                                '${alunoCurso.id_curso}',
                                                '${alunoCurso.matricula}',
                                                '${alunoCurso.status_aluno}'
        )`;
        
        //Executa o script
        const resultInsert = await prisma.$executeRawUnsafe(sql);

        //Verifica a execucao
        if (resultInsert)
            return true
        else 
            return false

    } catch (error) {
        return false
    }
}
//Funcao para buscar os dados de um curso referente a um aluno
const selectAlunoCurso = async function (idAluno) {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    let sql = `select cast(tbl_curso.id as float) as id_curso,
                        tbl_curso.nome as nome_curso, 
                        tbl_curso.sigla as sigla_curso, 
                        tbl_curso.carga_horaria,
    
                        tbl_aluno_curso.matricula, 
                        tbl_aluno_curso.status_aluno
                from tbl_aluno
                    inner join tbl_aluno_curso
                        on tbl_aluno.id = tbl_aluno_curso.id_aluno
                    inner join tbl_curso
                        on tbl_curso.id = tbl_aluno_curso.id_curso
                where tbl_aluno.id = ${idAluno};`

    const rsAlunoCurso = await prisma.$queryRawUnsafe(sql);
    if (rsAlunoCurso.length > 0)
        return rsAlunoCurso
    else 
        return false
}

module.exports = {
    insertAlunoCurso,
    selectAlunoCurso
}