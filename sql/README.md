## SQL

[Standard 1992](http://www.contrib.andrew.cmu.edu/~shadow/sql/sql1992.txt)


```sh
# run commands from the terminal
$ psql -d [database] -f _hello_world.sql
```

## Tables

Everything in SQL is a table or table reference.


```
<table expression> ::=
  <from clause>
  [ <where clause> ]
  [ <group by clause> ]
  [ <having clause> ]

<from clause> ::=
  FROM <table reference>
  [ { <comma> <table reference> } ... ]

<table reference> ::=
    <table name>    [ [ AS ] <correlation name> [ <left paren> <derived column list> <right paren> ] ]
  | <derived table>   [ AS ] <correlation name> [ <left paren> <derived column list> <right paren> ]
  | <joined table>

  <derived column list> ::= <column name list>

  <column name list> ::= <column name> [ { <comma> <column name> }... ]

  <derived table> ::= <table subquery>

  <table subquery> ::= <subquery>

  <subquery> ::= <left paren> <query expression> <right paren>

  <query expression> ::=
```


## Syntax

> **Problem**, generally speaking seems there is some problem with formal definition
> of the syntax. A more deep research should be conducted starting on wikipedia
> https://en.wikipedia.org/wiki/SQL

There are ...

> `String` a set of character

> `Statements` is any *string* that is complete and is valid syntax. It is self
> contained, correct and should end in a `;`.

> `Query` and statement that returns data including empty.

- commands
- clauses
- statements
- operators
- expression
- predicate
- aggregates

### Data Manipulation Language (DML)

### Data Definition Language (DDL)

## Formatting

## Resources

- [Build your own rdbms](https://goo.gl/emqCxm)
- [Running SQL scripts with psql](https://goo.gl/4Zg947)
- [Domain Logic and SQL](https://goo.gl/Q2iBjC)
- [10 Easy Steps to Understanding SQL](https://goo.gl/RMschv)
- [Postgres Tutorial](http://www.postgresqltutorial.com)
- [Little style guide](https://goo.gl/ScCm5s)
