const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const secret = "asdjkasdj_kqiouensdaslkdn7@#$*@jksjh";

class AdminController {

    async creatAdmin(req, res) {
        var {
            name,
            last_name,
            email,
            password,
        } = req.body;


        var existEmail = await Admin.findByEmail(email);

        if (existEmail != false) {
            res.status(200);
            var error = "O e-mail informado já está em uso por outro usuário!";
            res.json({ error: error });
            return;
        }

        var _id = await Admin.CreatAdmin(
            name,
            last_name,
            email,
            password, 
        );

        res.status(200);
        console.log(_id);
        res.json({id:_id});

    }

    async loginAdmin(req, res) {
        var { email, password } = req.body

        var emailExists = await Admin.findEmail(email);
        // --------------
        console.log(emailExists);
        if (emailExists != false) {

            var user = await Admin.findByEmail(email);

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

        var result = await Admin.SelectCodigo(id_user);
        console.log(result);

        res.status(200);
        res.json(result);

    }


}

module.exports = new AdminController();
