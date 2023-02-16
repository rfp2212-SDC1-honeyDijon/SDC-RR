const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let reviewSchema = mongoose.Schema({
  review_id: {type: Number, unique: true},
  product_id: Number,
  rating: Number,
  summary: String,
  recommend: {type:Boolean, default: false},
  response: String,
  body: String,
  date: {type:Date, default: Date.now},
  reviewer_name: String,
  email: String,
  helpfulness: Number,
  report : {type:Boolean, default: false},
  photos: [String],
  characteristics:String
});

let Review = mongoose.model('Review', reviewSchema);

let save = (/data, callback) => {
  let review = new Review(data);
  review.save((err, review)=>{
    if(err){
      callback(err);
      return;
    }
    callback(null, review);
  })
}

let find = (callback)=>{
  Review.find({}, (err, data)=>{
    if(err){
      callback(err);
      return;
    }
    callback(null, data);
  });
}

module.exports.save = save;
module.exports.find = find;