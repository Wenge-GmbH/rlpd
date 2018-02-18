const jwt = require('jsonwebtoken');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: user.id, iat: timestamp }, 'mementomori');
}

const admin = {
  username: 'admin',
  password: '1234',
  id: '05b09c3a-0b29-11e8-ba89-0ed5f89f718b'
}

exports.login = (req, res, next) => {
  const { username, password } = req.body;

  console.log( admin.password, password);
  if (admin.username !== username || admin.password !== password) {
    return res.status(402).send('Unauthorized');
  }
  res.send({token: tokenForUser(admin)});
}

exports.validateToken = (req, res, next) => {
  jwt.verify(req.headers.authorization, 'mementomori', (err, decoded) => {
    if(err) {
      res.status(400).send('Unauthorized');
      return next(err);
    }
    if(!decoded.sub === admin.id) {
      res.status(400).send('Unauthorized');
      return next('Unauthorized');
    } else {
      next();
    }
  })
}
