const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ProductMaster = new Schema ({
 // _id: mongoose.Schema.Types.ObjectId,
   productId: {type: Number},
  name: { type: String, required: true },
  raisedFund: { type: Number },
  totalFund: { type: Number, required: true },
  daysLeft:{ type: Number},
  currency: { type: String },
  amount: {type: Number}
}, {
  timestamps: true
});

ProductMaster.plugin(AutoIncrement, {inc_field: 'productId'});

module.exports = mongoose.model('product_master', ProductMaster)
