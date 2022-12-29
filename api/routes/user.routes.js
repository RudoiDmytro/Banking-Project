const Router = require('express')
const router = new Router()
const tableController = require('../controllers/user.controller')

router.post('/login',tableController.login)
router.post('/register' , tableController.register);
module.exports = router