#Permite visualizar todos os databases existentes no BD
show databases;

#Permite apagar um database e toda a sua estrutura de dados 
drop database dbcontatos20222;

#Permite criar um novo database no BD
create database db_lionschool;

#Permite ativar a utilização de um database
use db_lionschool;

#Permite visualizar todas as tabelas existente dentro de um database 
show tables;

#Criar tabelas de informações
create table tbl_aluno (
	id int UNSIGNED not null auto_increment primary key,
    nome varchar(80) not null,
    foto varchar(100),
    sexo varchar(1),
    rg varchar(15) not null,
    cpf varchar(18) not null,
    email varchar(256) not null,
    telefone varchar(18),
    celular varchar(18),
    data_nascimento date not null,
    unique index(id)
);


create table tbl_curso (
	id int UNSIGNED not null auto_increment primary key,
    nome varchar(50) not null,
    icone varchar(100),
    sigla varchar(6),
    carga_horaria int not null,
    unique index(id)
);

#Permite deletar uma tabela
drop table tbl_curso;

create table tbl_aluno_curso (
	id int UNSIGNED not null auto_increment primary key,
    id_aluno int unsigned not null,
    id_curso int unsigned not null,
    matricula varchar(15) not null,
    status_aluno varchar(10) not null,
    
    #Programacao para definir uma chave estrangeira
    foreign key (id_aluno) #Define qual o atributo sera uma FK
		references tbl_aluno(id), #Define de onde virá a PK
	foreign key (id_curso) #Define qual o atributo sera uma FK
		references tbl_curso(id), #Define de onde virá a PK
        
    unique index(id)
);

#Permite visualizar todos os dados de todas as colunas de uma tabela
select * from tbl_aluno;

#Permite inserir os dados dentro de uma tabela
insert into tbl_aluno (nome, 
					   foto, 
                       sexo, 
                       rg, 
                       cpf, 
                       email, 
                       telefone, 
                       celular, 
                       data_nascimento)
	#Qualquer atributo que não é do tipo inteiro é obrigatório o uso de aspas simples = '' 
	values ('Samuel Matos', 
            'https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-8-avatar-2754583_120515.png', 
            'M', 
            '50.592.215-0', 
            '484.168.128-02', 
            'samuel.matos@portalsesisp.org.br', 
            '', 
            '(11)99434-4292', 
            #Obrigatorio usar a forma padrão de data separados por traco ( - ), AAAA-MM-DD
            '2005-03-19');
            
insert into tbl_aluno (nome, 
					   foto, 
                       sexo, 
                       rg, 
                       cpf, 
                       email, 
                       telefone, 
                       celular, 
                       data_nascimento)
	#Qualquer atributo que não é do tipo inteiro é obrigatório o uso de aspas simples = '' 
	values ('Gabrielli Rosa', 
            'https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-4-avatar-2754580_120522.png', 
            'F', 
            '05.295.512-0', 
            '484.861.821-20', 
            'gabrielli.rosa@portalsesisp.org.br', 
            '', 
            '(11)97958-6005', 
            #Obrigatorio usar a forma padrão de data separados por traco ( - ), AAAA-MM-DD
            '2004-03-19');


#Permite alterar o valor de um atributo da tabela (Sempre devemos especificar qual sera o registro que vai sofre a alteracao, geralmente sempre sera a PK (id)) 
update tbl_aluno set rg = '35.567.748-4' where id = 2;

#Permite apagar um registro de uma tabela (Sempre devemos especificar qual sera o registro que vai sofre a alteracao, geralmente sempre sera a PK (id))
delete from tbl_aluno where id = 2;

