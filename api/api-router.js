const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

// /api/auth
router.use('/auth', authRouter);
// /api/users
router.use('/users', usersRouter);

// /api
router.get('/', (req, res) => {
  res.json({ api: "WE'VE GOT FUN AND GAMES!" });
});

module.exports = router;