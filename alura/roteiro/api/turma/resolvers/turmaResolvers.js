import { GraphQLScalarType } from "graphql";

const turmaResolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A valid date time value.",
    serialize: (value) => value.toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value),
  }),
  Query: {
    turmas: (parent, args, { dataSources }, info) => {
      return dataSources.turmasAPI.getTurmas();
    },

    turma: (parent, { id }, { dataSources }, info) => {
      return dataSources.turmasAPI.getTurma(id);
    },
  },
  Mutation: {
    createTurma: (parent, { turma }, { dataSources }, info) => {
      return dataSources.turmasAPI.createTurma(turma);
    },
    updateTurma: (parent, { id, turma }, { dataSources }, info) => {
      return dataSources.turmasAPI.updateTurma(id, turma);
    },
    deleteTurma: (parent, { id }, { dataSources }, info) => {
      return dataSources.turmasAPI.deleteTurma(id);
    },
  },
};

export default turmaResolvers;
