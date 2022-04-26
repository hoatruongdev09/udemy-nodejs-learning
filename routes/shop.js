const express = require('express')
const rootDir = require('../util/path')
const path = require('path')
const Router = express.Router()

const adminData = require('./admin')

Router.get('/', (req, res) => {
    const products = adminData.products
    res.render('shop', {
        prods: products, pageTitle: 'Shop', path: "/",
        hasProduct: products.length > 0,
        activeShop: true,
        productCSS: true
    })
})

module.exports = Router