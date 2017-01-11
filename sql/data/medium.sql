/**
 * There a 3 tables
 *
 * Customers
 * Salesman
 * Product
 *
 * Questions:
 * Is SERIAL automatically PRIMARY KEY?
**/

\echo "Uploading medium tables";

DROP TABLE IF EXISTS "customer" CASCADE;
DROP TABLE IF EXISTS "salesman" CASCADE;
DROP TABLE IF EXISTS "order" CASCADE;
DROP TABLE IF EXISTS "product" CASCADE;

CREATE TABLE salesman (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(20),
  city        VARCHAR(20),
  commission  NUMERIC(3,2)
);

CREATE TABLE customer (
  id     SERIAL,
  name   VARCHAR(20),
  city   VARCHAR(20),
  grade  NUMERIC(5,0)
);

CREATE TABLE product (
  id           SERIAL,
  name         VARCHAR(20),
  description  TEXT,
  price        NUMERIC(8,2)
);

CREATE TABLE "order" (
  id           SERIAL,
  month        VARCHAR(20),
  quantity     INTEGER NOT NULL,
  product_id   INTEGER,
  salesman_id  INTEGER,
  customer_id  INTEGER
);

INSERT INTO salesman (name,city,commission) VALUES ('James Hoog','New York',0.15);
INSERT INTO salesman (name,city,commission) VALUES ('Pit Alex','London',0.11);
INSERT INTO salesman (name,city,commission) VALUES ('Mc Lyon','Paris',0.14);
INSERT INTO salesman (name,city,commission) VALUES ('Lauson Hen','',0.12);
INSERT INTO salesman (name,city,commission) VALUES ('Paul Adam','Rome',0.13);

INSERT INTO customer (name,city) VALUES ('Nick Rimando','New York');
INSERT INTO customer (name,city) VALUES ('Graham Zusi','California');
INSERT INTO customer (name,city) VALUES ('Brad Guzan','London');
INSERT INTO customer (name,city) VALUES ('Fabian Johns','Paris');
INSERT INTO customer (name,city) VALUES ('Brad Davis','New York');
INSERT INTO customer (name,city) VALUES ('Geoff Camero','Berlin');
INSERT INTO customer (name,city) VALUES ('Julian Green','London');
INSERT INTO customer (name,city) VALUES ('Jozy Altidor','Moscow');

INSERT INTO product (name,description,price) VALUES ('iPhone','Apple best product',700.00);
INSERT INTO product (name,description,price) VALUES ('Coke','Sugar drink',0.50);
INSERT INTO product (name,description,price) VALUES ('Ferrari','Motor car',110000.00);
INSERT INTO product (name,description,price) VALUES ('Blender','Makes great smoothes',10.50);

INSERT INTO "order" (month,quantity,product_id,salesman_id,customer_id) VALUES (
  'Jan',
  10,
  (SELECT id FROM product WHERE name = 'Coke'),
  (SELECT id FROM salesman WHERE name = 'James Hoog'),
  (SELECT id FROM customer WHERE name = 'Nick Rimando')
);
INSERT INTO "order" (month,quantity,product_id,salesman_id,customer_id) VALUES (
  'Jan',
  1,
  (SELECT id FROM product WHERE name = 'Ferrari'),
  (SELECT id FROM salesman WHERE name = 'Paul Adam'),
  (SELECT id FROM customer WHERE name = 'Jozy Altidor')
);
INSERT INTO "order" (month,quantity,product_id,salesman_id,customer_id) VALUES (
  'Jan',
  1,
  (SELECT id FROM product WHERE name = 'Ferrari'),
  (SELECT id FROM salesman WHERE name = 'Paul Adam'),
  (SELECT id FROM customer WHERE name = 'Geoff Camero')
);
INSERT INTO "order" (month,quantity,product_id,salesman_id,customer_id) VALUES (
  'Feb',
  2,
  (SELECT id FROM product WHERE name = 'Blender'),
  (SELECT id FROM salesman WHERE name = 'James Hoog'),
  (SELECT id FROM customer WHERE name = 'Graham Zusi')
);
