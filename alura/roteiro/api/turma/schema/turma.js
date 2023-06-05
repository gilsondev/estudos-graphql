const turmaShema = `#graphql
  scalar DateTime

  type Turma {
    id: ID!
    description: String!
    hour: String
    vacancy: Int
    started_at: DateTime
    teacher: User!
    created_at: DateTime!
  }

  input TurmaInput {
    description: String
    hour: String
    vacancy: Int
    started_at: DateTime
    teacher_id: Int
  }

  interface Response {
    message: String!
  }

  type DefaultResponse implements Response {
    message: String!
  }

  type Query {
    turmas: [Turma]
    turma(id: ID!): Turma!
  }

  type Mutation {
    createTurma(turma: TurmaInput): Turma!
    updateTurma(id: ID!, turma: TurmaInput): Turma!
    deleteTurma(id: ID!): DefaultResponse!
  }
`;

export default turmaShema;
