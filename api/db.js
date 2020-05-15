const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:password123@ds159100.mlab.com:59100/donation_cart', {
                            useNewUrlParser: true,
                            //useUnifiedTopology: true,
                            useFindAndModify: false,
                            useCreateIndex: true
                          });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("MongoDB Connected...");
});


module.exports = db
