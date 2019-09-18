const db = require('../db.js');

module.exports = {
    getUsers,
    getUserById,
    getByUserName,
    insert
}

function getUsers() {
    return db('users');
}

function getUserById(id) {
    return db('users')
        .where({id: id})
        .first();
}

function getByUserName(username) {
    return db('users')
        .where({username: username})
        .first();
}

function insert(user) {
    return db('users')
        .insert(user)
        .then(([id]) => getUserById(id));
}