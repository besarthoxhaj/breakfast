/**
 *
 * `SERIAL` data type defines
 */

DROP TABLE IF EXISTS guest CASCADE;

CREATE TABLE guest (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(20),
  year        INTEGER,
  spent       INTEGER
);

INSERT INTO guest (name,year,spent) VALUES ('James',2005,11);
INSERT INTO guest (name,year,spent) VALUES ('James',2006,12);
INSERT INTO guest (name,year,spent) VALUES ('Pit',2006,11);
INSERT INTO guest (name,year,spent) VALUES ('Lauson',2005,13);
INSERT INTO guest (name,year,spent) VALUES ('Paul',2006,43);
INSERT INTO guest (name,year,spent) VALUES ('Adam',2005,12);