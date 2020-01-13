import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import "./env";
import schema from "./schema";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

// Logging using 'morgan'
server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
  console.log(`Server is working on port ${PORT}`)
);
