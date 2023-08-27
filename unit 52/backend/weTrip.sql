DROP DATABASE IF EXISTS weTrip;
CREATE DATABASE weTrip;
\connect weTrip

\i weTrip-schema.sql

DROP DATABASE IF EXISTS weTrip_test;
CREATE DATABASE weTrip_test;
\connect weTrip_test

\i weTrip-schema.sql