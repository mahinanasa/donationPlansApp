const config = require('../config')
const { Router } = require('express')

const router = Router()

// Initialize Controller
const productsController = require('../controllers/productsController')

// Get All
router.get('/products', productsController.list)

// router.get('/products', (req,res)=>{
//     console.log("fffff")
//     res.json({"pppp":"fffff"})
// })


// Get One
router.get('/products/:id', productsController.show)

// Create
router.post('/products', config.isAuthenticated, productsController.create)

//Checkout

router.post('/checkout', config.isAuthenticated, productsController.checkout)



// router.post('/products', (req,res)=>{
//     console.log("dd")
//     res.json({"ddd":"ss"})
// })

// // Update
// router.put('/products/:id', config.isAuthenticated, productsController.update)

// // Delete
// router.delete('/products/:id', config.isAuthenticated, productsController.delete)

module.exports = router
