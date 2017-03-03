/**
 *
 * 
 */

DROP TABLE IF EXISTS student CASCADE;

CREATE TABLE student (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(20),
  discipline  VARCHAR(5)
);

INSERT INTO student (name,discipline) VALUES ('James','KB');
INSERT INTO student (name,discipline) VALUES ('James','KB');
INSERT INTO student (name,discipline) VALUES ('Pit','GS');
INSERT INTO student (name,discipline) VALUES ('Lauson','SL');
INSERT INTO student (name,discipline) VALUES ('Paul','DH');
INSERT INTO student (name,discipline) VALUES ('Adam','SG');
INSERT INTO student (name,discipline) VALUES ('Nick','SG');
INSERT INTO student (name,discipline) VALUES ('Brad','DH');
INSERT INTO student (name,discipline) VALUES ('Fabian','DH');
INSERT INTO student (name,discipline) VALUES ('Geoff','DH');
INSERT INTO student (name,discipline) VALUES ('Julian','DH');
INSERT INTO student (name,discipline) VALUES ('Julian','SL');
INSERT INTO student (name,discipline) VALUES ('Jozy','KB');
