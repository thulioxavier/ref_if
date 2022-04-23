const User = require('../models/User');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const secret = "asdjkasdj_kqiouensdaslkdn7@#$*@jksjh";

class UserController {

    async creatUser(req, res) {
        var {
            name,
            last_name,
            email,
            password,
            codigo
        } = req.body;

        console.log(codigo);
        var existAluno = await User.findByAluno(codigo);

        if (existAluno == false) {
            res.status(200);
            var error = "Essa Matrícula não corresponde a nenhum aluno!";
            res.json({ error: error });
            return;
        }


        var existEmail = await User.findByEmail(email);

        if (existEmail != false) {
            res.status(200);
            var error = "O e-mail informado já está em uso por outro usuário!";
            res.json({ error: error });
            return;
        }
        var existCodigo = await User.findByCodigo(codigo);

        if (existCodigo != false) {
            res.status(200);
            var error = "O número de Matrícula informado já está em uso!";
            res.json({ error: error });
            return;
        }
        var _id = await User.CreatUser(
            name,
            last_name,
            email,
            password, 
            codigo
        );

        res.status(200);
        console.log(_id);
        res.json({id:_id});

    }

    async loginUser(req, res) {
        var { email, password } = req.body

        var emailExists = await User.findEmail(email);
        // --------------
        console.log(emailExists);
        
        if (emailExists != false) {

            var user = await User.findByEmail(email);

            if (user != undefined) {
                var result = await bcrypt.compare(password, user.password);
                // res.json({Status: result});
                if (result) {
                    var token = jwt.sign({ email: user.email, id: user.id}, secret);

                    res.status(200);
                    res.json({ token: token, id: user.id});

                } else {
                    var error = "E-mail ou Senha Invalidos"
                    res.status(200);
                    res.json({ error: error });
                }
            } else {
                res.json({ Status: false });
            }

            return;
        } else {
            res.status(200);
            var error = "Não foi encontrada nenhuma conta com esse E-mail! 😨";
            res.json({ error: error });
            return;
        }
        // --------------


    }

    async selectCodigo(req, res){

        var id_user = req.params;

        var result = await User.SelectCodigo(id_user);
        console.log(result);

        res.status(200);
        res.json(result);

    }


}

module.exports = new UserController();
