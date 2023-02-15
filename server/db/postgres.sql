CREATE DATABASE sdc1;

\c sdc1;

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  product_id int,
  rating int,
  date timestamp,
  summary varchar,
  body varchar,
  recommend boolean DEFAULT false,
  reported boolean DEFAULT false,
  reviewer_name varchar,
  email varchar,
  response varchar,
  helpfulness int DEFAULT 0
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  url VARCHAR,
  review_id int
);

-- name here will be size, width, fit, length, quality,comfort
CREATE TABLE IF NOT EXISTS characteristics (
  id SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE IF NOT EXISTS characteristics_reviews (
  id SERIAL PRIMARY KEY,
  review_id int,
  characteristics_id int,
  value int
);

