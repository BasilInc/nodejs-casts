
var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , async = require('async')
  , markdown = require('markdown').markdown

module.exports = function (app, passport, auth) {

  // user routes
  var users = require('../app/controllers/users')
  app.get('/login', users.login)
  app.get('/signup', users.signup)
  app.get('/logout', users.logout)
  app.post('/users', users.create)
  app.post('/users/session', passport.authenticate('local', {failureRedirect: '/login'}), users.session)
  app.get('/users/:userId', users.show)

  var casts = require('../app/controllers/casts')

  app.get('/', auth.requiresLogin, casts.index)
  app.get('/casts', casts.index)
  app.get('/casts/new', auth.requiresLogin, casts.new)
  app.post('/casts', auth.requiresLogin, casts.create)
  app.get('/casts/:id', casts.show)
  //app.get('/casts/:id/edit', auth.requiresLogin, auth.cast.hasAuthorization, casts.edit)
  //app.put('/casts/:id', auth.requiresLogin, auth.cast.hasAuthorization, casts.update)
  //app.del('/casts/:id', auth.requiresLogin, auth.cast.hasAuthorization, casts.destroy)

  app.param('userId', function (req, res, next, id) {
    User
      .findOne({ _id : id })
      .exec(function (err, user) {
        if (err) return next(err)
        if (!user) return next(new Error('Failed to load User ' + id))
        req.profile = user
        next()
      })
  })
}
