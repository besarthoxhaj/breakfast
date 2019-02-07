/**
 * Functions
 *
 *
 */

DROP FUNCTION IF EXISTS print();

CREATE OR REPLACE FUNCTION print() RETURNS VOID AS $$
  BEGIN
    RAISE NOTICE 'Hello, World';
  END;
$$ language 'plpgsql';

SELECT print();


/**
 * Return tables
 */
DROP FUNCTION IF EXISTS myTable();

CREATE OR REPLACE FUNCTION myTable()
RETURNS TABLE (my_column text)
AS $body$
  BEGIN
    RETURN QUERY
    SELECT *
    FROM (VALUES ('t1.01'), ('t1.02'), ('t2.03')) AS t1(c1);
  END;
$body$ language 'plpgsql';

SELECT * FROM myTable();
