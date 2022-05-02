const express = require('express')

const shopController = require('../controllers/shop')

const Router = express.Router()

Router.get('/', shopController.getIndex)

Router.get('/products', shopController.getProducts)
Router.get('/cart', shopController.getCart)
Router.get('/orders', shopController.getOrders)
Router.get('/checkout', shopController.checkout)
Router.get('/products/:id', shopController.getProductDetail)

Router.post('/card', shopController.postAddCart)
Router.post('/cart-delete-item', shopController.postDeleteCart)

module.exports = Router