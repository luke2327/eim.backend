const express = require('express');
const app = express();
const PORT = 6050;
const dbApi = require('./config/database/dbapi');

app.use(express.json());

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

app.post('/api/enhance/dialog/input/search', (req, res) => {
    const params = req.body;

    res.send(req.body);
})

app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`);
})