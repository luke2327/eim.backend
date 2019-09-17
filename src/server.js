const express = require('express');
const mysql = require('mysql');
const util = require('util');
const app = express();
const PORT = 6050;
const dbconfig = require('./config/database');

app.get('/data', async (req,res)=>{
    try{
        const conn = await mysql.createConnection(dbconfig.connection);
        const query = await util.promisify(conn.query).bind(conn);
        const result = await query('SELECT * FROM `item`');

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