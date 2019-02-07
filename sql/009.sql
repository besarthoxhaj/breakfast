/**
 * JOINS
 *
 * Find which value of `a` matches `foo`.
 */

\i _settings.sql;

DROP TABLE IF EXISTS a CASCADE;
DROP TABLE IF EXISTS b CASCADE;
DROP TABLE IF EXISTS c CASCADE;

CREATE TABLE a (
  id    VARCHAR(20) PRIMARY KEY,
  id_b  VARCHAR(20),
  price INT
);

CREATE TABLE b (
  id    VARCHAR(20) PRIMARY KEY,
  id_c  VARCHAR(20)
);

CREATE TABLE c (
  id    VARCHAR(20) PRIMARY KEY,
  name  VARCHAR(20)
);

INSERT INTO a (id, id_b, price) VALUES ('a.01', 'b.01', 4);
INSERT INTO a (id, id_b, price) VALUES ('a.02', 'b.01', 2);
INSERT INTO a (id, id_b, price) VALUES ('a.03', 'b.02', 3);

INSERT INTO b (id, id_c) VALUES ('b.01', 'c.01');
INSERT INTO b (id, id_c) VALUES ('b.02', 'c.02');
INSERT INTO b (id, id_c) VALUES ('b.03', 'c.02');
INSERT INTO b (id, id_c) VALUES ('b.04', 'c.03');

INSERT INTO c (id, name) VALUES ('c.01', 'foo');
INSERT INTO c (id, name) VALUES ('c.02', 'bar');
INSERT INTO c (id, name) VALUES ('c.03', 'zoo');

/**
 * 1st
 *
 */
\echo '1st attempt -------------------------------------------------';
SELECT c.name, a.price
  FROM c
    INNER JOIN b ON (c.id = b.id_c AND c.name = 'foo')
    INNER JOIN a ON (b.id = a.id_b);

/**
 * 2nd
 *
 */
\echo '2nd attempt -------------------------------------------------';
SELECT c.name, a.price
FROM a, b, c
WHERE c.id = b.id_c AND c.name = 'foo' AND b.id = a.id_b;

/**
 * 3rd
 *
 */
\echo '3rd attempt -------------------------------------------------';
SELECT c.name, a.price
  FROM c
    JOIN b ON (c.id = b.id_c)
    JOIN a ON (b.id = a.id_b)
  WHERE c.name = 'foo';


/**
 * 4th
 *
 */
\echo '4th attempt -------------------------------------------------';
SELECT SUM(a.price)
  FROM c
    JOIN b ON (c.id = b.id_c)
    JOIN a ON (b.id = a.id_b)
  WHERE c.name = 'foo';
