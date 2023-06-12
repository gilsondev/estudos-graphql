import path from "path";

import { ApolloServer } from "@apollo/server";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { startStandaloneServer } from "@apollo/server/standalone";

import { UsersAPI, userResolvers, userSchema } from "./user/index.js";
import { TurmasAPI, turmaResolvers, turmaSchema } from "./turma/index.js";
import {
  RegistrationsAPI,
  matriculaResolvers,
  matriculaSchema,
} from "./matricula/index.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const typeDefs = mergeTypeDefs([userSchema, turmaSchema, matriculaSchema]);
const resolvers = [userResolvers, turmaResolvers, matriculaResolvers];
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const dbConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: `${__dirname}/data/database.db`,
  },
};

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => {
    return {
      dataSources: {
        usersAPI: new UsersAPI(),
        turmasAPI: new TurmasAPI(dbConfig),
        registrationsAPI: new RegistrationsAPI(dbConfig),
      },
    };
  },
});
console.log(`Server ready at ${url}`);
