const express = require('express')
const path = require('path')
const adminRouters = require('./routes/admin')
const shopRouters = require('./routes/shop')

const expressHbs = require('express-handlebars')
const app = express()
app.engine('hbs', expressHbs({ layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRouters.routes)
app.use(shopRouters)

app.use((req, res, next) => {
    res.render("404", { pageTitle: 'Page not found' })
})


const port = process.env.PORT || 3000

app.listen(port, () => { console.log(`server listen on ${port}`) })

