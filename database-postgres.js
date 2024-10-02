import { randomUUID } from "node:crypto";
import { sql } from "./dbsql.js";

export class DatabasePostgres {
  async list(search) {
    let videos;

    if (search) {
      videos = await sql`select * from video where title ilike ${search + "%"}`;
    } else {
      videos = await sql`select * from video`;
    }

    return videos;
  }
  async create(video) {
    const id = randomUUID();

    const { title, description, duration } = video;

    await sql`insert into VIDEO (id, title, description, duration) values (${id}, ${title}, ${description}, ${duration})`;
  }
  async update(id, video) {
    const { title, description, duration } = video;

    await sql`UPDATE video SET title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`;
  }
  async delete(id) {
    await sql`DELETE FROM video WHERE id = ${id}`;
  }
}
