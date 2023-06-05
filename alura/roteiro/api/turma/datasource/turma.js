import { SQLDataSource } from "datasource-sql";

export default class TurmasAPI extends SQLDataSource {
  constructor(dbConfig) {
    super(dbConfig);
  }

  async getTurmas() {
    return this.db.select("*").from("turmas");
  }

  async getTurma(id) {
    const turma = await this.db
      .select("*")
      .from("turmas")
      .where({ id: Number(id) });
    return turma[0];
  }

  async createTurma(turma) {
    const [newTurmaId] = await this.db
      .insert(turma)
      .returning("id")
      .into("turmas");

    const insertedTurma = await this.getTurma(newTurmaId.id);
    console.log(insertedTurma);
    return { ...insertedTurma };
  }

  async updateTurma(id, turma) {
    const [updatedTurma] = await this.db
      .update({ ...turma })
      .where({ id: Number(id) })
      .returning("*")
      .into("turmas");

    return { ...updatedTurma };
  }

  async deleteTurma(id) {
    await this.db("turmas")
      .where({ id: Number(id) })
      .delete();

    return { message: "Turma deleted successfully" };
  }
}
