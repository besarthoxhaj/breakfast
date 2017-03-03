/**
 *
 * `SERIAL` data type defines
 */

DROP TABLE IF EXISTS student CASCADE;

CREATE TABLE student (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(20),
  age         INTEGER,
  discipline  VARCHAR(5)
);

INSERT INTO student (name,discipline) VALUES ('James','KB');
INSERT INTO student (name,discipline) VALUES ('James','SL');
INSERT INTO student (name,discipline) VALUES ('Pit','GS');
INSERT INTO student (name,discipline) VALUES ('Lauson','SL');
INSERT INTO student (name,discipline) VALUES ('Paul','DH');
INSERT INTO student (name,discipline) VALUES ('Adam','SG');
INSERT INTO student (name,discipline) VALUES ('Nick','SG');
INSERT INTO student (name,discipline) VALUES ('Alan','MM');
INSERT INTO student (name,discipline) VALUES ('Alexander','SS');
INSERT INTO student (name,discipline) VALUES ('Brad','DH');
INSERT INTO student (name,discipline) VALUES ('Fabian','DH');
INSERT INTO student (name,discipline) VALUES ('Geoff','DH');
INSERT INTO student (name,discipline) VALUES ('Julian','DH');
INSERT INTO student (name,discipline) VALUES ('Julian','SL');
INSERT INTO student (name,discipline) VALUES ('Jozy','KB');
INSERT INTO student (name,discipline) VALUES ('Jack','LL');
INSERT INTO student (name,discipline) VALUES ('Zoo',NULL);

/**
 * `PRIMARY KEY` - https://goo.gl/SxtCG1
 * A constraint which defines a `UNIQUE` and `NOT NULL` constraint.
 */

-- INSERT INTO student (id,name,discipline) VALUES (20,'Same Dude 1','KB');
-- INSERT INTO student (id,name,discipline) VALUES (20,'Same Dude 2','KB');
-- INSERT INTO student (id,name,discipline) VALUES (NULL,'Same Dude 3','KB');

/**
 * `SERIAL` - https://goo.gl/4chztF
 * Is not a true type (see ). It creates a column of integers which
 * increments for every new entry it also add a `NOT NULL` constraint.
 */

-- INSERT INTO student (id,name,discipline) VALUES (14,'Bes','KB');
-- INSERT INTO student (name,discipline) VALUES ('Izaak','GG');
-- INSERT INTO student (name,discipline) VALUES ('Ale','SS');
