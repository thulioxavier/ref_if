var knex = require('../database/connection');
var bcrypt = require('bcrypt');
var hash = require('crypto');

class Agenda {
    async CreatAgend(
        date,
        horario,
        id_user
    ) {


        try {

            var aluno = await knex.select("codigo").where({id: id_user}).table("users");

            var codigo = aluno[0].codigo;

            var alunoC = await knex.select("name","codigo").where({codigo: codigo}).table("alunos");
            
            var result = await knex.insert({
                id_user,
                date,
                horario,
                name: alunoC[0].name,
                codigo: alunoC[0].codigo

            }).table('agendamentos');

            return result;

        } catch (error) {
            console.log(error);
        }
    }

    async DisableDate(id_user){
        try {
            var result = await knex.select("*").where({ id_user: id_user }).table("agendamentos");
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async findByAgend(date, id_user) {
        try {
            var result = await knex.select("*").where({ id_user: id_user }).andWhere({date: date}).table("agendamentos");
            if (result.length > 0) {
                return result[0];
                
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async findByCodigo(codigo) {
        try {
            var result = await knex.select("*").where({ codigo: codigo }).table("users");
            if (result.length > 0) {
                return result[0];
                
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async findByEmail(email) {
        try {
            var result = await knex.select("*").where({ email: email }).table("users");
            if (result.length > 0) {
                return result[0];
                
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async findEmail(email) {
        try {
            var result = await knex.select('*').from('users').where({ email: email });
            if (result.length > 0) {
                var error = "Error";
                return error;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error + " FOOI ESSE O ERRO CARAI");
            return false;
        }
    }

    async ListHistorico(id_user){
        try {
            console.log(id_user);
            var result = await knex.select('*').from('agendamentos').where({id_user: id_user.id_user});
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = new Agenda();