const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const fs = require('fs');
const Transform = require('stream').Transform;

const csvStringifier = createCsvStringifier({
  header: [{
    id: 'id', title: 'id'
  }, {
    id: 'product_id', title: 'product_id'
  }, {
    id: 'name', title: 'name'
  }]
});

let readStream = fs.createReadStream('./raw_data/characteristics.csv');
let writeStream = fs.createWriteStream('./transformed_data/clean_characteristics.csv');

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
    let onlyProductIdNumbers = chunk.product_id.replace(/\D/g, '');
    chunk.id = onlyIdNumbers;
    chunk.product_id = onlyProductIdNumbers;


    //use our csvStringifier to turn our chunk into a csv string
    chunk = csvStringifier.stringifyRecords([chunk]);

    let commaCount = 0;
    let quoteInsertIndex;

    for (let i = 0; i < chunk.length; i++) {
      if (chunk[i] === ',') {
        commaCount++;
        if (commaCount === 2) {
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
    console.log('finished transforming characteristics');
  });