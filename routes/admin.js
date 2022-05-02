const express = require('express')
const adminController = require('../controllers/admin')
const Router = express.Router()


Router.get('/add-product', adminController.getAddProduct)
Router.get('/edit-product', adminController.getEditProduct)

Router.get('/products', adminController.getProducts)

Router.post('/add-product', adminController.postAddProduct)
Router.post('/edit-product', adminController.postEditProduct)
Router.post('/delete-product', adminController.postDeleteProduct)


module.exports = Router