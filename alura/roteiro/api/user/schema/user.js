const userSchema = `#graphql
  type User {
    name: String!
    active: Boolean!
    email: String!
    role: Role!
  }

  type Role {
    id: ID!
    type: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
  }
`;

export default userSchema;
