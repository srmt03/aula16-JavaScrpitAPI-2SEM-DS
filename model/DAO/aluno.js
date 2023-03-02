/***************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao com o BD (insert, update, delete e select)
 * Autor: Samuel Matos
 * Data - Criação: 06/10/2022
 * Versão: 1.0
 ***************************************************************************************/

//Funcao para inserir um novo registro no BD
const insertAluno = async function (aluno) {
    try {
        //Importar os dados do banco
        const { PrismaClient } = require('@prisma/client');
    
        //Instancia da classe PrismaClient
        const prisma = new PrismaClient(); 
    
        let sql = `insert into tbl_aluno (nome, 
                                          foto, 
                                          rg, 
                                          cpf, 
                                          email, 
                                          data_nascimento, 
                                          telefone, 
                                          celular, 
                                          sexo)
                                          values(
                                              '${aluno.nome}',
                                              '${aluno.foto}',
                                              '${aluno.rg}',
                                              '${aluno.cpf}',
                                              '${aluno.email}',
                                              '${aluno.data_nascimento}',
                                              '${aluno.telefone}',
                                              '${aluno.celular}',
                                              '${aluno.sexo}'
                                          )`;
        //Executa o script SQL no BD 
        //$executeRawUnsafe permite encaminhar uma variavel contendo o script
        const resultCreate = await prisma.$executeRawUnsafe(sql);
    
        //Verifica se o script foi executado com sucesso no banco de dados 
        if (resultCreate) 
            return true;
        else 
            return false;
        
    } catch (error) {
        return false;
    }
}
//Funcao para atualizar um novo registro no BD
const updateAluno = async function (aluno) {
    try {
        //Importar os dados do banco
        const { PrismaClient } = require('@prisma/client');
    
        //Instancia da classe PrismaClient
        const prisma = new PrismaClient(); 
    
        let sql = `update tbl_aluno set nome            = '${aluno.nome}', 
                                        foto            = '${aluno.foto}', 
                                        rg              = '${aluno.rg}', 
                                        cpf             = '${aluno.cpf}', 
                                        email           = '${aluno.email}', 
                                        data_nascimento = '${aluno.data_nascimento}', 
                                        telefone        = '${aluno.telefone}', 
                                        celular         = '${aluno.celular}', 
                                        sexo            = '${aluno.sexo}'
                            where id = '${aluno.id}'
        `;

        //Executa o script SQL no BD 
        //$executeRawUnsafe permite encaminhar uma variavel contendo o script
        const resultUpdate = await prisma.$executeRawUnsafe(sql);
    
        //Verifica se o script foi executado com sucesso no banco de dados 
        if (resultUpdate) 
            return true;
        else 
            return false;
    } catch (error) {
        return false
    }
}
//Funcao para deletar um novo registro no BD
const deleteAluno = async function (id) {
    try {
        //Importar os dados do banco
        const { PrismaClient } = require('@prisma/client');
    
        //Instancia da classe PrismaClient
        const prisma = new PrismaClient(); 
    
        let sql = `delete from tbl_aluno where id = '${id}'`;

        //Executa o script SQL no BD 
        //$executeRawUnsafe permite encaminhar uma variavel contendo o script
        const resultDelete = await prisma.$executeRawUnsafe(sql);
    
        //Verifica se o script foi executado com sucesso no banco de dados 
        if (resultDelete) 
            return true;
        else 
            return false;
    } catch (error) {
        return false
    }
}
//Funcao para selecionar todos os registros do BD
const selectAllAlunos = async function () {
    const { PrismaClient } = require('@prisma/client')

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //RecordSet = RS//Dados provenientes do BD

    //Criamos um objeto do tipo RecordSet para receber os dados do BD, atraves do script SQL (select)
    const rsAlunos = await prisma.$queryRaw `select cast(id as float) as id, nome, foto, sexo, rg, cpf, email, telefone, celular, data_nascimento from tbl_aluno ORDER BY id DESC`;

    if (rsAlunos.length > 0) 
        return rsAlunos;
    else
        return false;
}
//Funcao para retornar apenas o registro no BD
const selectAlunoById = async function (id) {
    //Import do prismaClient
    const { PrismaClient } = require('@prisma/client')

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    let sql = `select cast(id as float) as id, 
                    nome, 
                    foto, 
                    sexo, 
                    rg, 
                    cpf, 
                    email, 
                    telefone, 
                    celular, 
                    data_nascimento 
                from tbl_aluno 
                where id = ${id}`;

    //RecordSet = RS//Dados provenientes do BD
    //Criamos um objeto do tipo RecordSet para receber os dados do BD, atraves do script SQL (select)
    const rsAluno = await prisma.$queryRawUnsafe(sql);
    if (rsAluno.length > 0) 
        return rsAluno;
    else
        return false;
}
//Funcao para retornar o ultimo id 
const selectLastId = async function () {
    //Import PrismaClient
    const { PrismaClient } = require('@prisma/client');
    //Instancia
    const prisma = new PrismaClient();
    //Script para encontrar/buscar o ultimo registro (id) no banco de dados 
    let sql = `select cast(id as float) as id from tbl_aluno order by id desc limit 1`

    const rsAluno = await prisma.$queryRawUnsafe(sql);
    if (rsAluno) 
        return rsAluno[0].id 
    else 
        return false
}
module.exports = {
    selectAllAlunos,
    insertAluno,
    updateAluno,
    deleteAluno,
    selectAlunoById,
    selectLastId
}
