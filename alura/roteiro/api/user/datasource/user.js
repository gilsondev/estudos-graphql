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

  async createUser(user) {
    const users = await this.get("/users");
    const role = await this.get(`/roles?type=${user.role}`);

    user.id = users.length + 1;
    await this.post("/users", {
      body: { ...user, active: true, role: role[0].id },
    });

    return { ...user, role: role[0] };
  }

  async updateUser(id, user) {
    const role = await this.get(`/roles?type=${user.role}`);
    await this.put(`/users/${id}`, {
      body: { ...user, role: role[0].id },
    });

    return { ...user, role: role[0] };
  }

  async deleteUser(id) {
    const user = await this.get(`/users/${id}`);
    await this.delete(`/users/${id}`);
    return id;
  }
}
