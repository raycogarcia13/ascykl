const Router = require('express')
const router = Router();

const {init} = require('../controllers/configController')

router.get('/config', init)

module.exports =  router;

