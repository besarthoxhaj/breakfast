

\i _settings.sql;
\i data/guest.sql;

/**
 * How many guest we had in each year?
 */

-- SELECT year,Max(spent)
-- FROM guest
-- GROUP BY year;

/**
 * Show who spent the most in each year
 */

-- SELECT Max(spent), name
-- FROM guest
-- GROUP BY year,name;
-- 
SELECT guest.year,spent,name
FROM guest
JOIN (
  SELECT Max(spent),year
  FROM guest
  GROUP BY year
) x ON x.year = guest.year
    AND x.max = guest.spent;
