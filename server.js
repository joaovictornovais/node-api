import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgres.js";
// import { DatabaseMemory } from "./database-memory.js";

const server = fastify();

// const database = new DatabaseMemory();

const database = new DatabasePostgres();

server.get("/videos", async (request) => {
  const search = request.query.search;
  return await database.list(search);
});

server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send();
});

server.put("/videos/:id", async (request, reply) => {
  const id = request.params.id;
  const { title, description, duration } = request.body;

  await database.update(id, { title, description, duration });
  return reply.status(204).send();
});

server.delete("/videos/:id", async (request, reply) => {
  const id = request.params.id;
  await database.delete(id);

  return reply.status(204).send();
});

server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3333,
});
