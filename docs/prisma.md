# The Prisma schema

```js
// Data source: Specifies your database connection (via an environment variable)
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Generator: Indicates that you want to generate Prisma Client
generator client {
  provider = "prisma-client-js"
}

// Data model: Defines your application models
// Represent a table in relational databases or a collection in MongoDB
model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  Int?
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}
```

# Accessing your database with Prisma Client

```js
// Installing the @prisma/client package invokes the prisma generate command, which reads your Prisma schema and generates Prisma Client code.
// The code is generated into the node_modules/.prisma/client folder by default.
$ npm install @prisma/client

// After you change your data model, you'll need to manually re-generate Prisma Client to ensure the code inside node_modules/.prisma/client gets updated:
$ pnpm exec prisma generate


```

# Using Prisma Client to send queries to your database

Once Prisma Client has been generated, you can import it in your code and send queries to your database. This is what the setup code looks like.

```js
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
```

# Prisma Migrations

```js
$ prisma migrate dev --name init
// Your Prisma schema is now in sync with your database schema and you have initialized a migration history:
migrations/
  └─ 20210313140442_init/
    └─ migration.sql


$ prisma migrate dev --name added_new_col
// Your Prisma schema is once again in sync with your database schema, and your migration history contains new migration:

migrations/
  └─ 20210313140442_init/
    └─ migration.sql
  └─ 20210313140442_added_new_col/
    └─ migration.sql

// You now have a migration history that you can source control and use to deploy changes to test environments and production.
```

```js
// Your migration history is the story of the changes to your data model, and is represented by:

// The migrations folder is the source of truth for the history of your data model.

// You must commit the entire prisma/migrations folder to source control. This includes the prisma/migrations/migration_lock.toml file, which is used to detect if you have attempted to change providers.
```

```js
// To seed the database, run the db seed CLI command:
$  npx prisma db seed


```
