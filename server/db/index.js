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

let save = (/* TODO */data, callback) => {
  let review = new Review(data);
  review.save((err, review)=>{
    if(err){
      callback(err);
      return;
    }
    callback(null, review);
  })
}
// let save1 = (repos)=>{
//   return Promise.all(repos.map(repo=>{
//     return new Repo(repo).save();
//   }))
//   //return Repo.create(repos);
// }

let find = (callback)=>{
  Review.find({}, (err, data)=>{
    if(err){
      callback(err);
      return;
    }
    //console.log('db find data', data.length);
    callback(null, data);
  }).limit(25).sort('-stars');
}

let findUser = (term, callback)=>{
  Review.find(term, (err, data)=>{
    if(err){
      callback(err);
      return;
    }
    callback(null, data);
  }).sort('-stars').limit(25);
}

module.exports.save = save;
module.exports.find = find;
module.exports.findUser = findUser;