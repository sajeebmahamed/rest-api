const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const contactRoute = require('./api/routes/contactRoutes')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/contactDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express()
app.use(morgan('dev'))
app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

const db = mongoose.connection

db.on('error', (err) => {
    console.log(err);
})
db.once('open', () => {
    console.log('database connected');
})

app.use('/api/contact', contactRoute)

const PORT = process.env.PORT || 4200
app.listen(PORT, () => console.log(`Server is listening to the port ${PORT}`))