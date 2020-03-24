const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection("incidents").count();

    const incidents = await connection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.whatsapp",
        "ongs.email",
        "ongs.city",
        "ongs.uf"
      ]);

    res.header("X-Total-Count", count["count(*)"]);
    return res.json(incidents);
  },

  async show(req, res) {},

  async store(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    await connection("incidents").insert({ title, description, value, ong_id });

    return res.json({ success: "New Incidents store in database." });
  },

  async update(req, res) {},

  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ message: "Don't is authentication" });
    }

    await connection("incidents")
      .where("id", id)
      .delete();

    return res.status(200).json({ message: "Delete with success" });
  }
};
