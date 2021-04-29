const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("hey there");
});

app.post('/',(req,response)=>{
    res.send("posty");
});
const port =3000;

app.listen(port,()=>{
    console.log(`listenning on port ${port} `);
})
