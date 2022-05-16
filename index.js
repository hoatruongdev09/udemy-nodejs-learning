const express = require('express')
const path = require('path')
const adminRouters = require('./routes/admin')
const shopRouters = require('./routes/shop')

const errorController = require('./controllers/error')
const sequelize = require('./util/database')
const app = express()

const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', async (req, res, next) => {
    req.user = await User.findByPk(1)
    next()
})

app.use('/admin', adminRouters)
app.use(shopRouters)

app.use(errorController.get404)

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product)

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(CartItem, { through: CartItem })

sequelize.sync().then(async result => {
    try {
        const user = await User.findByPk(1)
        if (!user) {
            User.create({ name: 'Max', email: "test@test.com" })
        }
    } catch (err) {

    }

}).catch(err => {
    console.log(err)
})

const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`server listen on ${port}`) })

