const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env'});

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(con=>{
    console.log(con.connections);
    console.log('DB connection successful');
});

const tourSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'a tour must have name'],
        unique:true
    },
    rating:{
        type:Number,
        default:4.5
    },
    price:{
        type:Number,
        required:[true,'a tour must have price']
    }

});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
    name: "new hiker",
    rating:4.7,
    price:450
});

testTour.save().then(doc=>{
    console.log(doc);
})
.catch(err=>{
    console.log('error found'); 
});

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`App running on port ${port}....`);
});