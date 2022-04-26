const express = require('express')
const path = require('path')
const adminRouters = require('./routes/admin')
const shopRouters = require('./routes/shop')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use((req, res, next) => {
    console.log("in the middleware")
    next()
})
app.use((req, res, next) => {
    console.log("in the another middleware")
    next()
})

app.use('/admin', adminRouters)
app.use(shopRouters)

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})


const port = process.env.PORT || 3000

app.listen(port, () => { console.log(`server listen on ${port}`) })

