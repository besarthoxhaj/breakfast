## Functions


Run the examples with:
```
$ psql -f 013.sql -q
```

```sql
CREATE FUNCTION print() RETURNS VOID AS $$
  BEGIN
    RAISE NOTICE 'Hello, World';
  END;
$$ language 'plpgsql';

SELECT print();
```
