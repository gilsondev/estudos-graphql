import { GraphQLScalarType } from "graphql";

const userResolvers = {
  // Not required but, it's good define custom value to enum if you want
  RolesType: {
    ESTUDANTE: "ESTUDANTE",
    DOCENTE: "DOCENTE",
    COORDENACAO: "COORDENACAO",
  },
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A valid date time value.",
    serialize: (value) => value.toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value),
  }),
  Query: {
    users: (root, args, { dataSources }) => {
      return dataSources.usersAPI.getUsers();
    },
    user: (root, { id }, { dataSources }) => dataSources.usersAPI.getUser(id),
  },
  Mutation: {
    createUser: (root, user, { dataSources }) => {
      return dataSources.usersAPI.createUser(user);
    },
    updateUser: (root, user, { dataSources }) => {
      return dataSources.usersAPI.updateUser(user);
    },
    deleteUser: (root, { id }, { dataSources }) => {
      return dataSources.usersAPI.deleteUser(id);
    },
  },
};

export default userResolvers;
