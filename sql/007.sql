DROP TABLE IF EXISTS a CASCADE;

CREATE TABLE a (
  id    SERIAL PRIMARY KEY,
  url   VARCHAR(20),
  short VARCHAR(20)
);

INSERT INTO a (url, short) VALUES ('http://foo.com/hel', 'aa');
INSERT INTO a (url, short) VALUES ('http://bar.org/bes', 'ab');
INSERT INTO a (url, short) VALUES ('http://bar.net/qoo', 'ba');
INSERT INTO a (url, short) VALUES ('http://foo.org/bpo', 'bb');
INSERT INTO a (url, short) VALUES ('http://foo.com/bes', 'cc');
INSERT INTO a (url, short) VALUES ('http://zoo.com/bes', 'ac');

-- SELECT urlSource, Count(urlSource)
-- FROM (
--   SELECT
--     CASE
--       WHEN aa.url LIKE '%foo%' THEN 'foo'
--       WHEN aa.url LIKE '%bar%' THEN 'bar'
--     END AS urlSource
--   FROM a aa
-- ) AS aaa
-- GROUP BY urlSource;

-- WITH newTable AS (
--   SELECT
--     CASE
--       WHEN aa.url LIKE '%foo%' THEN 'foo'
--       WHEN aa.url LIKE '%bar%' THEN 'bar'
--     END AS urlSource
--   FROM a as aa
-- )
-- SELECT urlSource, Count(urlSource)
-- FROM newTable
-- GROUP BY urlSource;
