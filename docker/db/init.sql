CREATE USER lovelines;
ALTER USER lovelines WITH PASSWORD 'password';
ALTER USER lovelines CREATEDB;
CREATE DATABASE lovelines;
GRANT ALL PRIVILEGES ON DATABASE lovelines TO lovelines;