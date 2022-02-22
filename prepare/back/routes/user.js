const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const {User} = require("../models");

const router = express.Router();

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
      // const fullUserWithoutPassword = await User.findOne({
      //   where: { id: user.id },
      //   attributes: {
      //     exclude: ["password"],
      //   },
      //   include: [
      //     {
      //       model: Post,
      //       attributes: ["id"],
      //     },
      //     {
      //       model: User,
      //       as: "Followings",
      //       attributes: ["id"],
      //     },
      //     {
      //       model: User,
      //       as: "Followers",
      //       attributes: ["id"],
      //     },
      //   ],
      // });
      return res.status(200).json(user);
    });
  })(req, res, next);
});

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
