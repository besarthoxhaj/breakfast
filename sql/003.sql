

\i _settings.sql;
\i data/students.sql;

/**
 * DISTINCT
 * It's a clause which removes duplicates. The clause can be defined on
 * a single column or a combination of columns.
 */

SELECT DISTINCT name, discipline FROM student;
SELECT DISTINCT ON (discipline, name) discipline, name FROM student;

SELECT DISTINCT ON (discipline) discipline, name FROM student;
