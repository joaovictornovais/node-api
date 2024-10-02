import { sql } from "./dbsql.js";

sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`.then(() =>
  console.log("Extesão criada!")
);

sql`
    CREATE TABLE video(
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title VARCHAR(60) NOT NULL,
        description VARCHAR(200) NOT NULL,
        duration INTEGER NOT NULL
    );
`.then(() => console.log("Tabela criada!"));
