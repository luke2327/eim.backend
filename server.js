const express = require('express');
const app = express();
const PORT = 6050;

app.get('/data',(req,res)=>{
    const data = {
        lastname : "test",
        firstname : "test"
    };
    res.json(data);
})

app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`);
})