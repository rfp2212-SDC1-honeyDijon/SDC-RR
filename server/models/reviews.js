/* eslint-disable max-len */
const { db } = require('../db');

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
    const response = {};
    response.product = product_id;
    response.page = page;
    response.count = count;

    let sortStr = '';
    if (sort === 'newest') {
      sortStr = 'order by a.date desc';
    } else if (sort === 'helpful') {
      sortStr = 'order by a.helpfulness desc';
    } else if (sort === 'relevant') {
      sortStr = 'order by a.helpfulness desc, a.date desc';
    }
    const queryStr = `select a.id as review_id, a.rating, a.summary, a.recommend, a.response, a.body, to_timestamp(a.date/1000) as date, a.reviewer_name, a.helpfulness, (select array_to_json(coalesce(array_agg(photo), array[]::record[])) from (select p.id, p.url from reviews r inner join reviews_photos p on r.id = p.review_id where p.review_id = a.id) photo) as photos from reviews a where a.reported = false and a.product_id = ${product_id} ${sortStr} offset ${(page - 1) * count} limit ${count}`;
    return db.query(queryStr).then((data) => {
      response.results = data.rows;
      return response;
    });
  },

  getReviewMeta: ({ product_id }) => {
    // const response = {
    //   product_id,
    //   ratings: {},
    //   recommended: {},
    //   characteristics: {},
    // };

    // let ratings = 'select rating, count(1) from reviews where product_id = $1 group by rating';
    // eslint-disable-next-line max-len
    // let recommended = 'select recommend, count(1) from reviews where product_id = $1 group by recommend';
    // eslint-disable-next-line max-len
    // let characteristics = 'select AVG(a.value), b.id, b.name from characteristic_reviews a right join characteristics b on b.id = a.characteristic_id where b.product_id= $1 group by b.id,b.name';
    // let value = [product_id];

    // return db.query(ratings, value)
    //   .then((data) => {
    //     //console.log(data.rows);
    //     data.rows.forEach((row) => {
    //       response.ratings[row.rating] = row.count;
    //     })

    //     return db.query(recommended, value)
    //       .then((data) => {
    //         //console.log('recommend', data.rows);
    //         data.rows.forEach((row) => {
    //           response.recommended[row.recommend] = row.count;
    //         })

    //         return db.query(characteristics, value)
    //           .then((data) => {
    //             console.log('characteristics', data.rows);
    //             data.rows.forEach((row) => {
    //               response.characteristics[row.name] = {};
    //               response.characteristics[row.name].id = row.id;
    //               response.characteristics[row.name].value = row.avg;
    //             })
    //             return response;
    //             // console.log(response);
    //           })
    //       })
    //   }).catch((err) => {
    //     console.error('get meta err', err);
    //   });
    const queryString1 = 'WITH ratings_d AS ( SELECT product_id, rating, count(1) as frequency FROM reviews WHERE product_id = $1 AND reported = false GROUP BY product_id, rating ), recommended_d AS ( SELECT product_id, recommend, count(1) as frequency FROM reviews WHERE product_id = $1 AND reported = false GROUP BY product_id, recommend ), characteristic_d AS ( SELECT c.product_id, c."name", jsonb_build_object(\'id\', c.id, \'value\', AVG(cr."value")::text) AS avgvalue FROM characteristic_reviews cr JOIN reviews r ON r.id = cr.review_id AND r.reported = false AND r.product_id = $1 JOIN characteristics c ON cr.characteristic_id = c.id WHERE c.product_id = $1 GROUP BY c.product_id, c.id, c."name" )';
    const queryString2 = 'SELECT ratings_d.product_id::text, jsonb_object_agg(ratings_d.rating, ratings_d.frequency::text) AS ratings, jsonb_object_agg(recommended_d.recommend, recommended_d.frequency::text) AS recommended, jsonb_object_agg(characteristic_d.name, characteristic_d.avgvalue) AS characteristics FROM ratings_d JOIN recommended_d ON ratings_d.product_id = recommended_d.product_id JOIN characteristic_d ON ratings_d.product_id = characteristic_d.product_id GROUP BY ratings_d.product_id';
    const queryString = queryString1 + queryString2;
    return db.query(queryString, [product_id]).then((data) => data.rows[0]);
  },

  addReviews: (review) => {
    const date = Date.now();
    const queryStr = 'insert into reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *';
    const values = [review.product_id, review.rating, date, review.summary, review.body, review.recommend, review.reported, review.reviewer_name, review.reviewer_email, review.response, review.helpfulness];
    const reviewsQuery = db.query(queryStr, values)
      .then((data) => {
        // console.log('add Reivews return data', data.rows);
        const review_id = data.rows[0].id;
        // console.log(review_id);
        // Do we need to insert into the table characteristic????
        // let product_id = data.rows.product_id;

        const query2 = 'insert into reviews_photos (review_id, url) select review_id, url from unnest ($1::int[], $2::text[]) as p (review_id, url) RETURNING *';
        const value2 = [Array(review.photos.length).fill(review_id), review.photos];
        const photoQuery = db.query(query2, value2)
          .then((data) => {
            // console.log('photos', data.rows);
            const query3 = 'insert into characteristic_reviews (characteristic_id, review_id, value) select characteristic_id, review_id, value from unnest ($1::int[], $2::int[], $3::int[]) as c (characteristic_id, review_id, value) RETURNING *';
            const value3 = [Object.keys(review.characteristics), Array(Object.keys(review.characteristics).length).fill(review_id), Object.values(review.characteristics)];
            return db.query(query3, value3);
          });
        return photoQuery;
      });
    return reviewsQuery;
  },

  updateUseful: (id) => {
    // let queryStr = 'update reviews set helpfulness = (select helpfulness from reviews where id = $1)+1 where id = $1';
    // let value = [id];
    // return db.query(queryStr, value);
    const queryStr = 'update reviews set helpfulness = helpfulness + 1 where id = $1 RETURNING *';
    const value = [id];
    return db.query(queryStr, value);
  },

  updateReport: (id) => {
    const queryStr = 'update reviews set reported = true where id = $1 RETURNING *';
    const value = [id];
    return db.query(queryStr, value);
  },
};
