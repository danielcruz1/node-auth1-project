
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const apiRouter = require('./api-router.js');
const configureMiddleware = require('./api-middleware.js');

const sessionOptions = {
    name: 'mycookie',
    secret: 'cookiesareyumyummewantcookies',
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
  
    store: new knexSessionStore({
      knex: require('../database/dbConfig.js'),
      tablename: 'sessions',
      sidfieldname: 'sid',
      createtable: true,
      clearInterval: 1000 * 60 * 60
    })
  };
  
  const server = express();
  configureMiddleware(server);

server.use(session(sessionOptions))

server.use('/api', apiRouter);

module.exports = server;