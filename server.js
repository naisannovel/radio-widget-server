const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/radio-widget')
        .then(()=> console.log('MongoDB connected successfully'))
        .catch(err => console.log('MongoDB connection failed'));

app.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`);
})