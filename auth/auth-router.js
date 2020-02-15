const router = require('express').Router();
const bcrypt = require('bcryptjs');
// const authorize = require('../auth/auth-required-middlware');

const Users = require('../users/users-model.js');

// router.post('/register', (req, res) => {

//   let user = req.body;

//   const hash = bcrypt.hashSync(user.password, 8);
//   user.password = hash;

//   Users.add(user)
//     .then(saved => {
//       res.status(201).json(saved);
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

// router.post('/login', authorize, (req, res) => {
//   let { username } = req.headers;
//   res.status(200).json({ message: `Welcome ${username}!` });
// })

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.loggedin = true;
        res.status(200).json({ message: `Welcome ${user.username}! Help yourself to a cooke.`, });
      } else {
        res.status(401).json({ message: '...try try again.' });
      }
    })
    .catch(error => { 
      res.status(500).json(error);
    });
});

router.delete('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send({ message: 'Please, stay.' });
      } else {
        res.send({ message: 'Bye. Please close the door behind you.' });
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;