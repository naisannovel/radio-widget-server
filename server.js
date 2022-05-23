const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.DEVELOPMENT_DB)
        .then(()=> console.log('MongoDB connected successfully'))
        .catch(err => console.log('MongoDB connection failed'));

app.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`);
})