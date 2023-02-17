const axios = require('axios');
const {db} = require('../db');

// const endpoint = `${process.env.BASEURL}/reviews`;
// const authHeader = {
//   Authorization: process.env.TOKEN,
// };

module.exports = {
  getReviews: ({
    page = 1,
    count = 5,
    sort = 'relevant',
    product_id,
  }) => {
    // let queryStr = 'select * from reviews where product_id = "' + product_id+'" order by "'+sort+'" desc  offset "'+page+'" limit "'+count+'" ';
    let queryStr = 'select * from reviews where product_id = $1 order by $2 desc  offset $3 limit $4';
    let value = [product_id, sort, (page-1)*count, count];
    return db.query(queryStr, value);
  },

  getReviewMeta: ({ product_id }) => {
    const options = {
      url: `${endpoint}/meta`,
      method: 'get',
      headers: authHeader,
      params: { product_id },
    };
    return axios(options);
  },

  addReviews: (review, callback) => {
    let date = new Date();
    let queryStr = 'insert into reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *';
    let values = [review.product_id,review.rating, date, review.summary,review.body,review.recommend,review.reported, review.reviewer_name, review.reviewer_email, review.response, review.helpfulness]
    let reviewsQuery =  db.query(queryStr, values)
    .then((data)=>{
      //console.log('add Reivews return data', data.rows);
      let review_id = data.rows.id;
      if(review.photos.length === 0){
        return;
      }else{
        review.photos.forEach((url)=>{
          let query2 = 'insert into reviews_photos (review_id, url) values ($1, $2)';
          let value2 = [ review_id, url];
          /*start from here*/

        })
      }

    }).catch((err)=>{

    });
    return reviewsQuery;
  },

  updateUseful: (id) => {
    const options = {
      url: `${endpoint}/${id}/helpful`,
      method: 'put',
      headers: authHeader,
    };
    return axios(options);
  },

  updateReport: (id) => {
    const options = {
      url: `${endpoint}/${id}/report`,
      method: 'put',
      headers: authHeader,
    };
    return axios(options);
  },
};
