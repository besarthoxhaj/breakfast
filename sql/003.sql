

\i _settings.sql;
\i data/students.sql;


/**
 * `SELECT` - https://goo.gl/mdit3x
 * It is a `command` which accepts many `clause` parameters.
 */



-- SELECT * FROM student;


-- SELECT DISTINCT name, discipline FROM student;
-- SELECT DISTINCT ON (discipline, name) discipline, name FROM student;
-- 
-- SELECT DISTINCT ON (discipline) discipline, name FROM student;


/**
 * DISTINCT vs DISTINCT ON
 * It's a clause which removes duplicates. The clause can be defined on
 * a single column or a combination of columns.
 */
-- \echo "`SELECT DISTINCT name FROM student;`";
-- SELECT DISTINCT name FROM student;
-- \echo "`SELECT DISTINCT ON (name) name FROM student;`";
-- SELECT DISTINCT ON (name) name FROM student;

/**
 * 
 */

-- SELECT *
-- FROM student;

/**
 * How many student are taking SL?
 * Why `Count(*)`
 */

-- SELECT Count(name) -- try with `age` and will return 0
-- FROM   student
-- WHERE  discipline = 'SL';

/**
 * Select all distinct people whos name starts with J?
 */

-- SELECT DISTINCT ON (name) * 
-- FROM student
-- WHERE name LIKE 'J%';

/**
 * Who are the students whose name doesn't starts with 'J'?
 */

-- SELECT DISTINCT ON (name) *
-- FROM student
-- WHERE name NOT LIKE 'J%';

/**
 * How many students names starts with 'J', how many with
 * 'A'?
 */

WITH people AS (
  SELECT DISTINCT ON (name)
    CASE
      WHEN s.name LIKE 'J%' THEN 'J'
      WHEN s.name LIKE 'A%' THEN 'A'
    END as nameType
  FROM student s
  WHERE (name LIKE 'J%') OR (name LIKE 'A%'))
SELECT nameType, Count(*)
FROM people
WHERE nameType IN ('J','A')
GROUP BY nameType;


