const app = require('./app');
const mongoose = require('mongoose');

const DB = process.env.PRODUCTION_DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB)
        .then(()=> console.log('MongoDB connected successfully'))
        .catch(err => console.log('MongoDB connection failed'));

app.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`);
})