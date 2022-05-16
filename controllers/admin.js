
const Product = require('../models/product')

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll()
        res.render('admin/products', {
            prods: products, pageTitle: 'Product', path: "/admin/products",
        })
    } catch (e) {
        res.status(500).send(e)
    }
}
exports.getEditProduct = async (req, res, next) => {
    try {
        const productId = req.query.productId
        const product = await Product.findByPk(productId)
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
    console.log(req.user)
    try {
        await req.user.createProduct({ title, description, price, imageUrl })
        // await Product.create({
        //     title: title,
        //     description: description,
        //     price: price, imageUrl
        // })
        res.redirect('/')
    } catch (e) {
        res.status(500).send(e)
    }
}
exports.postEditProduct = async (req, res) => {
    try {
        const { id, title, imageUrl, price, description } = req.body
        await Product.update({
            title: title,
            imageUrl: imageUrl,
            price: price,
            description: description
        }, {
            where: {
                id: id
            }
        })
        res.redirect('/admin/products')
    } catch (e) {
        res.status(500).send(e.message)
    }
}
exports.postDeleteProduct = async (req, res) => {
    const { id } = req.body
    try {
        await Product.destroy({ where: { id: id } })
        res.redirect('/admin/products')
    } catch (e) {
        res.status(500).send(e.message)
    }
}