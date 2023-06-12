const matriculaSchema = `#graphql
  scalar DateTime

  type Matricula {

    id: ID!
    student: User!
    turma: Turma!
    createdAt: DateTime!
    status: String!
  }

  type Mutation {
    registerStudent(student: ID!, turma: ID!): DefaultResponse!
    removeRegistration(id: ID!): DefaultResponse!
    cancelRegistration(id: ID!): DefaultResponse!
  }
`;

export default matriculaSchema;
