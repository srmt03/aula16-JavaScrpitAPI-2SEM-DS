/***************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de variaveis, constantes e 
 * mensagens do sistema 
 * Autor: Samuel Matos
 * Data Criacao: 13/10/2022
 * Versao: 1.0
 ***************************************************************************/

const MESSAGE_ERROR = {
    REQUIRED_FIELDS     : 'There are mandatory fields that must be sent!',
    INVALID_EMAIL       : 'The email provided is not valid',
    CONTENT_TYPE        : 'Request header does not have a valid content type',
    EMPTY_BODY          : 'Request body cannot be empty',
    NOT_FOUND_DB        : 'No records found in the database',
    INTERNAL_ERROR_DB   : 'Unable to perform the operation with the database',
    REQUIRED_ID         : 'The registry ID is mandatory in this type of request',
    NO_COURSE           : 'No courses enrolled'
}
const MESSAGE_SUCCESS = {
    INSERT_ITEM         : 'Item created successfully in the database',
    UPDATE_ITEM         : 'Item updated successfully in the database',
    DELETE_ITEM         : 'Item successfully deleted from database'
}

module.exports = {
    MESSAGE_ERROR,
    MESSAGE_SUCCESS
}