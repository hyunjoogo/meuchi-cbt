const express = require('express');
const userRouter = require('./routes/user');
const dietRouter = require('./routes/diet');
const db = require('./models');
const cors = require('cors');
const app = express();

db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello, express');
});

app.use('/diet', dietRouter);
app.use('/user', userRouter);

app.listen(3065, ()=>{
  console.log('서버 실행 중!');
});
