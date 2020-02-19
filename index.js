const server = require('./api/server.js');

const PORT = process.env.PORT || 5000;

server.get('/', (req, res) => {
    res.send('<h1>WELCOME TO THE JUNGLE!</h1>')
  })

server.listen(PORT, () => console.log(`\n** Running on port: ${PORT} **\n`));