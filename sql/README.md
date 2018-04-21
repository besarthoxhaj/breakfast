## SQL

[Standard 1992](http://www.contrib.andrew.cmu.edu/~shadow/sql/sql1992.txt)

```sh
# run commands from the terminal
$ psql -f 001.sql

```

## Table reference

```
<from clause> ::=
  FROM <table reference>
    [ { <comma> <table reference> } ... ]
```

where `table reference` is defined as

```
<table reference> ::=
    <table name>
  | <derived table>
  | <joined table>
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

- [Running SQL scripts with psql](https://goo.gl/4Zg947)
- [Domain Logic and SQL](https://goo.gl/Q2iBjC)
- [10 Easy Steps to Understanding SQL](https://goo.gl/RMschv)
