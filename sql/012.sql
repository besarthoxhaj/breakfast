/**
 * GROUP BY
 */

DROP TABLE IF EXISTS a CASCADE;

CREATE TABLE a (
  id       SERIAL PRIMARY KEY,
  country  VARCHAR(20),
  city     VARCHAR(20),
  pop      INTEGER
);

INSERT INTO a (country, city, pop) VALUES ('US', 'Foo', 5);
INSERT INTO a (country, city, pop) VALUES ('EU', 'Foo', 3);
INSERT INTO a (country, city, pop) VALUES ('US', 'Bar', 5);
INSERT INTO a (country, city, pop) VALUES ('EU', 'Laa', 8);
INSERT INTO a (country, city, pop) VALUES ('EU', 'Bar', 2);
INSERT INTO a (country, city, pop) VALUES ('IT', 'Bar', 2);

SELECT country, sum(pop)
FROM a
WHERE country = 'US'
GROUP BY country;
