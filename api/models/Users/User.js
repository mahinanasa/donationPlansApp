const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const User = new Schema ({
  userId: {type: Number},
  name: { type: String, required: true,  },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  totalZakath: { type : Number},
  balanceZakath: { type : Number},
  zakathPercentage: { type : Number}
}, {
  timestamps: true
});
User.plugin(AutoIncrement, {inc_field: 'userId'});
module.exports = mongoose.model('user', User)
