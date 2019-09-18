const express = require('express');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const db = require('./data/db.js');

const server = express();

server.use(express.json());
server.use(session({
    name: 'cheeto',
    secret: process.env.SESSION_SECRERT || 'this is a secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        knex: db,
        tablename: 'knexsessions',
        createtable: true,
        clearInterval: 1000 * 60 * 30
    })
}));

const usersRouter = require('./data/users/users-router');
server.use('/api/users', usersRouter);

module.exports = server;