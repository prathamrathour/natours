const fs = require('fs');
const mongoose = require('mongoose');
const dotenv =require('dotenv');
const Tour = require('./../../models/tourModel');


dotenv.config({ path: './config.env'});

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(() => console.log('DB Connection Successful'));

//Read json file

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//IMport Data to DB

const importData = async() =>{
    try{
        await Tour.create(tours);
        console.log('DATA succesfully loaded');
    }catch(err){
        console.log(err);
    }
    process.exit();
};

//Delete all data from db

const deleteData = async() =>{
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted!');
      } catch (err) {
        console.log(err);
      }
      process.exit();
    };
    
    if (process.argv[2] === '--import') {
      importData();
    } else if (process.argv[2] === '--delete') {
      deleteData();
}