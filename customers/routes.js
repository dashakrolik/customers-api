const { Router } = require('express')
const Customer = require('./model')

const router = new Router()

router.get('/customers', (req, res, next) => {
  Customer
    .findAll()
    .then(customers => {
      res.send({ customers })
    })
    .catch(error => next(error))
})

router.get('/customers/:id', (req, res, next) => {
  Customer
    .findById(req.params.id)
    .then(customer => {
      if (!customer) {
        return res.status(404).send({
          message: `Customer does not exist`
        })
      }
      return res.send(customer)
    })
    .catch(error => next(error))
})

router.post('/customers', (req, res, next) => {
  Customer
    .create(req.body)
    .then(customer => {
      if (!customer) {
        return res.status(404).send({
          message: `Customer does not exist`
        })
      }
      return res.status(201).send(customer)
    })
    .catch(error => next(error))
})

router.put('/customers/:id', (req, res, next) => {
  Customer
    .findById(req.params.id)
    .then(customer => {
      if (!customer) {
        return res.status(404).send({
          message: `Customer does not exist`
        })
      }
      return customer.update(req.body).then(customer => res.send(customer))
    })
    .catch(error => next(error))
})

router.delete('/customers/:id', (req, res, next) => {
  Customer
    .findById(req.params.id)
    .then(customer => {
      if (!customer) {
        return res.status(404).send({
          message: `Customer does not exist`
        })
      }
      return customer.destroy()
        .then(() => res.send({
          message: `Customer was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = router
