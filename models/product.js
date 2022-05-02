const fs = require('fs').promises
const path = require('path')

const Cart = require('./cart')

const getProductsFromFile = async () => {
    const p = path.join(path.dirname(process.mainModule.filename), 'data', 'product.json')
    try {
        const content = await fs.readFile(p)
        return JSON.parse(content)
    } catch (e) {
        return []
    }
}

const saveProductsToFile = async (content) => {
    const p = path.join(path.dirname(process.mainModule.filename), 'data', 'product.json')
    try {
        await fs.writeFile(p, JSON.stringify(content))
    } catch (e) {
        throw e
    }
}

module.exports = class Product {

    constructor(title, imageUrl, description, price) {
        this.id = Math.floor(Math.random() * 10000).toString()
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }
    getData() {
        return {
            id: this.id,
            title: this.title,
            imageUrl: this.imageUrl,
            description: this.description,
            price: this.price
        }
    }
    async save() {
        const products = await getProductsFromFile()
        products.push(this.getData())
        try {
            console.log(products)
            await saveProductsToFile(products)
        }
        catch (e) {
            throw e
        }
    }

    static async fetchAll() {
        try {
            const products = await getProductsFromFile()
            return products
        }
        catch (e) {
            throw e
        }
    }

    static async findById(id) {
        try {
            const products = await getProductsFromFile()
            return products.find(p => p.id === id)
        }
        catch (e) {
            throw e
        }
    }

    static async deleteById(id) {
        try {
            const products = await this.fetchAll()
            const product = await this.findById(id)
            await Cart.deleteProduct(id, product.price)
            const updatedProduct = products.filter(prod => prod.id !== id)
            await saveProductsToFile(updatedProduct)
        } catch (e) {
            throw e
        }
    }
    static async updateProduct({ id, title, imageUrl, description, price }) {
        const product = new Product(title, imageUrl, description, price)
        product.id = id
        try {
            const products = await Product.fetchAll()
            for (let i = 0; i < products.length; i++) {
                if (products[i].id === id) {
                    products[i] = product
                }
            }
            await saveProductsToFile(products)
        } catch (e) {
            throw e
        }
    }
    static async saveProducts(products) {
        try {
            saveProductsToFile(products)
        } catch (e) {
            throw e
        }
    }
}