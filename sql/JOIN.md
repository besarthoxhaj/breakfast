## JOIN

See https://i.stack.imgur.com/VQ5XP.png

```sql
DROP TABLE IF EXISTS a CASCADE;
DROP TABLE IF EXISTS b CASCADE;

CREATE TABLE a (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(20),
  num  INTEGER,
);

CREATE TABLE b (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(20),
  num  INTEGER,
);

INSERT INTO a (name,num) VALUES ('A.foo',10);
INSERT INTO a (name,num) VALUES ('A.bar',11);
INSERT INTO b (name,num) VALUES ('B.foo',20);
INSERT INTO b (name,num) VALUES ('B.bar',21);


```