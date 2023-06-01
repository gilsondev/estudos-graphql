const userSchema = `#graphql
  scalar DateTime

  type User {
    id: ID
    name: String!
    active: Boolean!
    email: String!
    role: Role!
    createdAt: DateTime
  }

  input UserInput {
    name: String
    active: Boolean
    email: String
    role: RolesType
    createdAt: DateTime
  }

  type Role {
    id: ID!
    type: String!
  }

  enum RolesType {
    ESTUDANTE
    DOCENTE
    COORDENACAO
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
  }

  type Mutation {
    createUser(user: UserInput): User!
    updateUser(id: ID!, user: UserInput): ResponseUpdate!
    deleteUser(id: ID!): ResponseDelete!
  }

  interface CustomResponse {
    code: Int!
    message: String!
  }

  type ResponseDelete implements CustomResponse {
    code: Int!
    message: String!
  }

  type ResponseUpdate implements CustomResponse {
    code: Int!
    message: String!
    user: User!
  }
`;

export default userSchema;
