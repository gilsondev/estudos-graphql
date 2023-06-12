import { SQLDataSource } from "datasource-sql";

export default class RegistrationsAPI extends SQLDataSource {
  constructor(dbConfig) {
    super(dbConfig);
  }

  async getRegistrations(turmaId) {
    return this.db.select("*").from("matriculas").where({ turma_id: turmaId });
  }

  async getRegistrationsByUser(userId) {
    return this.db.select("*").from("matriculas").where({ student_id: userId });
  }

  async registerStudent(studentId, turmaId) {
    const newRegisterData = {
      student_id: studentId,
      turma_id: turmaId,
      status: "confirmado",
    };

    await this.db.insert(newRegisterData).into("matriculas");

    return { message: "Matricula registrada com sucesso" };
  }

  async cancelRegistration(id) {
    await this.db("matriculas")
      .where({ id: Number(id) })
      .update({ status: "cancelado" });

    return { message: "Matricula cancelada com sucesso" };
  }

  async removeRegistration(id) {
    await this.db("matriculas")
      .where({ id: Number(id) })
      .delete();

    return { message: "Matricula removida com sucesso" };
  }
}
