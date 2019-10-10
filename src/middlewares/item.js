'use strict';

const express = require('express');
const router = express.Router();
const simulate = require('config/action/simulate');

router.post('/simulate/item', async (req, res) => {
  const result = await simulate.getSimulateItemByCube(req.body);

  res.send(result);
});

router.post('/simulate/available-cube', async (req, res) => {
  const result = await simulate.getSimulateAvailableCubeByCube(req.body);

  res.send(result);
});

router.post('/simulate/set-potential', async (req, res) => {
  const result = await simulate.getSimulateSetPotential(req.body);

  res.send(result);
});

router.post('/simulate/equipment-item', async (req, res) => {
  const result = await simulate.getEquipmentItem(req.body);

  res.send(result);
});

module.exports = router;