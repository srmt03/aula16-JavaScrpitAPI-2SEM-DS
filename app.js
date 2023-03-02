/***************************************************************************
 * Objetivo: API responsavel pela manipulacao de dados o back-end (GET, POST, PUT, DELETE)
 * Autor: Samuel Matos
 * Data Criacao: 10/10/2022
 * Versao: 1.0
 * 
 * Anotacoes: Para manipular o acesso ao banco de dados (BD) podemos utilizar o prisma e 
 * para isso devemos rodas os seguintes comandos em ordem! 
 * //npm install prisma --save
   //npx prisma
   //npx prisma init
   //npm instal @prisma/client
 */

//Import das bibliotecas 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { response } = require('express');
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('./module/config.js')

const app = express();

//Configuracao de cors para liberar o acesso a API
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  app.use(cors());
  next();
});

//Criamos um objeto que permite receber um JSon no corpo das requisicoes 
const jsonParser = bodyParser.json()
//app.use(jsonParser)

/*************************************************************
 *  Rotas para CRUID (Create, Read, Update, Delete) de alunos
 *  Data: 10/10/2022
 *************************************************************/

//EndPoint para listar todos os alunos (Funcionando)
app.get('/v1/alunos', cors(), async function (request, response) {
  let statusCode;
  let message;
  //Import do arquivo controllerAluno
  const controllerAluno = require('./controller/controllerAluno.js');
  //Retorna todos os alunos existente no BD
  const dadosAlunos = await controllerAluno.readAluno();
  //Valida se existe retorno de dados
  if (dadosAlunos) 
  {
    statusCode = 200;
    message = dadosAlunos;
  } else 
  {
    statusCode = 404;
    message = MESSAGE_ERROR.NOT_FOUND_DB;
  }
  //Retorna os dados da API
  response.status(statusCode);
  response.json(message);
});
//EndPoint para buscar aluno pelo id (Funcionando)
app.get('/v1/aluno/:id', cors(), async function (request, response) { 
  let statusCode;
  let message;
  let id = request.params.id;

  if (id != '' && id != undefined) 
  {
    //Import do arquivo controller
    const controllerAluno = require('./controller/controllerAluno.js');
    //Retorna todos os alunos existente no BD
    const dadosAluno = await controllerAluno.buscarAlunoById(id);
    //Valida se existe retorno de dados
    if (dadosAluno) 
    {
    statusCode = 200;
    message = dadosAluno;
    } else 
    {
    statusCode = 404;
    message = MESSAGE_ERROR.NOT_FOUND_DB;
    }
  } else
  {
    statusCode = 400;
    message = MESSAGE_ERROR.REQUIRED_ID;
  }
  response.status(statusCode);
  response.json(message);
})
//EndPoint para inserir um novo aluno (Funcionando)
app.post('/v1/aluno', cors(), jsonParser, async function (request, response) {
  let statusCode;
  let message;
  let headerContentType;

  //Recebe o tipo de content-type que for enviado no header da requisicao 
  //aplication/json
  headerContentType = request.headers['content-type'];

  if (headerContentType == 'application/json') {
    //Recebe do corpo da mensagem o conteudo 
    let dadosBody = request.body;
    if (JSON.stringify(dadosBody) != '{}') 
    {
      //Import do arquivo da controller de aluno 
      const controllerAluno = require('./controller/controllerAluno.js')
      //Chama a funcao da controller e encaminha os dados do body 
      const createAluno = await controllerAluno.createAluno(dadosBody);

      statusCode = createAluno.status;
      message = createAluno.message;

    } else 
    {
      statusCode = 400;
      message = MESSAGE_ERROR.EMPTY_BODY;
    }
  } else 
  {
    statusCode = 415;
    message = MESSAGE_ERROR.CONTENT_TYPE;
  }
  response.status(statusCode);
  response.json(message);
});
//EndPoint para atualizar dados de aluno (Funcionando)
app.put('/v1/aluno/:id', cors(), jsonParser, async function (request, response) {
  let statusCode;
  let message;
  let headerContentType;

  //Recebe o tipo de content-type que for enviado no header da requisicao 
  //aplication/json
  headerContentType = request.headers['content-type'];

  if (headerContentType == 'application/json') {
    //Recebe do corpo da mensagem o conteudo 
    let dadosBody = request.body;
    if (JSON.stringify(dadosBody) != '{}') 
    {
      //Recebe o id enviado por parametro na requisicao 
      let id = request.params.id;
      //Validacao do id na requisicao para saber se existe conteudo 
      if (id != '' && id != undefined) 
      {
        //Criamos uma chave para o id no json que chegou do corpo da requisicao 
        dadosBody.id = id;
        //Import do arquivo da controller de aluno 
        const controllerAluno = require('./controller/controllerAluno.js')
        //Chama a funcao da controller e encaminha os dados do body 
        const updateAluno = await controllerAluno.updateAluno(dadosBody);

        statusCode = updateAluno.status;
        message = updateAluno.message;

      } else 
      {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
      }
    }
  } else {
    statusCode = 415;
    message = MESSAGE_ERROR.CONTENT_TYPE;
  }
  response.status(statusCode);
  response.json(message);
})
//EndPoint para deletar dados de aluno (Funcionando)
app.delete('/v1/aluno/:id', cors(), jsonParser, async function (request, response) {
  let statusCode;
  let message;
  //Recebe o id enviado por parametro na requisicao 
  let id = request.params.id;
  //Validacao do id na requisicao para saber se existe conteudo 
  if (id !== '' && id !== undefined) 
  {
    //Import do arquivo da controller 
    const controllerAluno = require('./controller/controllerAluno.js');
    //Chama a funcao da controller e encaminha os dados do body 
    const deleteAluno = await controllerAluno.deleteAluno(id);

    statusCode = deleteAluno.status;
    message = deleteAluno.message;

  } else 
  {
    statusCode = 400;
    message = MESSAGE_ERROR.REQUIRED_ID;
  }
  response.status(statusCode);
  response.json(message);
});

/*************************************************************
 *  Rotas para CRUID (Create, Read, Update, Delete) de cursos
 *  Data: 27/10/2022
 *************************************************************/

//EndPoint para listar todos os cursos (Funcionando)
app.get('/v1/cursos', cors(), async function (request, response) {
  let statusCode;
  let message;
  //Import do arquivo controller
  const controllerCursos = require('./controller/controllerCurso.js');
  //Retorna todos os alunos existente no BD
  const dadosCursos = await controllerCursos.readCursos();
  //Valida se existe retorno de dados
  if (dadosCursos) 
  {
    statusCode = 200;
    message = dadosCursos;
  } else 
  {
    statusCode = 404;
    message = MESSAGE_ERROR.NOT_FOUND_DB;
  }
  //Retorna os dados da API
  response.status(statusCode);
  response.json(message);
});
//EndPoint para buscar curso pelo Id (Funcionando)
app.get('/v1/curso/:id', cors(), async function (request, response) {
  let statusCode;
  let message;
  let id = request.params.id;

  if (id != '' && id != undefined) 
  {
    //Import do arquivo controller
    const controllerCursos = require('./controller/controllerCurso.js');
    //Retorna todos os alunos existente no BD
    const dadosCursos = await controllerCursos.buscarCursoById(id);
    //Valida se existe retorno de dados
    if (dadosCursos) 
    {
      statusCode = 200;
      message = dadosCursos;
    } else 
    {
      statusCode = 404;
      message = MESSAGE_ERROR.NOT_FOUND_DB;
    }
  }
  //Retorna os dados da API
  response.status(statusCode);
  response.json(message);  
});
//EndPoint para cadastrar um novo curso (Funcionando)
app.post('/v1/curso', cors(), jsonParser, async function (request, response) {
  let statusCode;
  let message;
  let headerContentType;

  //Recebe o tipo de content-type que for enviado no header da requisicao 
  headerContentType = request.headers['content-type'];

  if (headerContentType == 'application/json') {
    //Recebe do corpo da mensagem o conteudo 
    const dadosBody = request.body;
    if (JSON.stringify(dadosBody) != '{}') 
    {
      //Import do arquivo da controller de curso 
      const controllerCurso = require('./controller/controllerCurso.js')
      //Chama a funcao da controller e encaminha os dados do body 
      const createCurso = await controllerCurso.createCurso(dadosBody);

      statusCode = createCurso.status;
      message = createCurso.message;

    } else 
    {
      statusCode = 400;
      message = MESSAGE_ERROR.EMPTY_BODY;
    }
  } else 
  {
    statusCode = 415;
    message = MESSAGE_ERROR.CONTENT_TYPE;
  }
  response.status(statusCode);
  response.json(message);
});
//EndPoint para atualizar dados de um curso (Funcionando)
app.put('/v1/curso/:id', cors(), jsonParser, async function (request, response) {
  let statusCode;
  let message;
  let headerContentType;

  //Recebe o tipo de content-type que for enviado no header da requisicao 
  headerContentType = request.headers['content-type'];

  if (headerContentType == 'application/json') {
    //Recebe do corpo da mensagem o conteudo 
    let dadosBody = request.body;
    if (JSON.stringify(dadosBody) != '{}') 
    {
      //Recebe o id enviado por parametro na requisicao 
      let id = request.params.id;
      //Validacao do id na requisicao para saber se existe conteudo 
      if (id != '' && id != undefined) 
      {
        //Criamos uma chave para o id no json que chegou do corpo da requisicao 
        dadosBody.id = id;
        //Import do arquivo da controller de curso
        const controllerCurso = require('./controller/controllerCurso.js')
        //Chama a funcao da controller e encaminha os dados do body 
        const updateCurso = await controllerCurso.updateCurso(dadosBody);

        statusCode = updateCurso.status;
        message = updateCurso.message;

      } else 
      {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
      }
    }
  } else {
    statusCode = 415;
    message = MESSAGE_ERROR.CONTENT_TYPE;
  }
  response.status(statusCode);
  response.json(message);
});
//EndPoint para deletar dados do curso (Funcionando)
app.delete('/v1/curso/:id', cors(), async function (request, response) {
  let statusCode;
  let message;
  //Recebe o id enviado por parametro na requisicao 
  let id = request.params.id;
  //Validacao do id na requisicao para saber se existe conteudo 
  if (id !== '' && id !== undefined) 
  {
    //Import do arquivo da controller de curso
    const controllerCurso = require('./controller/controllerCurso.js');
    //Chama a funcao da controller e encaminha os dados do body 
    const deleteCurso = await controllerCurso.deleteCurso(id);

    statusCode = deleteCurso.status;
    message = deleteCurso.message;

  } else 
  {
    statusCode = 400;
    message = MESSAGE_ERROR.REQUIRED_ID;
  }
  response.status(statusCode);
  response.json(message);
})

//Ativa o servior para receber requisicoes HTTP
app.listen(3030, function () {
  console.log('Servidor aguardando requisições!');
})