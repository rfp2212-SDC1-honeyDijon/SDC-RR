const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const fs = require('fs');
const Transform = require('stream').Transform;

//id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
const csvStringifier = createCsvStringifier({
  header: [{
    id: 'id', title: 'id'
  }, {
    id: 'product_id', title: 'product_id'
  }, {
    id: 'rating', title: 'rating'
  },{
    id: 'date', title: 'date'
  }, {
    id: 'summary', title: 'summary'
  }, {
    id: 'body', title: 'body'
  },{
    id: 'recommend', title: 'recommend'
  }, {
    id: 'reported', title: 'reported'
  }, {
    id: 'reviewer_name', title: 'reviewer_name'
  },{
    id: 'reviewer_email', title: 'reviewer_email'
  }, {
    id: 'response', title: 'response'
  }, {
    id: 'helpfulness', title: 'helpfulness'
  },]
});

let readStream = fs.createReadStream('./raw_data/reviews.csv');
let writeStream = fs.createWriteStream('./transformed_data/clean_reviews.csv');

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {
    for (let key in chunk) {
      let trimKey = key.trim();
      chunk[trimKey] = chunk[key];
      if (key !== trimKey) {
        delete chunk[key];
      }
    }
    //filters out all non-number characters
    let onlyIdNumbers = chunk.id.replace(/\D/g, '');
    let onlyReviewIdNumbers = chunk.product_id.replace(/\D/g, '');
    chunk.id = onlyIdNumbers;
    chunk.review_id = onlyReviewIdNumbers;


    //use our csvStringifier to turn our chunk into a csv string
    chunk = csvStringifier.stringifyRecords([chunk]);

    let commaCount = 0;
    let quoteInsertIndex;

    for (let i = 0; i < chunk.length; i++) {
      if (chunk[i] === ',') {
        commaCount++;
        if (commaCount === 11) {
          quoteInsertIndex = i + 1;
        }
      }
    }
    let text = chunk.slice(0, quoteInsertIndex) + '"' + chunk.slice(quoteInsertIndex).trim();
    let result = text.concat(`"\n`);

    this.push(result);

    next();
  }
}

const transformer = new CSVCleaner({ writableObjectMode: true });

writeStream.write(csvStringifier.getHeaderString());
readStream.pipe(csv())
  .pipe(transformer)
  .pipe(writeStream)
  .on('finish', () => {
    console.log('finished transforming reviews');
  });