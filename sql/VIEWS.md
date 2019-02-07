## Views

Run the examples with:

```
$ psql -f 010.sql -q
```

```sql
CREATE TABLE a (
  id    VARCHAR(20) PRIMARY KEY,
  city  VARCHAR(20),
  net   INTEGER
);

INSERT INTO a (id, city, net) VALUES ('000', 'AAA', 4);
INSERT INTO a (id, city, net) VALUES ('001', 'BBB', 8);
INSERT INTO a (id, city, net) VALUES ('002', 'CCC', 7);
INSERT INTO a (id, city, net) VALUES ('003', 'AAA', 2);

CREATE VIEW city_aaa AS
  SELECT *
  FROM a
  WHERE a.city = 'AAA';

SELECT * FROM city_aaa;
```
