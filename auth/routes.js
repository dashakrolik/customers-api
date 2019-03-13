const { Router } = require('express')
const router = new Router()
const {toJWT} = require('./jwt')
const {toData} = require('./jwt')
const User = require('../users/model')
const bcrypt = require('bcrypt')
const auth = require('./middleware')

router.post('/logins', (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
  message: 'Please supply a valid email and password'
    })
  } else {
    User
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: 'User with this email is in SPACE'
          })
        }
        if (bcrypt.compareSync(req.body.password, entity.password)) {

     // 3. if the password is correct, return a JWT with the userId of the user (user.id)
     res.send({
       jwt: toJWT({ userId: entity.id })
     })
   } else {
     res.status(400).send({
        message: 'Password was incorrect'
      })
   }
      })

    .catch(error => next(error))
  }
})

router.get('/secret-endpoint', auth, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
  })
})

module.exports = router
