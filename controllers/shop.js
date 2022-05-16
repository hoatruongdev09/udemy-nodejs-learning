
const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll()
        res.render('shop/product-list', {
            prods: products, pageTitle: 'All Products', path: "/products",
        })
    } catch (e) {
        res.status(500).send(e.message)
    }
}
exports.getProductDetail = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findByPk(id)
        console.log(product)
        res.render('shop/product-detail', {
            product, pageTitle: 'Product Detail', path: "/product-detail",
        })
    } catch (e) {
        res.status(500).send(e.message)
    }
}

exports.getIndex = async (req, res, next) => {
    try {
        const products = await Product.findAll()
        res.render('shop/index', {
            prods: products, pageTitle: 'Shop', path: "/",
            hasProduct: products.length > 0,
            activeShop: true,
            productCSS: true
        })
    } catch (e) {
        res.status(500).send(e.message)
    }
}

exports.getCart = async (req, res, next) => {

    try {
        const cart = await Cart.getProducts()
        const cartProduct = await Promise.all(cart.products.map(async (cartProd) => {
            const product = await Product.findById(cartProd.id)
            return { productData: product, qty: cartProd.qty }
        }))

        res.render('shop/cart', {
            pageTitle: 'Your Cart',
            path: '/cart',
            products: cartProduct
        })
    } catch (e) {
        res.status(500).send(e.message)
    }

}
exports.postAddCart = async (req, res, next) => {
    const { productId } = req.body
    const product = await Product.findById(productId)
    if (product) {
        Cart.addProduct(productId, product.price)
        res.redirect('/cart')
    } else {
        next()
    }
}
exports.postDeleteCart = async (req, res, next) => {
    const { id } = req.body
    console.log('delete cart item ', id)
    try {

        const product = await Product.findById(id)
        if (product) {
            await Cart.deleteProduct(id, product.price)
        }
        res.redirect('/cart')
    } catch (e) {
        res.status(500).send(e.message)
    }
}
exports.getOrders = async (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders'
    })
}


exports.checkout = async (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    })
}

