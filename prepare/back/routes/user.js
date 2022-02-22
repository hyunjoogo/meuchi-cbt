const express = require('express');
const bcrypt = require('bcrypt');

const {User} = require("../models");

const router = express.Router();

// 로그인 - POST /user
// router.post('/', (req, res) => {
//   res.send('hello, user');
// });

// 회원가 - POST /user
router.post('/', async (req, res, next) => {
  try {
    const checkUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (checkUser) {
      return res.status(403).send("이미 사용중인 메일입니다.");
    }
    if (!req.body.confirmAccess) {
      return res.status(403).send("회원가입 동의하지 않았습니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});


module.exports = router;
