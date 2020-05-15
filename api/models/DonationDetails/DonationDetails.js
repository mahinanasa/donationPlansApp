const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ProductDetails = new Schema ({
  productId: {type: Number, required: true},
  name: { type: String },
  amount: {type: Number},
  isMonthly : { type: Boolean},
  isOneTime : { type: Boolean},
})


const DonationDetails = new Schema ({
   donationId: {type: Number},
   userId: { type: Number, required: true },
   email: { type : String},
  productDetails: [ProductDetails],
  monthlyPayment : { type : Number },
  totalAmount: {type: Number},
  donationaDate:  { type : Date, default: Date.now },
}, {
    timestamps: true
});

DonationDetails.plugin(AutoIncrement, {inc_field: 'donationId'});

module.exports = mongoose.model('Donation_Details', DonationDetails)
