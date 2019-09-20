const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 6050;
const dbApi = require('./config/database/dbapi');
const enhanceApi = require('./config/action/enhance');
const crawledApi = require('./config/action/crawled');


app.use(cors());
app.use(express.json());

app.get('/data', async (req, res)=>{
    try {
        const result = await dbApi.selectQuery('SELECT * FROM `item`');
        res.send(result);
    } catch (e) {
        console.log(e);
    }
});

app.post('/api/enhance/dialog/input/search', async (req, res) => {
    console.log('POST :: /api/enhance/dialog/input/search');
    const result = await enhanceApi.getEnhanceSearchItem(req.body);

    res.send(result);
});

app.post('/api/vod/youtube/list', async (req, res) => {
    const result = await crawledApi.getVodList();

    res.send(result);
});

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
});