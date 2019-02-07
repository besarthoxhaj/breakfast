/**
 * Indexes
 */

\i _settings.sql;

DROP FUNCTION IF EXISTS random_string();
DROP TABLE IF EXISTS random_data CASCADE;

\echo 'Define util functions'

array_to_string

/**
 * array_to_string(
 *  @array,
 *  @delimiter,
 *  @null_replacement
 * )
 *
 * eg
 * array_to_string(ARRAY[1, NULL, 3], ',', '*')
 * 1, *, 3
 *
 * chr(@number)
 *
 *
 */
CREATE OR REPLACE FUNCTION random_string(length INT)
RETURNS VARCHAR
AS $body$
  BEGIN
    RETURN substring(MD5(random()::text), 1, $1);
  END
$body$ language 'plpgsql';



\echo 'Populating random data table'

-- CREATE TABLE random_data_a (
--   id    SERIAL PRIMARY KEY,
--   name  VARCHAR(5)
-- );
--
-- CREATE TABLE random_data_b (
--   id    SERIAL PRIMARY KEY,
--   name  VARCHAR(5)
-- );
--
-- SELECT INTO random_data_a
-- FROM (random()::text);

-- SELECT 'fdas' AS boom ;

-- CREATE TABLE random_data () AS (
--     SELECT id
--     FROM generate_Series(1, 50000) id
--   );
--
-- \echo 'Counting...'
--
-- SELECT count(*) FROM random_data;


SELECT array_to_string(
  ARRAY(
    SELECT chr((97 + round(random() * 25))::int)
FROM generate_series(1, 15)), '');
