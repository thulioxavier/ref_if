const Agenda = require('../models/Agenda');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const secret = "asdjkasdj_kqiouensdaslkdn7@#$*@jksjh";

class AgendaController {

    async creatAgend(req, res) {
        var {
            date,
            horario
        } = req.body;

        console.log(date);
        const now = new Date;
        const tempo = now.getHours();
        

        if (tempo > 8 && tempo < 13) {
            res.status(200);
            var error = "Horario excedido! 😭😭\nHorarios: 13:H às 8:H";
            res.json({ error: error });
            return;
        }

        var id_user = req.headers.id_user;

        var existAluno = await Agenda.findByAgend(date, id_user);

        if (existAluno != false) {
            res.status(200);
            var error = "Você já marcou sua refeição nessa Data! 😒😒";
            res.json({ error: error });
            return;
        }

        await Agenda.CreatAgend(
            date,
            horario,
            id_user
        );

        res.status(200);
        res.json("OK");

    }

    async disableDate(req, res){
       var id_user = req.body.id_user;

       var result = await Agenda.DisableDate(id_user)

       res.status(200);
       res.json(result);
    }

    async listHistorico(req, res){
        var id_user = req.params;

        var result = await Agenda.ListHistorico(id_user);
        
        res.status(200);
        res.json(result);

    }

    async listAg(req, res){

        var result = await Agenda.ListAg();

        res.json(result);


    }


}

module.exports = new AgendaController();
