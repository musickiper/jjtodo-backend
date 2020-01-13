import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import "./env";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

// Logging using 'morgan'
server.express.use(logger("dev"));
// Register Passport with JWT
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`Server is working on port ${PORT}`)
);
