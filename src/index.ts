import "reflect-metadata";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSchema } from "type-graphql";
import cors from "cors";
import bodyParser from "body-parser";

import datasource from "./lib/datasource";
import countriesRouter from "./routes/countries.routes";
import { CountryResolver } from "./resolvers/CountryResolver";

async function startServer() {
  await datasource.initialize();

  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  const app = express();

  app.use(cors({ origin: ["http://localhost:3000"] }));
  app.use(bodyParser.json());

  app.use("/graphql", expressMiddleware(server));

  app.use("/countries", countriesRouter);

  app.listen(4000, () => {
    console.log("🚀 Le serveur est lancé sur le port 4000");
  });
}

startServer().catch((error) => {
  console.error("Erreur au démarrage du serveur", error);
});
