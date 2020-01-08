'use strict';

const express = require('express');
const router = express.Router();
const simulate = require('config/action/simulate');
const ck = require('camelcase-keys');

router.post('/getMajorWeapon', async (req, res) => {
  const result = await simulate.getItemMajorWeapon(req.body)
    .then(re => ck(re, { deep: true }));

  res.send(result);
});

router.post('/getItemAvailableCube', async (req, res) => {
  const result = await simulate.getItemAvailableCube(req.body)
    .then(re => ck(re, { deep: true }));

  res.send(result);
});

router.post('/getEquipmentItem', async (req, res) => {
  const result = await simulate.getEquipmentItem(req.body)
    .then(re => ck(re, { deep: true }));

  res.send(result);
});

router.post('/set-potential', async (req, res) => {
  const result = await simulate.getSimulateSetPotential(req.body)
    .then(re => ck(re, { deep: true }));

  res.send(result);
});

module.exports = router;