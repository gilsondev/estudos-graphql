const userSchema = `#graphql
  scalar DateTime

  type User {
    name: String!
    active: Boolean!
    email: String!
    role: Role!
    createdAt: DateTime
  }

  type Role {
    id: ID!
    type: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
  }

  type Mutation {
    createUser(name: String!, email: String!, role: String!, createdAt: DateTime): User!
    updateUser(id: ID!, name: String, email: String, role: String!, active: Boolean!): User!
    deleteUser(id: ID!): ID!
  }
`;

export default userSchema;
