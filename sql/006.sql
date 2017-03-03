DROP TABLE IF EXISTS a CASCADE;

CREATE TABLE a (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(20)
);

INSERT INTO a (name) VALUES ('foo');
INSERT INTO a (name) VALUES ('bar');
INSERT INTO a (name) VALUES ('bar');
INSERT INTO a (name) VALUES ('foo');
INSERT INTO a (name) VALUES ('foo');

SELECT name, Count(name)
FROM (
  SELECT *
  FROM a
) AS b
GROUP BY name;