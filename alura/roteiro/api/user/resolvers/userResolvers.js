const userResolvers = {
  Query: {
    users: (root, args, { dataSources }) => {
      return dataSources.usersAPI.getUsers();
    },
    user: (root, { id }, { dataSources }) => dataSources.usersAPI.getUser(id),
  },
};

export default userResolvers;
