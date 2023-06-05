import path from "path";

import { ApolloServer } from "@apollo/server";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { startStandaloneServer } from "@apollo/server/standalone";
import userResolvers from "./user/resolvers/userResolvers.js";
import userSchema from "./user/schema/user.js";
import UsersAPI from "./user/datasource/user.js";
import turmaShema from "./turma/schema/turma.js";
import turmaResolvers from "./turma/resolvers/turmaResolvers.js";
import TurmasAPI from "./turma/datasource/turma.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const typeDefs = mergeTypeDefs([userSchema, turmaShema]);
const resolvers = [userResolvers, turmaResolvers];
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
      },
    };
  },
});
console.log(`Server ready at ${url}`);
