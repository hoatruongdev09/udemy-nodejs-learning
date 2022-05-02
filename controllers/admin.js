
const Product = require('../models/product')

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.fetchAll()
        res.render('admin/products', {
            prods: products, pageTitle: 'Product', path: "/admin/products",
        })
    } catch (e) {
        res.status(500).send(e.message)
    }
}
exports.getEditProduct = async (req, res, next) => {
    try {
        const productId = req.query.productId
        const product = await Product.findById(productId)
        res.render('admin/edit-product', {
            product, pageTitle: 'Edit Product', path: "/admin/edit-product",
        })
    } catch (e) {
        res.status(500).send(e.message)
    }
}

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
    })
}

exports.postAddProduct = async (req, res) => {
    const { title, imageUrl, description, price } = req.body
    const product = new Product(title, imageUrl, description, price)
    try {
        await product.save()
        res.redirect('/')
    } catch (e) {
        res.status(500).send(e.message)
    }
}
exports.postEditProduct = async (req, res) => {
    try {
        await Product.updateProduct(req.body)
        res.redirect('/admin/products')
    } catch (e) {
        res.status(500).send(e.message)
    }
}
exports.postDeleteProduct = async (req, res) => {
    const { id } = req.body
    try {
        await Product.deleteById(id)
        res.redirect('/admin/products')
    } catch (e) {
        res.status(500).send(e.message)
    }
}