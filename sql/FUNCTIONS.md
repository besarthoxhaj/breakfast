## Functions



```sql
CREATE FUNCTION print() RETURNS VOID AS $$
  BEGIN
    RAISE NOTICE 'Hello, World';
  END;
$$ language 'plpgsql';

SELECT print();
```
