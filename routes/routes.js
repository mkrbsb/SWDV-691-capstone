const tmdb = require('./tmdb-route')
const users = require('./users-route')
const widget = require('./widget-route')
const restaurant = require('./restaurants-route')
const login = require('./login-route')
const routes = [tmdb, users,widget, restaurant, login]

module.exports = routes