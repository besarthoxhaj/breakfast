/**
 * Joins
 */

DROP TABLE IF EXISTS a CASCADE;
DROP TABLE IF EXISTS b CASCADE;
DROP TABLE IF EXISTS c CASCADE;

CREATE TABLE a (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(20),
  num  INTEGER
);

CREATE TABLE b (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(20),
  num  INTEGER
);

CREATE TABLE c (
  id    SERIAL PRIMARY KEY,
  price INTEGER
);

INSERT INTO a (name,num) VALUES ('A.foo',10);
INSERT INTO a (name,num) VALUES ('A.bar',11);
INSERT INTO a (name,num) VALUES ('A.zoo',12);
INSERT INTO b (name,num) VALUES ('B.foo',10);
INSERT INTO b (name,num) VALUES ('B.bar',21);
INSERT INTO c (price) VALUES (100);
INSERT INTO c (price) VALUES (101);
INSERT INTO c (price) VALUES (102);

/**
 * Simple from, implicit join
 */

-- SELECT *
-- FROM a, b, c;

/**
 * Show all table a and if there are matches show the
 * tupel for b.
 */

SELECT *
FROM a FULL JOIN b ON (a.num = b.num);