const express = require('express')
const path = require('path')
const adminRouters = require('./routes/admin')
const shopRouters = require('./routes/shop')

const errorController = require('./controllers/error')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRouters)
app.use(shopRouters)

app.use(errorController.get404)


const port = process.env.PORT || 3000

app.listen(port, () => { console.log(`server listen on ${port}`) })

