import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import userResolvers from "./user/resolvers/userResolvers.js";
import userSchema from "./user/schema/user.js";
import UsersAPI from "./user/datasource/user.js";

const typeDefs = [userSchema];
const resolvers = [userResolvers];
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => {
    const { cache } = server;
    return {
      dataSources: {
        usersAPI: new UsersAPI({ cache }),
      },
    };
  },
});
console.log(`Server ready at ${url}`);
