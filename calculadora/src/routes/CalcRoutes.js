const router = require('express').Router();

const CalcController = require('../controllers/CalcController')

// router.get('/getall', CalcController.getClients)
// router.post('/getclientbyid', CalcController.getClientById)
router.post('/basic', CalcController.basic)
// router.patch('/editclientbyid', CalcController.editClientById)
// router.delete('/deleteclientbyid', CalcController.deleteClientById)

module.exports = router;