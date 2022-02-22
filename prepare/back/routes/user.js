const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const {User} = require("../models");

const router = express.Router();

// 유저정보 가지고 오기 - GET /user
router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 로그인 - POST /user/login
router.post('/login', async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      // passport error
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

// 회원가입 - POST /user
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

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

// 기본 틀
// router.post('/', async (req, res, next) => {
//   try {
//
//   } catch (error) {
//     console.error(error);
//     next(error); // status 500
//   }
// });

module.exports = router;
