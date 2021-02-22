var knex = require('../database/connection');
var bcrypt = require('bcrypt');
var hash = require('crypto');

class Admin {
    async CreatAdmin(
        name,
        last_name,
        email,
        password,
        
    ) {

        try {

            var hash = await bcrypt.hash(password, 10);

            var result = await knex.insert({
                name,
                last_name,
                email,
                password: hash,
                

            }).table('admin');

            return result;

        } catch (error) {
            console.log(error);
        }

    }

    async findByAluno(codigo) {
        try {
            var result = await knex.select("*").where({ codigo: codigo }).table("alunos");
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
            var result = await knex.select("*").where({ codigo: codigo }).table("admin");
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
            var result = await knex.select("*").where({ email: email }).table("admin");
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

    async SelectCodigo(id_user){
        try {
            
            console.log(id_user);
            var result = await knex.select("codigo").from("users").where({ id: id_user.id });
            var resultBarcode = await knex.select("*").from("alunos").where({ codigo: result[0].codigo });
            console.log(resultBarcode);
            return resultBarcode;
        } catch (error) {
            console.log(error);
        }
    }

    async findEmail(email) {
        try {
            var result = await knex.select('*').from('admin').where({ email: email });
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


}

module.exports = new Admin();