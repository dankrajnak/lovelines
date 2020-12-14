# Lovelines

This is the start of a new art project

To run locally, run

```bash
yarn
yarn dev
```

To get a database working with docker, create a .env file with the following:

```
DATABASEURL="postgresql://lovelines:password@localhost:5432/lovelines?schema=public"
```

then run the following from the root folder:

```bash
cd docker/db;
docker build --tag lovelinesimage .;
docker run --name lovelinesdb -p 5432:5432 lovelinesimage;
cd ../..;
yarn prisma migrate dev --preview-feature;
```
