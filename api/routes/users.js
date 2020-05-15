const config = require('../config')
const { Router } = require('express')

const router = Router()

// Initialize Controller
const usersController = require('../controllers/usersController')

// Register
router.post('/users/register', usersController.register)

// Login
router.post('/users/login', usersController.login)

// Get User
router.get('/users/user', usersController.user)

router.get('/users/userDetails', usersController.userDetails)


module.exports = router
