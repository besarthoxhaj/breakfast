\i _settings.sql;
\i data/medium.sql;

/**
 * Which salesman made the most sales in Jan? What's its name?
 */

SELECT salesman_id, Count(salesman_id)
FROM "order"
WHERE month = 'Jan'
GROUP BY salesman_id;

SELECT salesman.name, a.count
FROM salesman INNER JOIN (
  SELECT salesman_id, Count(salesman_id)
  FROM "order"
  WHERE month = 'Jan'
  GROUP BY salesman_id
) AS a ON (salesman.id = a.salesman_id);