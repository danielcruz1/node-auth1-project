// const users = require('../users/users-model.js');
// const bcrypt = require('bcryptjs');

// module.exports = (req, res, next) => {
   
//     const { username, password } = req.headers
    
//     if (!(username && password)) {
//         res.status(401).json({ message: "You shall not pass!" });
//     } else {
//         users.findBy({ username })
//             .first()
//             .then(user => {
//                 if (user && bcrypt.compareSync(password, user.password)) {
//                     next()
//                 } else {
//                     res.status(401).json({ messege: "You shall not pass!" })
//                 }
//             })
//             .catch((err) => { res.status(500).json({ messege: err }) })
//     }
// }

module.exports = (req, res, next) => {

    if (req.session.loggedin && (req.session.loggedin === true)) {
        next();
      } else {
        res.status(400).json({ message: "Where, pray tell, is your cookie?" });
      }
    };