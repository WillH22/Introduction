### Conceptual Exercise

Answer the following questions below:

- What is PostgreSQL?
  it's a powerful open source, object relational database management system. It supports a wide range of features like transactions, data integrity, concurrency control, and support for various data types

- What is the difference between SQL and PostgreSQL?
  SQL is a used to communicate with relational databases. PostgreSql is a specific implementation of a relational database management system that supports SQL

- In `psql`, how do you connect to a database?
  in the terminal run 'psql -U <username> -d <database_name>.

- What is the difference between `HAVING` and `WHERE`?
  'WHERE' is used to filter rows based on specific conditions before the grouping takes place.
  'HAVING' is used to filter the result of a 'GROUP BY' query based on the conditions applied.

- What is the difference between an `INNER` and `OUTER` join?
  'INNER' returns only the rows that have matching vcalues in both tables.
  'OUTER' returns all the rows from one table and the matching rows from the second table.

- What is the difference between a `LEFT OUTER` and `RIGHT OUTER` join?
  'LEFT' all the rows from the left table and the matching rows from the right are returned.
  'RIGHT' is basically the same except its from right table and the matching rows from the left are returned.

- What is an ORM? What do they do?
  ORM stands for Object Relational Mapping. It's a programming technique that allows developers to work with relational databases using object oriented paradigms

- What are some differences between making HTTP requests using AJAX
  and from the server side using a library like `requests`?
  With HTTP the requests are initiated from the client side, and the responses are processed asynchronously without requiring a full page to reload.
  On the server side, using a library like 'requests in python allows you to make HTTP requests directly from the server code.

- What is CSRF? What is the purpose of the CSRF token?
  CSRF stands for Cross-Site Request Forgery, it's an attack that tricks a victim into submitting a malicious request unknowingly.
  A CSRF Token is a security measure used to prevent CSRF attacks.

- What is the purpose of `form.hidden_tag()`?
  It generates HTML code for hidden input fields in a form.
