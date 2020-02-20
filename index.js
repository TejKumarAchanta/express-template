const express = require('express')
const config = require('config');
const app = express();
const colors = require('colors');
const mongoose = require('mongoose');




mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/user', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});


const errorHandler = require('./middlewares/errorHandler');




// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


app.use(express.json());


app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)

app.use(errorHandler);
app.get('/', (req, res) => res.send('Hello World!'))




const port = config.get("port") || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))