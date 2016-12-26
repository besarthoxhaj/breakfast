/**
 * Create tables and insert data.
 * Reference guide:
 * - CREATE TABLE: https://goo.gl/H2Q6Lm
 * - INSERT: https://goo.gl/nZGcTL
 */

\echo "Deleting tables and creating them from scratch";

DROP TABLE IF EXISTS "player" CASCADE;
DROP TABLE IF EXISTS "stats" CASCADE;

CREATE TABLE "player" (
  "name"   VARCHAR(20),
  "number" INT PRIMARY KEY
);

CREATE TABLE "stats" (
  "number"      INT,
  "total_points" INT,
  "year"        VARCHAR(20),
  CONSTRAINT "stats_number_fkey" FOREIGN KEY ("number") REFERENCES "player" ("number"),
  CONSTRAINT "points_more_than_10" CHECK ("total_points" > 10)
);

/**
 * 
 */
\echo "Tables created, checking results.";
\d+ "player";
\d+ "stats";

INSERT INTO "player" ("name","number") VALUES ('larry smith',23);
INSERT INTO "player" ("name","number") VALUES ('david gonzalez',12);
INSERT INTO "player" ("name","number") VALUES ('george rogers',7);
INSERT INTO "player" ("name","number") VALUES ('mike lee',14);
INSERT INTO "player" ("name","number") VALUES ('rajiv williams',55);
INSERT INTO "player" ("name","number") VALUES ('bill henry',50);

INSERT INTO "stats" ("number","total_points","year") VALUES (7,59,'freshman');
INSERT INTO "stats" ("number","total_points","year") VALUES (55,90,'senior');
INSERT INTO "stats" ("number","total_points","year") VALUES (23,150,'senior');
INSERT INTO "stats" ("number","total_points","year") VALUES (23,221,'junior');
INSERT INTO "stats" ("number","total_points","year") VALUES (55,84,'junior');

