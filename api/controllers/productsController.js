const ProductMaster = require('../models/Products/ProductMaster');
const DonationDetails = require('../models/DonationDetails/DonationDetails');
const User = require('../models/Users/User')
const validator = require('express-validator');

// Get all
module.exports.list = function (req, res, next) {
  ProductMaster.find({}, function(err, products){
    if(err) {
        return res.status(500).json({
            message: 'Error getting records.'
        });
    }
    return res.json(products);
  });
}



// Get one
module.exports.show = function(req, res) {
  var id = req.params.id;
  ProductMaster.findOne({_id: id}, function(err, product){
      if(err) {
          return res.status(500).json({
              message: 'Error getting record.'
          });
      }
      if(!product) {
          return res.status(404).json({
              message: 'No such record'
          });
      }
      return res.json(product);
  });
}


// Create
module.exports.create = [
  function(req, res) {

    var product = new ProductMaster({
      name : req.body.name,
      raisedFund : req.body.raisedFund != undefined && req.body.raisedFund != 0 ? req.body.raisedFund : 0,
      totalFund : req.body.totalFund,
      daysLeft : req.body.daysLeft != undefined && req.body.daysLeft != 0 ? req.body.daysLeft : 30,
      currency : req.body.currency,
      amount : req.body.amount,

    })
    // save record
    product.save(function(err, products){
        if(err) {
            return res.status(500).json({
                message: 'Error inserting product',
                error: err
            });
        }
        return res.json({
            message: 'saved',
        });
    })
  }
]


// Insert Checkout Details
module.exports.checkout = [
  async function(req, res) {
    try {
      let DonationDetailsData = new DonationDetails( req.body );
      // save record
      let updatedPdtsArr = []
      //Save Donation Details
      let DonationRes =  await DonationDetailsData.save()

      //Update raisedFund
      for ( let pdt of req.body.productDetails ) {
        let updatedPdt = await ProductMaster.findOneAndUpdate(
          {productId: pdt.productId},
          {$inc: { raisedFund: req.body.totalAmount}},
          { upsert: true, new: true }     // need these options
        );
        updatedPdtsArr.push(updatedPdt)
      }

      //Get all Product for updating frontend
      let updatedProducts = await ProductMaster.find({})

      //Updating Balance Zakath
      let negativeTotal = -req.body.totalAmount
      let updatedUser = await User.findOneAndUpdate(
        {userId: req.body.userId},
        {$inc: { balanceZakath: negativeTotal}},
        { upsert: true, new: true }     // need these options
      );
      return res.json({
        message: 'saved',
        data : updatedProducts,
        user : updatedUser
    });

    } catch (err) {
      console.log('err' + err);
      res.status(500).send(err);
    }
    
  

  }
]

