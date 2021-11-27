export = {
   type: "sqlite",
   database: "database.sqlite",
   // database: ":memory:",
   synchronize: true,
   logging: true,
   seeds: ['src/database/seeds /**/*.seed.ts'
   ],
   entities: [
      "src/entity/**/*.ts"
   ],
   migrations: [
      "src/migration/**/*.ts"
   ],
   subscribers: [
      "src/subscriber/**/*.ts"
   ],
   cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
   },
};
