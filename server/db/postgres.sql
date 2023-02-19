CREATE DATABASE sdc;

\c sdc;

CREATE TABLE IF NOT EXISTS reviews (
  id serial PRIMARY KEY,
  product_id int,
  rating int,
  date bigint,
  summary varchar,
  body varchar,
  recommend boolean DEFAULT false,
  reported boolean DEFAULT false,
  reviewer_name varchar(50),
  reviewer_email varchar(50),
  response varchar,
  helpfulness int DEFAULT 0
);

CREATE TABLE IF NOT EXISTS reviews_photos (
  id serial PRIMARY KEY,
  review_id int,
  url VARCHAR(2048) not null
);

-- name here will be size, width, fit, length, quality,comfort
CREATE TABLE IF NOT EXISTS characteristics (
  id serial PRIMARY KEY,
  product_id int,
  name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS characteristic_reviews (
  id serial PRIMARY KEY,
  characteristic_id int,
  review_id int,
  value int
);

create index product_id_idx on reviews (product_id);
create index review_id_idx on reviews_photos(review_id);
create index productId_idx on characteristics(product_id);
create index reviewId_idx on characteristic_reviews(review_id);



COPY characteristic_reviews FROM '/Users/demi/Desktop/sprint/SDC-RR/server/db/ETL/transformed_data/clean_characteristic_reviews.csv' WITH (FORMAT CSV, HEADER true);
COPY characteristics FROM '/Users/demi/Desktop/sprint/SDC-RR/server/db/ETL/transformed_data/clean_characteristics.csv' WITH (FORMAT CSV, HEADER true);
COPY reviews_photos FROM '/Users/demi/Desktop/sprint/SDC-RR/server/db/ETL/transformed_data/clean_reviews_photos.csv' WITH (FORMAT CSV, HEADER true);
COPY reviews FROM '/Users/demi/Desktop/sprint/SDC-RR/server/db/ETL/transformed_data/clean_reviews.csv' WITH (FORMAT CSV, HEADER true);


-- select b.id, b.name, AVG(a.value) from characteristic_reviews a right join characteristics b on b.id = a.characteristic_id where b.product_id=40345 group by b.name, b.id;
-- select b.name, AVG(a.value) from characteristic_reviews a right join characteristics b on b.id = a.characteristic_id where b.product_id=40345 group by b.name;
-- select recommend, count(1) from reviews where product_id = 40344 group by recommend;
-- select rating, count(1) from reviews where product_id = 40344 group by rating;
-- update reviews set helpfulness = helpfulness + 1 where id = 1;
-- insert into reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) values (40344,4,1674989326908,'test summay','I really like it this product is so so so so good',true,false,'rong','111@gmail.com','',8);
-- select a.id as review_id, a.rating, a.summary, a.recommend, a.response, a.body, to_timestamp(CAST((SUBSTRING(a.date, 1, 10)) AS int )) as date, a.reviewer_name, a.helpfulness, (select array_to_json(coalesce(array_agg(photo), array[]::record[])) from (select p.id, p.url from reviews r inner join reviews_photos p on r.id = p.review_id where p.review_id = a.id) photo) as photos from reviews a where a.reported = false and a.product_id = 40344 order by helpfulness desc offset 3 limit 5;
-- select a.id as review_id, a.rating, a.summary, a.recommend, a.response, a.body, to_timestamp(a.date/1000) as date, a.reviewer_name, a.helpfulness, (select array_to_json(coalesce(array_agg(photo), array[]::record[])) from (select p.id, p.url from reviews r inner join reviews_photos p on r.id = p.review_id where p.review_id = a.id) photo) as photos from reviews a where a.reported = false and a.product_id = 40344 order by helpfulness desc offset 3 limit 5;

