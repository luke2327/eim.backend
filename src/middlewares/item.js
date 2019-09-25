const express = require('express');
const router = express.Router();
const simulateApi = require('config/action/simulate');

router.post('/simulate/cube', async (req, res) => {
  const result = await simulateApi.getSimulateItemByCube(req.body);

  res.send(result);
})

module.exports = router;