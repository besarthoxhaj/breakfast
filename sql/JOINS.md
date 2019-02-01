## JOINS

Run the examples with:
```
$ psql -f 009.sql -q
```

![](https://i.stack.imgur.com/VQ5XP.png)

```sql
DROP TABLE IF EXISTS a CASCADE;
DROP TABLE IF EXISTS b CASCADE;
DROP TABLE IF EXISTS c CASCADE;

CREATE TABLE a (
  id_a  SERIAL PRIMARY KEY,
  id_b  INTEGER
);

CREATE TABLE b (
  id_b  SERIAL PRIMARY KEY,
  id_c  INTEGER
);

CREATE TABLE c (
  id_c  SERIAL PRIMARY KEY,
  id_b  INTEGER
);

INSERT INTO a (name, num) VALUES ('A.foo', 10);
INSERT INTO a (name, num) VALUES ('A.bar', 11);
INSERT INTO b (name, num) VALUES ('B.foo', 20);
INSERT INTO b (name, num) VALUES ('B.bar', 21);
```

## Resources

- [use JOIN keyword or not](https://goo.gl/yGaujG)
- [exercises](https://goo.gl/tRMPmH)
