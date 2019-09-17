const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 6050;
const dbconfig = require('./config/database');

app.get('/data', async (req,res)=>{
    try{
        const conn = await mysql.createConnection(dbconfig.connection);
        const result = await conn.query('SELECT * FROM `item`', (err, res) => {
            if(err) throw err;

            console.log(res);
            return res;
        });
    } catch (e) {
        console.log(e)
    }

    res.json(result);
})

app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`);
})