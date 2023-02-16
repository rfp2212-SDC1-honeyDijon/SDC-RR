CREATE DATABASE sdc1;

\c sdc1;

CREATE TABLE IF NOT EXISTS reviews (
  id serial PRIMARY KEY,
  product_id int,
  rating int,
  date timestamp,
  summary varchar,
  body varchar,
  recommend boolean DEFAULT false,
  reported boolean DEFAULT false,
  reviewer_name varchar,
  reviewer_email varchar,
  response varchar,
  helpfulness int DEFAULT 0
);

CREATE TABLE IF NOT EXISTS reviews_photos (
  id serial PRIMARY KEY,
  review_id int,
  url VARCHAR
);

-- name here will be size, width, fit, length, quality,comfort
CREATE TABLE IF NOT EXISTS characteristics (
  id serial PRIMARY KEY,
  product_id int,
  name VARCHAR
);

CREATE TABLE IF NOT EXISTS characteristics_reviews (
  id serial PRIMARY KEY,
  characteristic_id int,
  review_id int,
  value int
);

-- CREATE TABLE IF NOT EXISTS reviews_meta (
--   id int not null auto_increment primary key,
--   product_id int not null unique,
--   ratings text,
--   recommend text,
--   characteristics text
-- );
