import path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";

// Merge all graphql files defining types
const allTypes = fileLoader(path.join(__dirname, "api/**/*.graphql"));
// Merge all js files defining resolvers
const allResolvers = fileLoader(path.join(__dirname, "api/**/*.js"));

// Create executable schema using all types and all resolvers merged
export default makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers)
});
