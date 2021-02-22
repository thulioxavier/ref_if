var express = require("express");
const AdminController = require("../controllers/AdminController");
const AgendaController = require("../controllers/AgendaController");
const UserController = require("../controllers/UserController");
var router = express.Router();

router.post('/user', UserController.creatUser);
router.post('/login', UserController.loginUser);
router.get('/user/barcode/:id', UserController.selectCodigo);

router.post('/user/agend', AgendaController.creatAgend);
router.post('/user/agend/dates', AgendaController.disableDate);
router.get('/user/agend/list/:id_user', AgendaController.listHistorico);


router.post('/admin/list_ag', AgendaController.listAg);
router.post('/admin/login', AdminController.loginAdmin);
router.post('/admin', AdminController.creatAdmin);
module.exports = router;