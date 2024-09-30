const express = require('express')
const router = express.Router()
const { createProduct, getAllProducts } = require('../controllers/productsController')

router.route('/').post(createProduct).get(getAllProducts)

module.exports = router