const express = require('express');
const router = express.Router();
const simulateApi = require('config/action/simulate');

router.post('/simulate/item', async (req, res) => {
  const result = await simulateApi.getSimulateItemByCube(req.body);

  console.log(result);
  res.send(result);
})

router.post('/simulate/available-cube', async (req, res) => {
  const result = await simulateApi.getSimulateAvailableCubeByCube(req.body);

  console.log(result);

  res.send(result);
})

module.exports = router;