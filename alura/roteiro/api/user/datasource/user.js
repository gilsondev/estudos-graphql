import { RESTDataSource } from "@apollo/datasource-rest";

export default class UsersAPI extends RESTDataSource {
  baseURL = "http://localhost:3000";

  async getUsers() {
    const users = await this.get("/users");

    return users.map(async (user) => {
      return {
        ...user,
        role: await this.get(`/roles/${user.role}`),
      };
    });
  }

  async getUser(id) {
    const user = await this.get(`/users/${id}`);
    user.role = await this.get(`/roles/${user.role}`);
    return user;
  }
}
