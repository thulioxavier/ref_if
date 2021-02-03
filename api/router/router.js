var express = require("express");
const AgendaController = require("../controllers/AgendaController");
const UserController = require("../controllers/UserController");
var router = express.Router();

router.post('/user', UserController.creatUser);
router.post('/login', UserController.loginUser);
router.get('/user/barcode/:id', UserController.selectCodigo);

router.post('/user/agend', AgendaController.creatAgend);
router.post('/user/agend/dates', AgendaController.disableDate);
router.get('/user/agend/list/:id_user', AgendaController.listHistorico);

module.exports = router;