const fs = require('fs').promises
const path = require('path')


const getCartFromFile = async () => {
    const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json')
    try {
        const content = await fs.readFile(p)
        return JSON.parse(content)
    } catch (e) {
        return { products: [], totalPrice: 0 }
    }
}

const saveCartToFile = async (content) => {
    const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json')
    try {
        await fs.writeFile(p, JSON.stringify(content))
    } catch (e) {
        throw e
    }
}

module.exports = class Cart {
    static async addProduct(id, productPrice) {
        try {
            const cart = await getCartFromFile()
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct
            if (existingProduct) {
                updatedProduct = { ...existingProduct }
                updatedProduct.qty += 1
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct
            } else {
                updatedProduct = { id: id, qty: 1 }
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice += +productPrice
            await saveCartToFile(cart)
        } catch (e) {
            throw e
        }
    }
    static async deleteProduct(id, productPrice) {
        try {
            const cart = await getCartFromFile()
            const product = cart.products.find(prod => prod.id === id)
            if (product) {
                const productQty = product.qty
                cart.products = cart.products.filter(prod => prod.id !== id)
                cart.totalPrice -= productPrice * productQty
                await saveCartToFile(cart)
            }
        } catch (e) {
            throw e
        }
    }

    static async getProducts() {
        try {
            return await getCartFromFile()
        } catch (e) {
            throw e
        }
    }
}