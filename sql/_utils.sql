/**
 * Utils
 */

DROP FUNCTION IF EXISTS random_string();
DROP FUNCTION IF EXISTS random_string();

-- CREATE OR REPLACE FUNCTION random_string(length INT)
-- RETURNS VARCHAR
-- AS $body$
--   BEGIN
--     RETURN substring(MD5(random()::text), 1, $1);
--   END
-- $body$ language 'plpgsql';

CREATE OR REPLACE FUNCTION get_random_id_from_table(table_ref TEXT)
RETURNS integer AS
$body$
  BEGIN
    RETURN 1;
    -- RETURN (
      -- SELECT 1
      -- FROM table_ref
      -- ORDER BY RANDOM()
      -- LIMIT 1
    -- )
  END
$body$ LANGUAGE 'plpgsql';
