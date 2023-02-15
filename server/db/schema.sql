CREATE DATABASE sdc;

USE sdc;


CREATE TABLE reviews(
  id int not null auto_increment primary key,
  product_id int not null,
  rating int not null,
  summary varchar(70),
  recommend char(1) default 0,
  response varchar(1000),
  body varchar(1100) not null,
  date timestamp not null,
  reviewer_name varchar(50),
  email varchar(50),
  helpfulness int not null,
  report char(1) default 0
);

-- update after insert a new review record
create table reviews_photo(
  id int not null auto_increment primary key,
  review_id int not null,
  url varchar(100) not null
);

-- create table reviews_size(
--   id int not null auto_increment primary key,
--   review_id int not null,
--   value decimal(17, 16)
-- );
-- create table  reviews_width(
--   id int not null auto_increment primary key,
--   review_id int not null,
--   value decimal(17, 16)
-- )
-- create table reviews_fit(
--   id int not null auto_increment primary key,
--   review_id int not null,
--   value decimal(17, 16)
-- );
-- create table  reviews_comfort(
--   id int not null auto_increment primary key,
--   review_id int not null,
--   value decimal(17, 16)
-- )
-- create table reviews_quality(
--   id int not null auto_increment primary key,
--   review_id int not null,
--   value decimal(17, 16)
-- );
-- create table  reviews_length(
--   id int not null auto_increment primary key,
--   review_id int not null,
--   value decimal(17, 16)
-- )
CREATE TABLE IF NOT EXISTS characteristics_name (
  id SERIAL PRIMARY KEY,
  product_id int,
  name VARCHAR
);
CREATE TABLE IF NOT EXISTS reviews_characteristics (
  id SERIAL PRIMARY KEY,
  review_id int,
  characteristics_id int,
  value int
);

-- add a new review to a product, the row will be updating
create table reviews_meta (
  id INT not null auto_increment primary key,
  product_id int not null unique,
  ratings json,
  recommend json,
  characteristics json
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/