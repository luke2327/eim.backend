'use strict';

const express = require('express');
const router = express.Router();
const simulate = require('config/action/simulate');

router.post('/major-weapon', async (req, res) => {
  const result = await simulate.getItemMajorWeapon(req.body);

  res.send(result);
});

router.post('/available-cube', async (req, res) => {
  const result = await simulate.getItemAvailableCube(req.body);

  res.send(result);
});

router.post('/set-potential', async (req, res) => {
  const result = await simulate.getSimulateSetPotential(req.body);

  res.send(result);
});

router.post('/equipment-item', async (req, res) => {
  const result = await simulate.getEquipmentItem(req.body);

  res.send(result);
});

module.exports = router;