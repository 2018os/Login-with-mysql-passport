var express = require('express');
var router = express.Router();
const { User } = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', async(req, res, next) => {
  let user_name = req.body.name;
  let user_password = req.body.password;
  try {
    let user = await User.find({ where: { name: user_name } });
    if(!user) {
      res.send(`
        <h1>아이디가 틀렸습니다.</h1>
        <a href='/login'>돌아가기</a>
      `);
    } else {
      if(user.password != user_password) {
        res.send(`
          <h1>비밀번호가 틀렸습니다.</h1>
          <a href='/login'>돌아가기</a>
        `);
      } else {
        res.send(`
          <h1>HELLO${user.name}!</h1>
          createdAt: ${user.createdAt}
        `)
      }
    }
  } catch(err) {
    console.error(err);
    next(err);
  }
});

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', async (req, res, next) => {
  let user_name = req.body.name;
  let user_password = req.body.password;
  try{
    let newUser = await User.find({ where: { name: user_name } });
    if(newUser) {
      res.send(`
        <h1>아이디가 중복됩니다.</h1>
        <a href='/register'>돌아가기</a>
      `);
    } else {
      await User.create({
        name: user_name,
        password: user_password,
      });
      res.send(`
        <h1>회원가입에 성공했습니다.</h1>
        <a href='/'>home</a>
        <a href='/login'>로그인</a>
        <a href='/register'>돌아가기</a>
      `);
    }
  } catch(err) {
    console.error(err);
    next(err);
  }
})
module.exports = router;
