const express = require('express');
const {Diet} = require('../models');
const {json} = require("express");

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    // 기존 자료가 있으면 업데이트, 없으면 새로 만들기
    const {dietId, date, calorie, weight, userId} = req.body;
    if (dietId) {
      const updateDiet = await Diet.update(
        {
          date: date,
          calorie: calorie,
          weight: weight,
          UserId: userId,
        },
        {
          where: {UserId: userId, date: date,},
        });
      return res.status(201).send(updateDiet);
    } else {
      const newDiet = await Diet.create({
        date: date,
        calorie: calorie,
        weight: weight,
        UserId: userId,
      });
      res.status(201).send(newDiet);
    }
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
})

router.get('/:userId/:date', async (req, res, next) => {
  try {
    console.log(req.params.date);
    const dateDiet = await Diet.findOne({
      where: {UserId: req.params.userId, date: req.params.date}
    })
    res.status(201).send(dateDiet);
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
})

module.exports = router;
