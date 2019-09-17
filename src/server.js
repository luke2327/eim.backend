const express = require('express');
const app = express();
const PORT = 6050;
const dbApi = require('./config/database/dbapi');


app.get('/data', async (req,res)=>{
    try{
        const result = await dbApi.selectQuery('SELECT * FROM `item`');
        res.send(result);
    } catch (e) {
        console.log(e)
    } finally {
        conn.end();
    }
})

app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`);
})