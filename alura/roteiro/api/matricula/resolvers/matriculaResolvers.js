import { GraphQLScalarType } from "graphql";

const matriculaResolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A valid date time value.",
    serialize: (value) => value.toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value),
  }),
  Mutation: {
    registerStudent: (_, { student, turma }, { dataSources }) => {
      return dataSources.registrationsAPI.registerStudent(student, turma);
    },
    removeRegistration: (_, { id }, { dataSources }) => {
      return dataSources.registrationsAPI.removeRegistration(id);
    },
    cancelRegistration: (_, { id }, { dataSources }) => {
      return dataSources.registrationsAPI.cancelRegistration(id);
    },
  },
  Matricula: {
    student: (parent, _, { dataSources }) => {
      return dataSources.usersAPI.getUser(parent.student_id);
    },
    turma: (parent, _, { dataSources }) => {
      return dataSources.turmasAPI.getTurma(parent.turma_id);
    },
  },
};

export default matriculaResolvers;
